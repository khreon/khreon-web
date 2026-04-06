import content from "../../../content.json";
import Image from "next/image";
import fs from "fs";
import path from "path";

export default function Services() {
  return (
    <div className="py-20 animate-in fade-in pb-32">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">진료 안내</h1>
          <p className="text-xl text-gray-600">환자별 맞춤형 진단과 체계적인 치료 시스템</p>
        </div>
        
        <div className="space-y-24">
          {content.services.map((service, idx) => {
             const imagePath = path.join(process.cwd(), 'public', service.image);
             const hasImage = fs.existsSync(imagePath);
             
             return (
               <div key={service.id} id={service.id} className={`flex flex-col md:flex-row gap-8 lg:gap-16 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                 <div className="w-full md:w-1/2">
                   <div className="bg-gray-50 aspect-[4/3] rounded-3xl flex flex-col items-center justify-center border border-gray-100 p-8 shadow-sm relative overflow-hidden group">
                      {hasImage ? (
                        <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <>
                          <span className="text-gray-400 font-medium tracking-wide mb-8 text-lg">이미지 준비중</span>
                          <div className="flex gap-2 flex-wrap justify-center px-4 relative z-10">
                            {service.keywords.map((kw, i) => (
                              <span key={i} className="bg-white px-4 py-2 rounded-full text-primary font-semibold shadow-sm border border-primary/10">#{kw}</span>
                            ))}
                          </div>
                        </>
                      )}
                   </div>
                 </div>
                 <div className="w-full md:w-1/2">
                   <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight break-keep">
                     {service.title}
                   </h2>
                   <p className="text-lg text-gray-600 leading-relaxed break-keep mb-8">
                     {service.description}
                   </p>
                   <ul className="space-y-3">
                     {service.points.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-700 font-medium text-lg break-keep">
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          {item}
                        </li>
                     ))}
                   </ul>
                 </div>
               </div>
             )
          })}
        </div>
      </div>
    </div>
  );
}
