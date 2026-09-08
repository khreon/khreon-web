import { Calendar, Phone, MessageCircle } from 'lucide-react';
import content from '../../content.json';
import ClientTrackedLink from '@/components/ClientTrackedLink';

export default function BlogCTACard() {
  return (
    <div className="mt-12 rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-8 shadow-md">
      <p className="text-sm font-medium text-gray-500 mb-1">이 글이 도움이 되셨다면</p>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 break-keep">
        {content.hospitalName}에 상담받아보세요
      </h2>

      <ClientTrackedLink
        href={content.header.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        action="click_booking"
        category="BlogCTACard"
        className="flex items-center justify-center gap-2 w-full rounded-full bg-primary px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        <Calendar className="w-5 h-5" />
        네이버 예약
      </ClientTrackedLink>

      <div className="mt-3 flex gap-3">
        <ClientTrackedLink
          href={`tel:${content.guide.contact.replace(/-/g, '')}`}
          action="click_phone"
          category="BlogCTACard"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
        >
          <Phone className="w-4 h-4" />
          전화상담
        </ClientTrackedLink>
        <ClientTrackedLink
          href={content.sns.kakao}
          target="_blank"
          rel="noopener noreferrer"
          action="click_consult"
          category="BlogCTACard"
          label="Kakao"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-[#3c1e1e] transition-colors"
          style={{ backgroundColor: '#fee500' }}
        >
          <MessageCircle className="w-4 h-4" />
          카톡상담
        </ClientTrackedLink>
      </div>
    </div>
  );
}
