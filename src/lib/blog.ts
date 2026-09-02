import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '',
});

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown
  images: string[]; // Vercel Blob URLs, 0~4장
  tags: string[];
  publishedAt: string; // ISO string
};

const POSTS_INDEX_KEY = 'blog:posts';
const postKey = (slug: string) => `blog:post:${slug}`;

function slugify(title: string): string {
  // 슬러그는 HTTP 헤더(redirect 등)에 그대로 쓰이므로 ASCII 문자만 남긴다.
  // 한글 제목은 대부분 걸러지므로, 타임스탬프 기반 접미사가 사실상 슬러그 역할을 한다.
  const base = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const suffix = Date.now().toString(36);
  return base ? `${base}-${suffix}` : `post-${suffix}`;
}

export async function createPost(data: {
  title: string;
  excerpt: string;
  content: string;
  images: string[];
  tags: string[];
}): Promise<BlogPost> {
  const slug = slugify(data.title);
  const post: BlogPost = {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    images: data.images,
    tags: data.tags,
    publishedAt: new Date().toISOString(),
  };

  await redis.set(postKey(slug), JSON.stringify(post));
  await redis.zadd(POSTS_INDEX_KEY, { score: Date.now(), member: slug });

  return post;
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const raw = await redis.get<string>(postKey(slug));
  if (!raw) return null;
  return typeof raw === 'string' ? JSON.parse(raw) : (raw as unknown as BlogPost);
}

export async function listPosts(limit = 20, offset = 0): Promise<BlogPost[]> {
  const slugs = await redis.zrange<string[]>(POSTS_INDEX_KEY, offset, offset + limit - 1, { rev: true });
  if (!slugs || slugs.length === 0) return [];

  const posts = await Promise.all(slugs.map((slug) => getPost(slug)));
  return posts.filter((p): p is BlogPost => p !== null);
}

export async function deletePost(slug: string): Promise<void> {
  await redis.del(postKey(slug));
  await redis.zrem(POSTS_INDEX_KEY, slug);
}
