'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Newspaper } from 'lucide-react';

export default function AdminNavLinks() {
  const pathname = usePathname();
  const isDashboard = pathname === '/admin';
  const isLogs = pathname?.startsWith('/admin/logs');
  const isBlog = pathname?.startsWith('/admin/blog');

  return (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      <Link href="/admin" className={`flex items-center px-4 py-3 rounded-xl font-medium transition-colors ${isDashboard ? 'text-primary bg-primary/5' : 'text-gray-500 hover:bg-gray-50'}`}>
        <LayoutDashboard className="w-5 h-5 mr-3" />
        대시보드
      </Link>
      <Link href="/admin/logs" className={`flex items-center px-4 py-3 rounded-xl font-medium transition-colors ${isLogs ? 'text-primary bg-primary/5' : 'text-gray-500 hover:bg-gray-50'}`}>
        <Users className="w-5 h-5 mr-3" />
        상세 트래픽 (봇 로그)
      </Link>
      <Link href="/admin/blog" className={`flex items-center px-4 py-3 rounded-xl font-medium transition-colors ${isBlog ? 'text-primary bg-primary/5' : 'text-gray-500 hover:bg-gray-50'}`}>
        <Newspaper className="w-5 h-5 mr-3" />
        칼럼 관리
      </Link>
    </nav>
  );
}
