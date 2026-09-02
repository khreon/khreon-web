import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getPost } from '@/lib/blog';
import content from '../../../../content.json';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | 경희리온한의원`,
    description: post.excerpt || post.title,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.images.length > 0 ? post.images : undefined,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogDetail({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const html = await marked.parse(post.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.images,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: content.hospitalName,
    },
  };

  return (
    <article className="animate-in fade-in duration-500 pb-20 max-w-screen-md mx-auto px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-12 md:py-16">
        <p className="text-sm text-gray-400 mb-3">
          {new Date(post.publishedAt).toLocaleDateString('ko-KR')}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight break-keep">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        className="prose prose-lg max-w-none break-keep prose-headings:font-bold prose-a:text-primary prose-img:rounded-3xl"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
