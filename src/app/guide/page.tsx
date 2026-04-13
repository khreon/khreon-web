import Image from "next/image";
import content from "../../../content.json";
import { MapPin, Phone, Car, Clock } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "오시는 길 | 경희리온한의원",
  description: "동탄 그랑파사쥬에 위치한 경희리온한의원 오시는 길, 주차 안내, 진료 시간을 안내해 드립니다.",
  alternates: {
    canonical: '/guide',
  },
};

export default function Guide() {
  return (
    <div className="py-20 animate-in fade-in pb-32">
       <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">오시는 길</h1>
          <p className="text-xl text-gray-600">환자분들의 발걸음이 헛되지 않도록 상세히 안내해 드립니다</p>
        </div>

        <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
          <div className="relative w-full aspect-video md:aspect-[21/9]">
            <Image src={content.guide.mapImage} alt="오시는 길 약도" fill className="object-cover" />
            <a href="https://map.naver.com" target="_blank" rel="noopener noreferrer" className="absolute bottom-6 right-6 md:bottom-8 md:right-8 px-6 py-3 bg-white text-gray-900 font-bold rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-sm flex items-center gap-2 z-10 border border-gray-100">
               <MapPin className="w-5 h-5 text-primary" /> 네이버 지도에서 보기
            </a>
          </div>
          
          <div className="p-8 md:p-12 lg:p-16 grid md:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-12">
              <div className="group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">찾아오시는 길</h2>
                </div>
                <p className="text-lg text-gray-600 mb-3 ml-16">{content.guide.address}</p>
                <div className="ml-16 bg-gray-50 border border-gray-200 inline-block px-4 py-2 rounded-lg text-sm text-gray-600 font-medium">그랑파사쥬 1단지 2층에 위치하고 있습니다.</div>
              </div>

              <div className="group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">전화 번호</h2>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight ml-16">{content.guide.contact}</p>
              </div>

              <div className="group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                    <Car className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">주차 안내</h2>
                </div>
                <div className="ml-16">
                  <p className="text-gray-600 break-keep text-base leading-relaxed p-4 bg-gray-50 rounded-xl border border-gray-100">{content.guide.parking}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10 border-2 border-primary/10 shadow-lg relative overflow-hidden h-fit">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
              <div className="flex items-center gap-3 mb-8">
                <Clock className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">진료 시간</h2>
              </div>
              <ul className="space-y-6">
                <li className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-gray-600 font-medium text-lg">평일 (월·화·목·금)</span>
                  <span className="text-gray-900 font-bold text-xl">{content.guide.hours.weekdays.replace("월·화·목·금 ", "")}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-gray-600 font-medium text-lg">수요일</span>
                  <span className="text-gray-900 font-bold text-xl">{content.guide.hours.wednesday.replace("수요일 ", "")}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-gray-600 font-medium text-lg">토·공휴일</span>
                  <span className="text-gray-900 font-bold text-xl">{content.guide.hours.saturday.replace("토·공휴일 ", "")}</span>
                </li>
              </ul>
              <div className="mt-8 pt-4 space-y-3 text-sm text-gray-500 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <p className="flex gap-2"><span className="font-bold text-gray-700 flex-shrink-0">점심시간</span> <span className="break-keep">{content.guide.hours.lunch.replace("점심시간 ", "")}</span></p>
                <p className="flex gap-2"><span className="font-bold text-gray-700 flex-shrink-0">휴무안내</span> <span className="text-red-500 font-medium">{content.guide.hours.closed}</span></p>
              </div>
            </div>
          </div>
        </div>
       </div>
    </div>
  );
}
