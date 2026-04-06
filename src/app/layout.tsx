import type { Metadata } from "next";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import content from "../../content.json";

export const metadata: Metadata = {
  title: `${content.hospitalName} - ${content.slogan}`,
  description: "동탄에 위치한 경희리온한의원입니다. 통증 크리닉, 교통사고 후유증, 다이어트, 소아 성장 등 환자 맞춤형 진료를 제공합니다.",
  keywords: ["동탄 한의원", "통증 치료", "교통사고 후유증", "다이어트", "한의원", "경희리온한의원", "초음파 진단", "추나"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": content.hospitalName,
    "image": "https://example.com" + content.header.logo,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "화성시",
      "addressRegion": "경기도"
    },
    "telephone": content.guide.contact
  };

  return (
    <html lang="ko">
      <body className="antialiased font-sans">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
