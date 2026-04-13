import Image from "next/image";
import content from "../../../content.json";
import fs from 'fs';
import path from 'path';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한약 및 처방 | 경희리온한의원",
  description: "식약처 인증 hGMP 청정 한약재를 엄선하여 원장이 직접 처방하는 맞춤형 한약 및 보약 처방 안내입니다.",
  alternates: {
    canonical: '/pharmacy',
  },
};

export default function Pharmacy() {
  return (
    <div className="py-20 animate-in fade-in pb-32">
       <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">한약 및 처방</h1>
          <p className="text-xl text-gray-600">엄선된 청정 한약재와 정성을 담은 원내 조제</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-24 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-10 border-l-4 border-primary pl-5">경희리온 조제 원칙</h2>
            <div className="space-y-6">
               <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                 <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3"><span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">1</span> 식약처 인증 hGMP 한약재</h3>
                 <p className="text-gray-600 leading-relaxed ml-11">중금속, 농약 등 철저한 품질 안전 검사를 통과한 의약품용 규격 한약재만을 사용합니다.</p>
               </div>
               <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                 <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3"><span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">2</span> 원장 직접 처방 및 관리</h3>
                 <p className="text-gray-600 leading-relaxed ml-11">대표원장이 직접 환자의 상태를 진단하고 가장 적합한 약재 조합을 선별하여 처방합니다.</p>
               </div>
               <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                 <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3"><span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">3</span> 위생적인 탕전 시스템</h3>
                 <p className="text-gray-600 leading-relaxed ml-11">안전하고 깨끗한 환경에서 현대적인 탕전 장비를 이용해 유효 성분을 추출합니다.</p>
               </div>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-auto h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl">
             <Image src="/images/korean-herbal-medicine.jpg" alt="한약 조제" fill className="object-cover" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-[3rem] p-8 md:p-16">
           <h2 className="text-3xl font-bold text-center text-gray-900 mb-16 tracking-tight">처방 라인업 상세</h2>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
             {content.pharmacy.map((item, idx) => {
                // Check if image exists on the file system
                const imagePath = path.join(process.cwd(), 'public', item.image);
                const hasImage = fs.existsSync(imagePath);
                
                return (
                  <div key={idx} className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/30 transition-all duration-300 overflow-hidden group flex flex-col h-full">
                    {/* Image or Placeholder Area */}
                    <div className="relative w-full aspect-[4/3] bg-gray-100/50 flex items-center justify-center overflow-hidden border-b border-gray-50">
                      {hasImage ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="text-gray-300 flex flex-col items-center">
                          <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          <span className="text-sm font-medium tracking-wide">이미지 준비중</span>
                        </div>
                      )}
                    </div>
                    {/* Content Area */}
                    <div className="p-8 flex-1 flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-2xl mb-5 shadow-inner">
                        <span className="text-xl text-primary font-bold">{item.name.charAt(0)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h3>
                      <p className="text-gray-600 leading-relaxed break-keep text-sm">{item.desc}</p>
                    </div>
                  </div>
                )
             })}
           </div>
        </div>
       </div>
    </div>
  );
}
