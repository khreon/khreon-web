import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // TODO: 실제 배포될 도메인으로 변경해주세요.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://khreon.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // 어드민 페이지 크롤링 방지
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
