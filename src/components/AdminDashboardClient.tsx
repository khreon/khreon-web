'use client';

import { Users, Bot, TrendingUp, MonitorSmartphone } from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as PieTooltip, Legend as PieLegend,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip,
} from 'recharts';

interface DashboardProps {
  todayVisitors: number;
  botPercentage: number;
  pieData: Array<{ name: string; value: number; fill: string }>;
  lineData: Array<{ name: string; visitors: number }>;
}

export default function AdminDashboardClient({ todayVisitors, botPercentage, pieData, lineData }: DashboardProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">오늘의 전체 방문</p>
            <h3 className="text-2xl font-bold text-gray-900">{todayVisitors}<span className="text-sm font-medium text-gray-400 ml-1">회</span></h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Bot className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">AI 봇 비중 (오늘)</p>
            <h3 className="text-2xl font-bold text-gray-900">{botPercentage}<span className="text-sm font-medium text-gray-400 ml-1">%</span></h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><TrendingUp className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">GA4 연동 차트</p>
            <h3 className="text-sm font-bold text-gray-400 mt-1">대시보드에서 확인</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><MonitorSmartphone className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">기기 환경</p>
            <h3 className="text-sm font-bold text-gray-400 mt-1">대시보드에서 확인</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart for Total Visits */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-6">일간 방문 추이 <span className="text-sm font-normal text-gray-400 ml-2">(최근 7일, AI 포함)</span></h3>
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

        {/* Pie Chart for Bot vs Human */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">오늘의 누적 접속 주체</h3>
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

      </div>
    </div>
  );
}
