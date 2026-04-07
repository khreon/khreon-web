import { Redis } from '@upstash/redis';
import AdminDashboardClient from '@/components/AdminDashboardClient';
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '',
});

export default async function AdminDashboard() {
  noStore(); // 강제 동적 렌더링을 위해 캐시 무시

  // 이번 날짜 문자열 계산 (KST 기준)
  const now = new Date();
  now.setHours(now.getHours() + 9);
  const todayDate = now.toISOString().split('T')[0];
  const todayKey = `stats:visits:${todayDate}`;

  // 오늘 데이터 패치
  let todayStats: Record<string, number> | null = null;
  if (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) {
    try {
      todayStats = (await redis.hgetall(todayKey)) as Record<string, number>;
    } catch {
      todayStats = null;
    }
  }

  const defaultStats = { Human: 0, GPTBot: 0, Googlebot: 0, Claude: 0, OtherBot: 0 };
  const stats = { ...defaultStats, ...todayStats };

  const totalBots = stats.GPTBot + stats.Googlebot + stats.Claude + stats.OtherBot;
  const totalVisitors = stats.Human + totalBots;
  const botPercentage = totalVisitors > 0 ? Math.round((totalBots / totalVisitors) * 100) : 0;

  // 파이 차트 데이터 구성
  const pieData = [
    { name: '일반 방문(사람)', value: stats.Human || 0, fill: '#8b5cf6' },
    { name: 'GPT/ChatGPT', value: stats.GPTBot || 0, fill: '#10b981' },
    { name: 'Google 검색봇', value: stats.Googlebot || 0, fill: '#3b82f6' },
    { name: 'Claude AI', value: stats.Claude || 0, fill: '#f59e0b' },
    { name: '기타 크롤러', value: stats.OtherBot || 0, fill: '#64748b' },
  ].filter(d => d.value > 0);

  if (pieData.length === 0) {
    pieData.push({ name: '아직 방문 기록이 없습니다', value: 1, fill: '#e2e8f0' });
  }

  // 최근 7일 방문자 패치
  const lineData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setHours(d.getHours() + 9 - (24 * i));
    const dStr = d.toISOString().split('T')[0];
    let dayStats: Record<string, number> | null = null;
    if (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) {
      try {
        dayStats = (await redis.hgetall(`stats:visits:${dStr}`)) as Record<string, number>;
      } catch {
        dayStats = null;
      }
    }
    const ds = { ...defaultStats, ...dayStats };
    const dayName = dStr.split('-').slice(1).join('/'); // MM/DD 형식
    lineData.push({
      name: dayName,
      visitors: ds.Human + ds.GPTBot + ds.Googlebot + ds.Claude + ds.OtherBot
    });
  }

  return (
    <AdminDashboardClient 
      todayVisitors={totalVisitors}
      botPercentage={botPercentage}
      pieData={pieData}
      lineData={lineData}
    />
  );
}
