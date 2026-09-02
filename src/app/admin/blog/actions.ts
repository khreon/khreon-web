'use server';

import { redirect } from 'next/navigation';
import { createPost, deletePost } from '@/lib/blog';

export async function createBlogPost(prevState: unknown, formData: FormData) {
  const title = (formData.get('title') as string || '').trim();
  const excerpt = (formData.get('excerpt') as string || '').trim();
  const content = (formData.get('content') as string || '').trim();
  const tags = (formData.get('tags') as string || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  if (!title || !content) {
    return { error: '제목과 본문은 필수입니다.' };
  }

  // 이미지는 본문 작성 중 브라우저에서 Blob으로 바로 업로드되어 마크다운으로 삽입된다.
  // 목록/OG 썸네일용으로, 본문에 삽입된 이미지 URL을 그대로 추출해 둔다.
  const images = [...content.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)].map((m) => m[1]);

  const post = await createPost({ title, excerpt, content, images, tags });

  redirect(`/admin/blog/${post.slug}`);
}

export async function deleteBlogPost(slug: string) {
  await deletePost(slug);
  redirect('/admin/blog');
}
