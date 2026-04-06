'use client';

import { Users, Bot, TrendingUp, MonitorSmartphone } from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as PieTooltip, Legend as PieLegend,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip,
  BarChart, Bar, XAxis as BarXAxis, YAxis as BarYAxis, CartesianGrid as BarGrid, Tooltip as BarTooltip
} from 'recharts';

export default function AdminDashboard() {
  const pieData = [
    { name: 'GPTBot', value: 45, fill: '#10b981' }, // Primary green
    { name: 'Googlebot', value: 25, fill: '#3b82f6' }, // Blue
    { name: 'Claude', value: 15, fill: '#f59e0b' }, // Amber
    { name: 'Human', value: 15, fill: '#6366f1' }, // Indigo
  ];

  const lineData = [
    { name: '04/01', visitors: 120 },
    { name: '04/02', visitors: 150 },
    { name: '04/03', visitors: 140 },
    { name: '04/04', visitors: 210 },
    { name: '04/05', visitors: 190 },
    { name: '04/06', visitors: 280 },
    { name: '04/07', visitors: 320 },
  ];

  const barData = [
    { name: '네이버', visits: 520, fill: '#22c55e' },
    { name: '구글', visits: 380, fill: '#3b82f6' },
    { name: '인스타', visits: 150, fill: '#ec4899' },
    { name: '직접유입', visits: 80, fill: '#94a3b8' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">오늘의 방문자</p>
            <h3 className="text-2xl font-bold text-gray-900">320<span className="text-sm font-medium text-gray-400 ml-1">명</span></h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Bot className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">AI 봇 트래픽</p>
            <h3 className="text-2xl font-bold text-gray-900">85<span className="text-sm font-medium text-gray-400 ml-1">%</span></h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><TrendingUp className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">전주 대비 증감율</p>
            <h3 className="text-2xl font-bold text-emerald-500">+24.5<span className="text-sm font-medium ml-1">%</span></h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><MonitorSmartphone className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">모바일 비중</p>
            <h3 className="text-2xl font-bold text-gray-900">76<span className="text-sm font-medium text-gray-400 ml-1">%</span></h3>
          </div>
        </div>
      </div>

      {/* Charts Array */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6">일간 방문자 추이 <span className="text-sm font-normal text-gray-400 ml-2">(최근 7일)</span></h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="visitors" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                <CartesianGrid stroke="#f1f5f9" strokeDasharray="5 5" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} dy={10} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} dx={-10} />
                <LineTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">접속 모델 비중</h3>
          <div className="h-[300px] w-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <PieTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <PieLegend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-3">
          <h3 className="text-lg font-bold text-gray-900 mb-6">유입 경로 순위</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <BarGrid stroke="#f1f5f9" strokeDasharray="5 5" horizontal={false} />
                <BarXAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
                <BarYAxis dataKey="name" type="category" tick={{ fill: '#475569', fontSize: 13, fontWeight: 500 }} width={80} tickLine={false} axisLine={false} />
                <BarTooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                />
                <Bar dataKey="visits" radius={[0, 6, 6, 0]} barSize={24}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
