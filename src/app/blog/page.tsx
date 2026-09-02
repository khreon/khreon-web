import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { listPosts } from '@/lib/blog';
import { ImageOff } from 'lucide-react';

export const metadata: Metadata = {
  title: '건강 칼럼 | 경희리온한의원',
  description: '경희리온한의원이 전하는 통증, 다이어트, 성장, 여성 건강 등 다양한 건강 정보 칼럼입니다.',
  alternates: {
    canonical: '/blog',
  },
};

export const revalidate = 60;

export default async function BlogList() {
  const posts = await listPosts(50);

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="bg-primary/5 py-16 md:py-24 px-4 text-center border-b border-primary/10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">건강 칼럼</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto break-keep leading-relaxed">
          경희리온한의원이 전하는 건강 정보를 확인해보세요.
        </p>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-gray-400 py-20">아직 등록된 칼럼이 없습니다.</p>
        ) : (
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
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(post.publishedAt).toLocaleDateString('ko-KR')}
                  </p>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 break-keep line-clamp-2">{post.title}</h2>
                  {post.excerpt && (
                    <p className="text-sm text-gray-500 break-keep line-clamp-2">{post.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
