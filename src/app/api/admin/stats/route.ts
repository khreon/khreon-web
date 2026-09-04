import { NextRequest, NextResponse } from 'next/server';
import { getDailyStats, getRangeStats, getWeekRange, getMonthRange, clampRangeToToday } from '@/lib/stats';

function isAuthorized(request: NextRequest): boolean {
  const adminAuth = request.cookies.get('admin_auth')?.value;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  return adminAuth === adminPassword;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const mode = searchParams.get('mode');

  let start: string;
  let end: string;

  if (mode === 'day') {
    const date = searchParams.get('date');
    if (!date) return NextResponse.json({ error: 'date is required' }, { status: 400 });
    start = date;
    end = date;
  } else if (mode === 'week') {
    const week = searchParams.get('week');
    if (!week) return NextResponse.json({ error: 'week is required' }, { status: 400 });
    ({ start, end } = getWeekRange(week));
  } else if (mode === 'month') {
    const month = searchParams.get('month');
    if (!month) return NextResponse.json({ error: 'month is required' }, { status: 400 });
    ({ start, end } = getMonthRange(month));
  } else {
    return NextResponse.json({ error: 'mode must be one of day, week, month' }, { status: 400 });
  }

  const { start: queryStart, end: queryEnd, inProgress } = clampRangeToToday(start, end);

  const byCategory = mode === 'day' ? await getDailyStats(queryStart) : (await getRangeStats(queryStart, queryEnd)).byCategory;
  const total = Object.values(byCategory).reduce((sum, v) => sum + v, 0);

  const rangeLabel = start === end ? start : `${start} ~ ${end}`;

  return NextResponse.json({
    mode,
    rangeLabel,
    inProgress,
    total,
    byCategory,
  });
}
