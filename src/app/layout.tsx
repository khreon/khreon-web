import type { Metadata } from "next";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import content from "../../content.json";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.khreon.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${content.hospitalName} - ${content.slogan}`,
  description: "동탄에 위치한 경희리온한의원입니다. 통증 크리닉, 교통사고 후유증, 다이어트, 소아 성장 등 환자 맞춤형 진료를 제공합니다.",
  keywords: ["동탄 한의원", "통증 치료", "교통사고 후유증", "다이어트", "한의원", "경희리온한의원", "초음파 진단", "추나"],
  verification: {
    google: '3noARHdrnozCb34bLXyhk8-OdpWUhSIhOM25ZQ07RdM',
    other: {
      'naver-site-verification': '37451698817471579fbbf889858b515266bd1792',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": content.hospitalName,
    "url": siteUrl,
    "logo": siteUrl + content.header.logo,
    "image": siteUrl + content.hero.bgImage,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": content.guide.address,
      "addressLocality": "화성시",
      "addressRegion": "경기도",
      "addressCountry": "KR"
    },
    "telephone": "+82-" + content.guide.contact.replace(/^0/, ""),
    // content.guide.hours는 화면 표시용 문자열이라 진료시간이 바뀌면 함께 수정해야 한다.
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Thursday", "Friday"], "opens": "10:00", "closes": "13:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "14:00", "closes": "21:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday", "Sunday", "PublicHolidays"], "opens": "10:00", "closes": "15:00" }
    ],
    "sameAs": [
      content.sns.blog,
      "https://map.naver.com/p/entry/place/1474751263",
      "https://place.map.kakao.com/1082491185"
    ]
  };

  return (
    <html lang="ko">
      <body className="antialiased font-sans">
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}
