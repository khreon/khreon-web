import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '',
});

const AI_BOTS = [
  'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 
  'Google-Extended', 'Googlebot', 'PerplexityBot', 'anthropic-ai',
  'bot', 'crawler', 'spider', 'crawling'
];

export default async function proxy(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  
  // 1. Bot Tracking Log with Upstash Redis
  let category = 'Human';
  const uaLower = userAgent.toLowerCase();
  
  if (uaLower.includes('gptbot') || uaLower.includes('chatgpt')) {
    category = 'GPTBot';
  } else if (uaLower.includes('googlebot')) {
    category = 'Googlebot';
  } else if (uaLower.includes('claude')) {
    category = 'Claude';
  } else {
    const matchedBot = AI_BOTS.find(bot => uaLower.includes(bot.toLowerCase()));
    if (matchedBot) {
      category = 'OtherBot';
    }
  }

  if (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) {
    const now = new Date();
    now.setHours(now.getHours() + 9);
    const date = now.toISOString().split('T')[0];
    
    // 일별 방문 횟수 집계
    const statsKey = `stats:visits:${date}`;
    redis.hincrby(statsKey, category, 1).catch(e => console.error("KV Error:", e));

    // AI 봇인 경우 상세 내역 저장 (30일 보관)
    if (category !== 'Human') {
      const detailsKey = `logs:bots:${date}`;
      const logEntry = JSON.stringify({
        timestamp: new Date().toISOString(),
        botName: category,
        path: request.nextUrl.pathname,
        userAgent: userAgent
      });
      // 트랜잭션 파이프라인 처럼 비동기 백그라운드 호출
      redis.lpush(detailsKey, logEntry)
        .then(() => redis.expire(detailsKey, 60 * 60 * 24 * 30))
        .catch(e => console.error("Log Push Error:", e));
    }
  }

  // 2. Admin Route Protection
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    const adminAuth = request.cookies.get('admin_auth')?.value;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (adminAuth !== adminPassword) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
