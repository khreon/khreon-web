'use client';

import { useCallback, useEffect, useState } from 'react';
import { CalendarSearch, Loader2 } from 'lucide-react';
import { CATEGORY_META, type CategoryStats } from '@/lib/categories';

type Mode = 'day' | 'week' | 'month';

interface StatsResponse {
  mode: Mode;
  rangeLabel: string;
  inProgress: boolean;
  total: number;
  byCategory: CategoryStats;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function todayDateValue(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function todayMonthValue(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

function todayWeekValue(): string {
  const d = new Date();
  const utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((utc.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${utc.getUTCFullYear()}-W${pad(weekNo)}`;
}

const TABS: { mode: Mode; label: string }[] = [
  { mode: 'day', label: '일간' },
  { mode: 'week', label: '주간' },
  { mode: 'month', label: '월간' },
];

export default function AdminStatsRangeQuery() {
  const [mode, setMode] = useState<Mode>('day');
  const [dayValue, setDayValue] = useState(todayDateValue());
  const [weekValue, setWeekValue] = useState(todayWeekValue());
  const [monthValue, setMonthValue] = useState(todayMonthValue());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<StatsResponse | null>(null);

  const fetchStats = useCallback(async (queryMode: Mode, value: string) => {
    setLoading(true);
    setError(null);
    try {
      const param = queryMode === 'day' ? 'date' : queryMode === 'week' ? 'week' : 'month';
      const res = await fetch(`/api/admin/stats?mode=${queryMode}&${param}=${value}`);
      if (!res.ok) throw new Error('조회에 실패했습니다.');
      const data = (await res.json()) as StatsResponse;
      setResult(data);
    } catch {
      setError('조회 중 오류가 발생했습니다.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats('day', todayDateValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentValue = mode === 'day' ? dayValue : mode === 'week' ? weekValue : monthValue;

  const handleSearch = () => {
    fetchStats(mode, currentValue);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4">기간별 방문자 조회</h3>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="inline-flex rounded-xl bg-gray-100 p-1 self-start">
          {TABS.map(tab => (
            <button
              key={tab.mode}
              onClick={() => setMode(tab.mode)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                mode === tab.mode ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {mode === 'day' && (
            <input
              type="date"
              value={dayValue}
              onChange={e => setDayValue(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          )}
          {mode === 'week' && (
            <input
              type="week"
              value={weekValue}
              onChange={e => setWeekValue(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          )}
          {mode === 'month' && (
            <input
              type="month"
              value={monthValue}
              onChange={e => setMonthValue(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          )}
          <button
            onClick={handleSearch}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium bg-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CalendarSearch className="w-4 h-4" />}
            조회
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      {result && !error && (
        <div>
          <p className="text-sm text-gray-500 mb-3">
            조회 기간: <span className="font-medium text-gray-700">{result.rangeLabel}</span>
            {result.inProgress && <span className="ml-1.5 text-amber-600">(진행 중)</span>}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500">
                  <th className="text-left font-medium py-2 px-3">구분</th>
                  <th className="text-right font-medium py-2 px-3">조회수</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <td className="py-2 px-3 font-bold text-gray-900">총 조회수</td>
                  <td className="py-2 px-3 text-right font-bold text-gray-900">{result.total.toLocaleString()}회</td>
                </tr>
                {CATEGORY_META.map(meta => (
                  <tr key={meta.key} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 px-3 text-gray-600 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: meta.fill }} />
                      {meta.label}
                    </td>
                    <td className="py-2 px-3 text-right text-gray-800">
                      {(result.byCategory[meta.key] ?? 0).toLocaleString()}회
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!result && !error && !loading && (
        <p className="text-sm text-gray-400">조회할 기간을 선택하고 조회 버튼을 눌러주세요.</p>
      )}
    </div>
  );
}
