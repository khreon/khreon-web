import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { kv } from '@vercel/kv';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // 정적 파일, 관리자 페이지, API 경로는 트래킹에서 제외
  if (
    path.startsWith('/_next') || 
    path.startsWith('/admin') || 
    path.startsWith('/api') || 
    path.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|xml|txt)$/)
  ) {
    return NextResponse.next();
  }

  try {
    const userAgent = request.headers.get('user-agent') || '';
    
    // 봇 식별 로직
    let category = 'Human';
    if (userAgent.includes('GPTBot') || userAgent.includes('ChatGPT-User')) {
      category = 'GPTBot';
    } else if (userAgent.includes('Googlebot')) {
      category = 'Googlebot';
    } else if (userAgent.includes('ClaudeBot') || userAgent.includes('Claude-Web')) {
      category = 'Claude';
    } else if (/bot|crawler|spider|crawling/i.test(userAgent)) {
      category = 'OtherBot';
    }

    // 날짜 구하기 (한국 시간 기준)
    const now = new Date();
    // UTC 0 기준으로 한국시간(UTC+9) 반영
    now.setHours(now.getHours() + 9);
    const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Vercel KV에 저장 (환경 변수가 설정되어 있을 때만 실행)
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const key = `stats:visits:${date}`;
      // 해시에 카운트 증분 (Fire and forget, no await to prevent slowing down requests)
      kv.hincrby(key, category, 1).catch(e => console.error("KV Error:", e));
    }
  } catch (error) {
    // 미들웨어 예외 시에도 페이지 접속은 원활하게 통과
    console.error('Failed to log visit', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
