import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATEGORIES, getCategoryName, listPostsByCategory } from '@/lib/blog';
import BlogCategoryTabs from '@/components/BlogCategoryTabs';
import BlogPostGrid from '@/components/BlogPostGrid';

export const revalidate = 60;

type Props = { params: Promise<{ category: string }> };

function isKnownCategory(category: string): boolean {
  return CATEGORIES.some((c) => c.slug === category);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!isKnownCategory(category)) return {};

  const name = getCategoryName(category);
  return {
    title: `${name} 칼럼 | 경희리온한의원`,
    description: `경희리온한의원이 전하는 ${name} 관련 건강 정보 칼럼입니다.`,
    alternates: {
      canonical: `/blog/category/${category}`,
    },
  };
}

export default async function BlogCategoryList({ params }: Props) {
  const { category } = await params;
  if (!isKnownCategory(category)) notFound();

  const name = getCategoryName(category);
  const posts = await listPostsByCategory(category, 50);

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="bg-primary/5 py-16 md:py-24 px-4 text-center border-b border-primary/10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">{name} 칼럼</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto break-keep leading-relaxed">
          경희리온한의원이 전하는 {name} 관련 건강 정보를 확인해보세요.
        </p>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <BlogCategoryTabs active={category} />
        <BlogPostGrid posts={posts} emptyMessage="아직 이 카테고리에 등록된 칼럼이 없습니다." />
      </div>
    </div>
  );
}
