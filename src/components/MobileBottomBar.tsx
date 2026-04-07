import { Phone, Calendar, MessageCircle } from 'lucide-react';
import content from '../../content.json';
import ClientTrackedLink from "@/components/ClientTrackedLink";

export default function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[60] flex shadow-[0_-4px_10px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
      <ClientTrackedLink href={`tel:${content.guide.contact.replace(/-/g, "")}`} action="click_phone" category="MobileBottomBar" className="flex-1 py-3 flex flex-col items-center justify-center gap-1 active:bg-gray-50 transition-colors">
        <Phone className="w-5 h-5 text-gray-600" />
        <span className="text-[11px] font-medium text-gray-600">전화상담</span>
      </ClientTrackedLink>
      <ClientTrackedLink href={content.header.bookingUrl} action="click_booking" category="MobileBottomBar" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 flex flex-col items-center justify-center gap-1 bg-primary text-white active:bg-primary-dark transition-colors">
        <Calendar className="w-5 h-5" />
        <span className="text-[11px] font-medium text-white max-sm:font-semibold">네이버 예약</span>
      </ClientTrackedLink>
      <ClientTrackedLink href={content.sns.kakao} action="click_consult" category="MobileBottomBar" label="Kakao" target="_blank" rel="noopener noreferrer" className="flex-1 py-3 flex flex-col items-center justify-center gap-1 transition-colors" style={{ backgroundColor: '#fee500' }}>
        <MessageCircle className="w-5 h-5 text-[#3c1e1e]" />
        <span className="text-[11px] font-medium text-[#3c1e1e]">카톡상담</span>
      </ClientTrackedLink>
    </div>
  );
}
