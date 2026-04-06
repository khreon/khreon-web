import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AI_BOTS = [
  'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 
  'Google-Extended', 'Googlebot', 'PerplexityBot', 'anthropic-ai'
];

export default async function proxy(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  
  // 1. Bot Tracking Log
  const matchedBot = AI_BOTS.find(bot => userAgent.toLowerCase().includes(bot.toLowerCase()));
  if (matchedBot) {
    console.log(`[Bot Tracker] Detected AI Bot: ${matchedBot} | Path: ${request.nextUrl.pathname}`);
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
