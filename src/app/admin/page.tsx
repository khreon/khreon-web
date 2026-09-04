import AdminDashboardClient from '@/components/AdminDashboardClient';
import { unstable_noStore as noStore } from 'next/cache';
import { CATEGORY_META, getDailyStats, getKSTDateString } from '@/lib/stats';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboard() {
  noStore(); // 강제 동적 렌더링을 위해 캐시 무시

  const todayDate = getKSTDateString();
  const stats = await getDailyStats(todayDate);

  const totalBots = stats.GPTBot + stats.Googlebot + stats.Claude + stats.OtherBot;
  const totalVisitors = stats.Human + totalBots;
  const botPercentage = totalVisitors > 0 ? Math.round((totalBots / totalVisitors) * 100) : 0;

  // 파이 차트 데이터 구성
  const pieData: Array<{ name: string; value: number; fill: string }> = CATEGORY_META
    .map(meta => ({ name: meta.label, value: stats[meta.key] || 0, fill: meta.fill }))
    .filter(d => d.value > 0);

  if (pieData.length === 0) {
    pieData.push({ name: '아직 방문 기록이 없습니다', value: 1, fill: '#e2e8f0' });
  }

  // 최근 7일 방문자 패치
  const lineData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setHours(d.getHours() - 24 * i);
    const dStr = getKSTDateString(d);
    const ds = await getDailyStats(dStr);
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
