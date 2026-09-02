// 이미 이전된 35개 글에, 워드프레스에 실제로 지정되어 있던 카테고리를 채워 넣는 1회성 스크립트.
// 실행: node --env-file=.env.local scripts/backfill-categories.mjs

import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

const SOURCE_ROOT = 'C:\\Users\\user\\Desktop\\블로그에이전트';

// https://khreon.com/wp-json/wp/v2/categories?per_page=100 에서 조회한 실제 매핑
const WP_CATEGORY_ID_TO_SLUG = {
  1: '', // Uncategorized -> 매핑 없음
  5: 'traffic-accident',
  4: 'orthopedics',
  11: 'diet-clinic',
  6: 'pediatric',
  8: 'gastroenterology',
  7: 'women-clinic',
  10: 'fatigue-clinic',
  9: 'respiratory-medicine',
};

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
        fs.existsSync(path.join(dir, 'post.meta.json')) &&
        fs.existsSync(path.join(dir, 'wp_post.json'))
      );
    });
}

async function main() {
  const runIds = findRunDirs();
  console.log(`대상 ${runIds.length}개 글\n`);

  // WordPress에서 post_id -> categories(id 배열) 매핑을 한 번에 가져온다
  const res = await fetch('https://khreon.com/wp-json/wp/v2/posts?per_page=100&_fields=id,categories');
  const wpPosts = await res.json();
  const postIdToCategoryIds = new Map(wpPosts.map((p) => [p.id, p.categories]));

  let updated = 0;
  let skipped = 0;

  for (const runId of runIds) {
    const dir = path.join(SOURCE_ROOT, runId);
    const meta = JSON.parse(fs.readFileSync(path.join(dir, 'post.meta.json'), 'utf8'));
    const wpPost = JSON.parse(fs.readFileSync(path.join(dir, 'wp_post.json'), 'utf8'));

    const categoryIds = postIdToCategoryIds.get(wpPost.post_id);
    if (!categoryIds || categoryIds.length === 0) {
      console.warn(`[${runId}] 워드프레스에서 카테고리를 찾을 수 없음 (post_id=${wpPost.post_id}) -> 건너뜀`);
      skipped++;
      continue;
    }

    const category = categoryIds.map((id) => WP_CATEGORY_ID_TO_SLUG[id]).find(Boolean) || '';
    if (!category) {
      console.warn(`[${runId}] 유효한 카테고리 없음 (categories=${categoryIds}) -> 건너뜀`);
      skipped++;
      continue;
    }

    const postKey = `blog:post:${meta.slug}`;
    const raw = await redis.get(postKey);
    if (!raw) {
      console.warn(`[${runId}] Redis에 글이 없음 (slug=${meta.slug}) -> 건너뜀`);
      skipped++;
      continue;
    }
    const post = typeof raw === 'string' ? JSON.parse(raw) : raw;
    post.category = category;

    await redis.set(postKey, JSON.stringify(post));
    await redis.zadd(`blog:posts:category:${category}`, {
      score: new Date(post.publishedAt).getTime(),
      member: post.slug,
    });

    console.log(`[${runId}] ${meta.slug} -> ${category}`);
    updated++;
  }

  console.log(`\n완료: 업데이트 ${updated}건, 건너뜀 ${skipped}건`);
}

main().catch((err) => {
  console.error('백필 실패:', err);
  process.exit(1);
});
