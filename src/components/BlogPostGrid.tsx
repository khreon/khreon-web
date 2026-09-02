import Link from 'next/link';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';
import { BlogPost, getCategoryName } from '@/lib/blog';

export default function BlogPostGrid({ posts, emptyMessage }: { posts: BlogPost[]; emptyMessage: string }) {
  if (posts.length === 0) {
    return <p className="text-center text-gray-400 py-20">{emptyMessage}</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all border border-gray-100"
        >
          <div className="relative w-full aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden">
            {post.images[0] ? (
              <Image
                src={post.images[0]}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <ImageOff className="w-10 h-10 text-gray-300" />
            )}
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              {post.category && (
                <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                  {getCategoryName(post.category)}
                </span>
              )}
              <p className="text-xs text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString('ko-KR')}
              </p>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2 break-keep line-clamp-2">{post.title}</h2>
            {post.excerpt && (
              <p className="text-sm text-gray-500 break-keep line-clamp-2">{post.excerpt}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
