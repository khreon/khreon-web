import Link from 'next/link';
import { listPosts } from '@/lib/blog';
import { Plus, ImageOff } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminBlogList() {
  noStore();
  const posts = await listPosts(50);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">칼럼 관리</h2>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-primary text-white font-medium px-4 py-2.5 rounded-xl hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> 새 글 작성
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
          아직 작성된 글이 없습니다.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/admin/blog/${post.slug}`}
              className="flex items-center gap-4 p-4 md:p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                {post.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.images[0]} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageOff className="w-5 h-5 text-gray-300" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-900 truncate">{post.title}</p>
                <p className="text-sm text-gray-500 truncate">{post.excerpt || '요약 없음'}</p>
              </div>
              <span className="text-xs text-gray-400 shrink-0">
                {new Date(post.publishedAt).toLocaleDateString('ko-KR')}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
