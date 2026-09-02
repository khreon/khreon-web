// 블로그에이전트 폴더의 글 하나를 Redis + Vercel Blob으로 이전하는 1회성 스크립트.
// 실행: node --env-file=.env.local scripts/migrate-blog-post.mjs <run_id>
// 예:   node --env-file=.env.local scripts/migrate-blog-post.mjs 260831

import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';
import { put } from '@vercel/blob';

const SOURCE_ROOT = 'C:\\Users\\user\\Desktop\\블로그에이전트';

const runId = process.argv[2];
if (!runId) {
  console.error('사용법: node --env-file=.env.local scripts/migrate-blog-post.mjs <run_id>');
  process.exit(1);
}

const dir = path.join(SOURCE_ROOT, runId);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '',
});

async function main() {
  const meta = JSON.parse(fs.readFileSync(path.join(dir, 'post.meta.json'), 'utf8'));
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'images', 'manifest.json'), 'utf8'));
  let draft = fs.readFileSync(path.join(dir, 'draft.md'), 'utf8');

  console.log(`[${runId}] "${meta.title_candidates[0]}" 이전 시작 (이미지 ${manifest.images.length}장)`);

  // 이미지 업로드 + [IMAGE_SLOT_N] 치환
  for (const img of manifest.images) {
    const filePath = path.join(dir, img.path);
    const fileBuffer = fs.readFileSync(filePath);
    const blob = await put(`blog/${runId}-${img.filename}`, fileBuffer, {
      access: 'public',
      addRandomSuffix: true,
      contentType: 'image/png',
    });
    console.log(`  - ${img.filename} -> ${blob.url}`);

    const slotPattern = new RegExp(
      `\\[${img.slot_id}\\]\\s*\\n<!--\\s*IMG_INTENT:[^\\n]*-->`,
      'g'
    );
    draft = draft.replace(slotPattern, `![${img.alt_text}](${blob.url})`);
  }

  // 혹시 못 치환된 슬롯이 남아있는지 확인
  const remaining = draft.match(/\[IMAGE_SLOT_\d+\]/g);
  if (remaining) {
    console.warn(`  경고: 치환 안 된 이미지 슬롯이 남아있습니다: ${remaining.join(', ')}`);
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
}

main().catch((err) => {
  console.error('마이그레이션 실패:', err);
  process.exit(1);
});
