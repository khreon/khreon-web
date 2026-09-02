import { getPost } from '@/lib/blog';
import { deleteBlogPost } from '../actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { renderMarkdown } from '@/lib/markdown';
import { ExternalLink, Trash2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminBlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const html = await renderMarkdown(post.content);

  const deleteWithSlug = deleteBlogPost.bind(null, post.slug);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
        <div className="flex items-center gap-2">
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            <ExternalLink className="w-4 h-4" /> 공개 페이지 보기
          </Link>
          <form action={deleteWithSlug}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg"
            >
              <Trash2 className="w-4 h-4" /> 삭제
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6">
        <p className="text-sm text-gray-400">
          {new Date(post.publishedAt).toLocaleString('ko-KR')}
        </p>

        <div
          className="prose max-w-none break-keep prose-headings:font-bold prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
