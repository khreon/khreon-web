import { Redis } from '@upstash/redis';
import { unstable_noStore as noStore } from 'next/cache';
import AdminLogsClient from '@/components/AdminLogsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '',
});

export default async function AdminLogsPage() {
  noStore();

  const now = new Date();
  now.setHours(now.getHours() + 9);
  const date = now.toISOString().split('T')[0];
  const listKey = `logs:bots:${date}`;

  let rawLogs: string[] = [];
  if (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) {
    try {
      rawLogs = await redis.lrange(listKey, 0, 1999); // 최대 2000개 로드
    } catch {
      rawLogs = [];
    }
  }

  // JSON 파싱 및 구조 무결성 보장
  const logs = rawLogs.map(item => {
    try {
      return typeof item === 'string' ? JSON.parse(item) : item;
    } catch {
      return null;
    }
  }).filter(Boolean);

  return <AdminLogsClient initialLogs={logs} todayDate={date} />;
}
