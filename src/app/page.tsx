import Image from "next/image";
import Link from "next/link";
import content from "../../content.json";
import { Activity, Stethoscope, CarFront, Salad, Sprout, Heart, ChevronRight } from "lucide-react";
import fs from 'fs';
import path from 'path';
import ClientTrackedLink from "@/components/ClientTrackedLink";

// Fallbacks for specific IDs, else defaults
const ICON_MAP: Record<string, React.ReactNode> = {
  spine: <Activity className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  joint: <Stethoscope className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  accident: <CarFront className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  diet: <Salad className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  growth: <Sprout className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  women: <Heart className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
};

import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src={content.hero.bgImage}
          alt="Lobby View"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-lg">
            {content.hero.mainTitle}
          </h1>
          <p className="text-lg md:text-xl font-medium mb-8 drop-shadow-md text-gray-100 max-w-2xl mx-auto break-keep">
            {content.hero.subTitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {content.hero.cta.map((cta, i) => (
               <ClientTrackedLink
                 key={i}
                 href={cta.url}
                 action={i === 0 ? 'click_booking' : 'click_consult'}
                 category="Hero"
                 label={cta.label}
                 target="_blank"
                 rel="noopener noreferrer"
                 className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-full transition-all transform hover:scale-105 shadow-xl ${i === 0 ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
               >
                 {cta.label} {i === 0 && <ChevronRight className="w-5 h-5" />}
               </ClientTrackedLink>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: mainFocus */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 tracking-tight">{content.mainFocus.title}</h2>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {content.mainFocus.features.map((feature, idx) => {
              const imagePath = path.join(process.cwd(), 'public', feature.image);
              const hasImage = fs.existsSync(imagePath);

              return (
                <div key={idx} className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 group flex flex-col h-full">
                  <div className="relative w-full aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-50">
                    {hasImage ? (
                       <Image src={feature.image} alt={feature.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                       <div className="text-gray-400 flex flex-col items-center">
                          <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          <span className="text-sm font-medium tracking-wide">이미지 준비중</span>
                       </div>
                    )}
                  </div>
                  <div className="p-10 flex-1 flex flex-col max-md:p-8">
                     <span className="text-primary font-bold tracking-wide mb-3 inline-block text-sm bg-primary/10 px-4 py-1.5 rounded-full w-fit">{feature.subtitle}</span>
                     <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">{feature.title}</h3>
                     <p className="text-gray-600 leading-relaxed text-lg max-md:text-base break-keep flex-1">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 rounded-[3rem] mt-8 mb-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 tracking-tight">진료 클리닉 안내</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {content.services.map((service) => (
              <Link 
                key={service.id} 
                href={`/services#${service.id}`}
                className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group"
              >
                <div className="mb-4 p-5 bg-primary/5 rounded-full group-hover:scale-110 transition-transform duration-500">
                  {ICON_MAP[service.id] || <Activity className="w-8 h-8 text-primary" />}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-sm md:text-base text-gray-500 break-keep leading-relaxed">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
