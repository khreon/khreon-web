import { Redis } from '@upstash/redis';
import { CATEGORY_META, emptyCategoryStats, type CategoryStats } from '@/lib/categories';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '',
});

const hasRedisConfig = Boolean(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL);

export { CATEGORY_META };
export type { CategoryStats };

function formatDateUTC(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** 오늘 날짜(KST)를 YYYY-MM-DD 형식으로 반환 */
export function getKSTDateString(base: Date = new Date()): string {
  const kst = new Date(base);
  kst.setHours(kst.getHours() + 9);
  return kst.toISOString().split('T')[0];
}

/** 특정일(YYYY-MM-DD)의 카테고리별 조회수 */
export async function getDailyStats(dateStr: string): Promise<CategoryStats> {
  if (!hasRedisConfig) return emptyCategoryStats();
  try {
    const raw = (await redis.hgetall(`stats:visits:${dateStr}`)) as Record<string, number> | null;
    return { ...emptyCategoryStats(), ...raw };
  } catch (e) {
    console.error('KV Error:', e);
    return emptyCategoryStats();
  }
}

/** start~end(YYYY-MM-DD, 포함) 범위의 카테고리별/총 조회수 합계 */
export async function getRangeStats(startStr: string, endStr: string): Promise<{ total: number; byCategory: CategoryStats }> {
  const start = new Date(`${startStr}T00:00:00Z`);
  const end = new Date(`${endStr}T00:00:00Z`);

  const byCategory = emptyCategoryStats();
  if (start > end) return { total: 0, byCategory };

  const dates: string[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    dates.push(formatDateUTC(cur));
    cur.setUTCDate(cur.getUTCDate() + 1);
  }

  const results = await Promise.all(dates.map(getDailyStats));
  for (const day of results) {
    for (const meta of CATEGORY_META) {
      byCategory[meta.key] += day[meta.key] || 0;
    }
  }
  const total = CATEGORY_META.reduce((sum, meta) => sum + byCategory[meta.key], 0);
  return { total, byCategory };
}

function getIsoWeekMonday(year: number, week: number): Date {
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Day = jan4.getUTCDay() || 7; // 월=1 ... 일=7
  const week1Monday = new Date(jan4);
  week1Monday.setUTCDate(jan4.getUTCDate() - jan4Day + 1);
  const monday = new Date(week1Monday);
  monday.setUTCDate(week1Monday.getUTCDate() + (week - 1) * 7);
  return monday;
}

/** ISO 주차 문자열("YYYY-Www")을 월요일~일요일 날짜 범위로 변환 */
export function getWeekRange(weekStr: string): { start: string; end: string } {
  const [yearStr, wPart] = weekStr.split('-W');
  const year = parseInt(yearStr, 10);
  const week = parseInt(wPart, 10);
  const monday = getIsoWeekMonday(year, week);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  return { start: formatDateUTC(monday), end: formatDateUTC(sunday) };
}

/** 월 문자열("YYYY-MM")을 1일~말일 날짜 범위로 변환 */
export function getMonthRange(monthStr: string): { start: string; end: string } {
  const [yearStr, monthPart] = monthStr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthPart, 10); // 1~12
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return { start: `${monthStr}-01`, end: `${monthStr}-${String(lastDay).padStart(2, '0')}` };
}

/** 범위의 끝이 오늘(KST) 이후면 오늘까지로 잘라내고 진행 중 여부를 함께 반환 */
export function clampRangeToToday(start: string, end: string): { start: string; end: string; inProgress: boolean } {
  const today = getKSTDateString();
  const inProgress = end > today;
  return { start, end: inProgress ? today : end, inProgress };
}
