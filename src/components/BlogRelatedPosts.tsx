import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';

export default function BlogRelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-md">
      <h2 className="text-center mb-5">
        <span className="inline-block bg-primary/10 text-primary text-lg font-bold px-5 py-1.5 rounded-full">관련 글</span>
      </h2>
      <ul className="divide-y divide-gray-100">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex items-center gap-3 py-4 text-gray-900 hover:text-primary transition-colors"
            >
              <span className="text-primary text-lg leading-none shrink-0">›</span>
              <span className="text-base md:text-lg font-medium break-keep line-clamp-1">{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
