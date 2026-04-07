'use client';

import { useState } from 'react';
import { Calendar, Bot, Clock } from 'lucide-react';

interface LogEntry {
  timestamp: string;
  botName: string;
  path: string;
  userAgent: string;
}

export default function AdminLogsClient({ initialLogs, todayDate }: { initialLogs: LogEntry[], todayDate: string }) {
  const [filter, setFilter] = useState<string>('All');

  // 중복 없는 봇 이름 추출 후 필터 목록 구성
  const bots = Array.from(new Set(initialLogs.map(l => l.botName)));
  const filters = ['All', ...bots];

  const filteredLogs = filter === 'All' ? initialLogs : initialLogs.filter(l => l.botName === filter);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          {todayDate} 봇 방문 상세 로그
        </h2>
        <div className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
          당일 누적 수집량 <span className="text-primary font-bold ml-1">{initialLogs.length}</span> 건
        </div>
      </div>

      {/* 필터 칩 */}
      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f 
                ? 'bg-primary text-white border border-primary shadow-md transform scale-105' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f === 'All' ? '전체 보기' : f}
          </button>
        ))}
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">접속 시간 (KST)</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">봇 이름 (식별자)</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">방문 경로</th>
                <th className="px-6 py-4 font-semibold hidden md:table-cell">User-Agent 데이터</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-gray-400">
                    <Bot className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    해당 조건의 방문 로그가 아직 없습니다.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, i) => {
                  const d = new Date(log.timestamp);
                  // 시간 포맷 (오후 1:23:45 형식이 아닌 24시간제 밀리초제외)
                  const timeString = d.toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
                  
                  return (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-medium font-mono text-gray-500 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {timeString}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {log.botName}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {log.path}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-400 max-w-xs truncate hidden md:table-cell" title={log.userAgent}>
                        {log.userAgent}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
