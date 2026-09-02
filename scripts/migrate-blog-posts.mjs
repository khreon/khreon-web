// 블로그에이전트 폴더의 글들을 Redis + Vercel Blob으로 이전하는 1회성 배치 스크립트.
// 이미 이전된 글(같은 slug가 Redis에 존재)은 자동으로 건너뛴다.
// 실행: node --env-file=.env.local scripts/migrate-blog-posts.mjs

import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';
import { put } from '@vercel/blob';

const SOURCE_ROOT = 'C:\\Users\\user\\Desktop\\블로그에이전트';
const SITE_DOMAIN_PATTERN = /https?:\/\/khreon\.com\/([a-zA-Z0-9\-]+)\/?/g;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '',
});

function findRunDirs() {
  return fs
    .readdirSync(SOURCE_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== 'docs')
    .map((d) => d.name)
    .filter((name) => {
      const dir = path.join(SOURCE_ROOT, name);
      return (
        fs.existsSync(path.join(dir, 'draft.md')) &&
        fs.existsSync(path.join(dir, 'post.meta.json')) &&
        fs.existsSync(path.join(dir, 'images', 'manifest.json'))
      );
    })
    .sort();
}

function loadMeta(runId) {
  const dir = path.join(SOURCE_ROOT, runId);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, 'post.meta.json'), 'utf8'));
  return { runId, dir, meta };
}

async function migrateOne({ runId, dir, meta }, knownSlugs) {
  const existing = await redis.get(`blog:post:${meta.slug}`);
  if (existing) {
    console.log(`[${runId}] 이미 이전됨 (slug: ${meta.slug}) -> 건너뜀`);
    return { skipped: true };
  }

  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'images', 'manifest.json'), 'utf8'));
  let draft = fs.readFileSync(path.join(dir, 'draft.md'), 'utf8');

  console.log(`[${runId}] "${meta.title_candidates[0]}" 이전 시작 (이미지 ${manifest.images.length}장)`);

  for (const img of manifest.images) {
    const filePath = path.join(dir, img.path);
    const fileBuffer = fs.readFileSync(filePath);
    const blob = await put(`blog/${runId}-${img.filename}`, fileBuffer, {
      access: 'public',
      addRandomSuffix: true,
      contentType: 'image/png',
    });

    const slotPattern = new RegExp(
      `\\[${img.slot_id}\\]\\s*\\n<!--\\s*IMG_INTENT:[^\\n]*-->`,
      'g'
    );
    draft = draft.replace(slotPattern, `![${img.alt_text}](${blob.url})`);
  }

  const remaining = draft.match(/\[IMAGE_SLOT_\d+\]/g);
  if (remaining) {
    console.warn(`  경고: 치환 안 된 이미지 슬롯: ${remaining.join(', ')}`);
  }

  // 내부 링크(https://khreon.com/<slug>/) 중, 우리가 이전한 다른 글을 가리키는 것만 /blog/<slug>로 변환
  let linkCount = 0;
  draft = draft.replace(SITE_DOMAIN_PATTERN, (match, slug) => {
    if (knownSlugs.has(slug)) {
      linkCount++;
      return `/blog/${slug}`;
    }
    return match; // 모르는 경로는 그대로 둔다 (홈페이지, 예약 페이지 등일 수 있음)
  });
  if (linkCount > 0) {
    console.log(`  내부 링크 ${linkCount}개를 /blog/ 경로로 변환`);
  }

  const post = {
    slug: meta.slug,
    title: meta.title_candidates[0],
    excerpt: meta.meta_description || '',
    content: draft.trim(),
    images: [...draft.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)].map((m) => m[1]),
    tags: meta.tags || [],
    publishedAt: meta.generated_at || new Date().toISOString(),
  };

  await redis.set(`blog:post:${post.slug}`, JSON.stringify(post));
  await redis.zadd('blog:posts', {
    score: new Date(post.publishedAt).getTime(),
    member: post.slug,
  });

  console.log(`[${runId}] 완료 -> slug: ${post.slug}`);
  return { skipped: false };
}

async function main() {
  const runIds = findRunDirs();
  console.log(`총 ${runIds.length}개 글 발견\n`);

  const entries = runIds.map(loadMeta);
  const knownSlugs = new Set(entries.map((e) => e.meta.slug));

  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  for (const entry of entries) {
    try {
      const result = await migrateOne(entry, knownSlugs);
      if (result.skipped) skipped++;
      else migrated++;
    } catch (err) {
      failed++;
      console.error(`[${entry.runId}] 실패:`, err.message);
    }
  }

  console.log(`\n완료: 이전 ${migrated}건, 건너뜀 ${skipped}건, 실패 ${failed}건`);
}

main().catch((err) => {
  console.error('마이그레이션 실패:', err);
  process.exit(1);
});
