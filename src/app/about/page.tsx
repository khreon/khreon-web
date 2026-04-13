import Image from "next/image";
import content from "../../../content.json";
import { GraduationCap, Award } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "인사말 | 경희리온한의원",
  description: "환자의 통증의 뿌리를 찾아 근본적인 치유를 돕는 경희리온한의원 대표원장 인사말 및 철학을 확인해보세요.",
  alternates: {
    canonical: '/about',
  },
};

export default function About() {
  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="bg-primary/5 py-16 md:py-24 px-4 text-center border-b border-primary/10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">{content.about.philosophy.title}</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto break-keep leading-relaxed">
          {content.about.philosophy.description}
        </p>
      </div>

      <section className="py-20 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
          <div className="w-full md:w-5/12">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <Image src={content.about.doctor.image} alt="대표원장" fill className="object-cover" />
            </div>
          </div>
          <div className="w-full md:w-7/12">
            <div className="mb-10">
              {content.about.doctor.specialty && (
                <h2 className="text-xl text-primary font-bold mb-3 tracking-wide">{content.about.doctor.specialty}</h2>
              )}
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{content.about.doctor.name}</h3>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed break-keep italic py-4 border-l-4 border-primary pl-6 bg-gray-50/50 rounded-r-xl">
                &quot;통증의 뿌리를 찾아 근본적인 치유를 돕습니다.<br className="hidden md:block"/> 따뜻한 마음과 차가운 이성으로 환자의 소리에 귀 기울이겠습니다.&quot;
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-10 mt-12">
              <div>
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-gray-100">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  <h4 className="text-xl font-bold text-gray-800">학력 및 약력</h4>
                </div>
                <ul className="space-y-3 text-gray-600 list-disc list-inside marker:text-primary/50">
                  <li>{content.about.doctor.education}</li>
                  {content.about.doctor.experience.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-5 pb-2 border-b border-gray-100">
                  <Award className="w-6 h-6 text-primary" />
                  <h4 className="text-xl font-bold text-gray-800">학회 활동</h4>
                </div>
                <ul className="space-y-3 text-gray-600 list-disc list-inside marker:text-primary/50">
                  {content.about.doctor.memberships.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 px-4 rounded-t-[3rem]">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 tracking-tight">쾌적하고 편안한 진료 환경</h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="relative group rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
              <Image src="/images/lobby-view.jpg" alt="대기실 전경" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8 pt-20">
                 <p className="text-white font-bold text-xl drop-shadow-md">대기실 및 로비</p>
              </div>
            </div>
            <div className="relative group rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
              <Image src="/images/treatment-room.jpg" alt="진료실" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8 pt-20">
                 <p className="text-white font-bold text-xl drop-shadow-md">2인 치료실</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
