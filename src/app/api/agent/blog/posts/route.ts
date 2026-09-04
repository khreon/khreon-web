import { NextResponse } from 'next/server';
import { createPost, CATEGORIES, type CategorySlug } from '@/lib/blog';
import { verifyAgentAuth } from '@/lib/agentAuth';

export async function POST(request: Request): Promise<NextResponse> {
  if (!verifyAgentAuth(request)) {
    return NextResponse.json({ error: '인증되지 않은 요청입니다.' }, { status: 401 });
  }

  const body = await request.json();
  const title = (body.title || '').trim();
  const excerpt = (body.excerpt || '').trim();
  const content = (body.content || '').trim();
  const tags: string[] = Array.isArray(body.tags) ? body.tags.map((t: string) => String(t).trim()).filter(Boolean) : [];
  const categoryInput = (body.category || '').trim();

  if (!title || !content) {
    return NextResponse.json({ error: '제목과 본문은 필수입니다.' }, { status: 400 });
  }

  if (categoryInput && !CATEGORIES.some((c) => c.slug === categoryInput)) {
    return NextResponse.json(
      { error: `유효하지 않은 카테고리입니다. 가능한 값: ${CATEGORIES.map((c) => c.slug).join(', ')}` },
      { status: 400 },
    );
  }
  const category = categoryInput as CategorySlug | '';

  // 본문 마크다운에 삽입된 이미지 URL을 목록/OG 썸네일용으로 추출
  const images = [...content.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)].map((m) => m[1]);

  const post = await createPost({ title, excerpt, content, images, tags, category });

  return NextResponse.json({ slug: post.slug, url: `https://www.khreon.com/blog/${post.slug}` });
}
