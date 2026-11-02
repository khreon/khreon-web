import { MetadataRoute } from 'next'
import { listPosts, CATEGORIES } from '@/lib/blog'
import { serviceDetails } from '@/lib/serviceDetails'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // TODO: 실제 배포될 도메인으로 변경해주세요.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.khreon.com'

  const posts = await listPosts(1000).catch(() => []);
  const blogUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    ...CATEGORIES.map((c) => ({
      url: `${baseUrl}/blog/category/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  // 시범(isSample) 페이지는 noindex 이므로 사이트맵에서 제외한다.
  const serviceUrls: MetadataRoute.Sitemap = Object.values(serviceDetails)
    .filter((detail) => !detail.isSample)
    .map((detail) => ({
      url: `${baseUrl}/services/${detail.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pharmacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...serviceUrls,
    ...blogUrls,
  ]
}
