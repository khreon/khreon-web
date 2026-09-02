import { Metadata } from 'next';
import { listPosts } from '@/lib/blog';
import BlogCategoryTabs from '@/components/BlogCategoryTabs';
import BlogPostGrid from '@/components/BlogPostGrid';

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
        <BlogCategoryTabs />
        <BlogPostGrid posts={posts} emptyMessage="아직 등록된 칼럼이 없습니다." />
      </div>
    </div>
  );
}
