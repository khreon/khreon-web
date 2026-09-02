import Link from 'next/link';
import { CATEGORIES } from '@/lib/blog';

export default function BlogCategoryTabs({ active }: { active?: string }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !active ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/40'
        }`}
      >
        전체 글
      </Link>
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          href={`/blog/category/${c.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            active === c.slug ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/40'
          }`}
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}
