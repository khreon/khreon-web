import { Phone, Calendar, MessageCircle } from 'lucide-react';
import content from '../../content.json';

export default function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[60] flex shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
      <a href={`tel:${content.guide.contact.replace(/-/g, "")}`} className="flex-1 py-3 flex flex-col items-center justify-center gap-1 active:bg-gray-50 transition-colors">
        <Phone className="w-5 h-5 text-gray-600" />
        <span className="text-[11px] font-medium text-gray-600">전화상담</span>
      </a>
      <a href={content.header.bookingUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 flex flex-col items-center justify-center gap-1 bg-primary text-white active:bg-primary-dark transition-colors">
        <Calendar className="w-5 h-5" />
        <span className="text-[11px] font-medium text-white max-sm:font-semibold">네이버 예약</span>
      </a>
      <a href={content.sns.kakao} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 flex flex-col items-center justify-center gap-1 transition-colors" style={{ backgroundColor: '#fee500' }}>
        <MessageCircle className="w-5 h-5 text-[#3c1e1e]" />
        <span className="text-[11px] font-medium text-[#3c1e1e]">카톡상담</span>
      </a>
    </div>
  );
}
