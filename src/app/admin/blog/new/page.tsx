'use client';

import { useActionState } from 'react';
import { createBlogPost } from '../actions';
import BlogPostForm from '../BlogPostForm';

export default function NewBlogPost() {
  const [state, formAction, pending] = useActionState(createBlogPost, null);

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">새 칼럼 작성</h2>
      <BlogPostForm
        formAction={formAction}
        pending={pending}
        error={state?.error}
        submitLabel="발행하기"
        pendingLabel="발행 중..."
      />
    </div>
  );
}
