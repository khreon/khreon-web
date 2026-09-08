'use client';

import { useActionState } from 'react';
import { updateBlogPost } from '../../actions';
import BlogPostForm from '../../BlogPostForm';
import type { BlogPost } from '@/lib/blog';

export default function EditBlogPostForm({ post }: { post: BlogPost }) {
  const boundUpdateBlogPost = updateBlogPost.bind(null, post.slug);
  const [state, formAction, pending] = useActionState(boundUpdateBlogPost, null);

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">칼럼 수정</h2>
      <BlogPostForm
        formAction={formAction}
        pending={pending}
        error={state?.error}
        submitLabel="수정하기"
        pendingLabel="수정 중..."
        initialValues={{
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          tags: post.tags.join(', '),
        }}
      />
    </div>
  );
}
