import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://khreon.com';
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>경희리온한의원</title>
    <link>${baseUrl}</link>
    <description>당신의 건강을 Re:ON, 동탄 경희리온한의원입니다. 통증 크리닉, 교통사고 후유증, 다이어트, 소아 성장 등 환자 맞춤형 진료를 제공합니다.</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    
    <item>
      <title>진료 안내 - 맞춤형 통증/교통사고 클리닉</title>
      <link>${baseUrl}/services</link>
      <description>목/허리 통증, 어깨 관절, 교통사고, 다이어트 등 정확한 진단과 꼭 필요한 치료를 진행합니다.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
    
    <item>
      <title>경희리온 특별 처방 (공진단/경옥고/추나 등)</title>
      <link>${baseUrl}/pharmacy</link>
      <description>황제의 보약 공진단부터 아프지 않은 근막추나, 비만 치료 감비환 등 경희리온만의 특별 처방을 확인하세요.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
    
    <item>
      <title>이용 및 오시는 길 안내</title>
      <link>${baseUrl}/guide</link>
      <description>동탄역 인근 경희리온한의원 진료 시간 및 주차 안내입니다. 평일 야간 진료를 진행합니다.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
