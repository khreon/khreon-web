'use client';

import { useActionState } from 'react';
import { loginAdmin } from '../actions';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [state, formAction] = useActionState(loginAdmin, null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden p-8 md:p-10 border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">관리자 로그인</h1>
        <p className="text-gray-500 text-center mb-8 break-keep">AEO 대시보드에 접근하려면 미리 설정된 비밀번호를 입력하세요.</p>
        
        <form action={formAction} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
            <input 
              type="password" 
              name="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          
          {state?.error && (
            <p className="text-red-600 text-sm font-medium text-center bg-red-50 p-3 rounded-lg">{state.error}</p>
          )}

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
