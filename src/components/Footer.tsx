import content from '../../content.json';
import Link from 'next/link';
import ClientTrackedLink from "@/components/ClientTrackedLink";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-24 md:pb-12 text-sm text-gray-600">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-4 text-primary tracking-tight">{content.hospitalName}</h3>
          <p className="mb-2">주소: {content.guide.address}</p>
          <p className="mb-2">전화: <a href={`tel:${content.guide.contact.replace(/-/g, "")}`} className="hover:text-primary font-bold text-gray-800">{content.guide.contact}</a></p>
          <p className="mb-2">주차: {content.guide.parking}</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-4">진료 시간</h3>
          <ul className="space-y-2">
            <li>{content.guide.hours.weekdays}</li>
            <li>{content.guide.hours.wednesday}</li>
            <li>{content.guide.hours.saturday}</li>
            <li className="text-gray-400 mt-3 text-xs leading-relaxed">{content.guide.hours.lunch}<br />{content.guide.hours.closed}</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-4">고객 지원</h3>
          <ul className="space-y-2 flex flex-col items-start font-medium text-gray-500">
             <li><Link href="/guide" className="hover:text-primary transition-colors">오시는 길 안내</Link></li>
             <li><ClientTrackedLink href={content.header.bookingUrl} action="click_booking" category="Footer" label="Naver Booking" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">네이버 예약 바로가기</ClientTrackedLink></li>
             <li><ClientTrackedLink href={content.sns.talk} action="click_consult" category="Footer" label="Naver Talk" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">네이버 톡톡 상담</ClientTrackedLink></li>
             <li><ClientTrackedLink href={content.sns.kakao} action="click_consult" category="Footer" label="Kakao Talk" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">카카오톡 채널 상담</ClientTrackedLink></li>
             <li><ClientTrackedLink href={content.sns.blog} action="click_social" category="Footer" label="Naver Blog" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">공식 블로그</ClientTrackedLink></li>
          </ul>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 mt-10 pt-6 border-t border-gray-200 text-xs text-gray-400 text-center">
        &copy; {new Date().getFullYear()} {content.hospitalName}. All rights reserved.
      </div>
    </footer>
  );
}
