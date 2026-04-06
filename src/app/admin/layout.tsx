import Link from 'next/link';
import { LayoutDashboard, Users, LogOut, ActivitySquare } from 'lucide-react';
import { logoutAdmin } from './actions';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50/50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0">
          <ActivitySquare className="w-6 h-6 text-primary mr-2" />
          <span className="font-bold text-lg text-gray-900 tracking-tight">AEO Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin" className="flex items-center px-4 py-3 text-primary bg-primary/5 rounded-xl font-medium">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            대시보드
          </Link>
          <div className="flex items-center px-4 py-3 text-gray-400 cursor-not-allowed rounded-xl font-medium transition-colors">
            <Users className="w-5 h-5 mr-3" />
            방문자 로그 (준비중)
          </div>
        </nav>
        <div className="p-4 border-t border-gray-100 shrink-0">
          <form action={logoutAdmin}>
            <button type="submit" className="flex w-full items-center px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-colors">
              <LogOut className="w-5 h-5 mr-3" />
              로그아웃
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 md:px-8 justify-between shrink-0">
          <div className="flex items-center gap-2">
            {/* Mobile Title */}
            <ActivitySquare className="w-5 h-5 text-primary md:hidden" />
            <h1 className="text-lg md:text-xl font-bold text-gray-800">오버뷰</h1>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
               <span className="text-sm font-bold text-primary">A</span>
             </div>
             <span className="text-sm font-medium text-gray-700 hidden sm:block">관리자님</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
