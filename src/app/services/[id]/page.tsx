import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ChevronDown, ChevronRight, Check, Clock, MapPin, Phone } from 'lucide-react';
import content from '../../../../content.json';
import { getServiceDetail, serviceDetails } from '@/lib/serviceDetails';
import { listPostsByCategory } from '@/lib/blog';
import BlogCTACard from '@/components/BlogCTACard';
import BlogRelatedPosts from '@/components/BlogRelatedPosts';
import ClientTrackedLink from '@/components/ClientTrackedLink';

export const revalidate = 60;

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return Object.keys(serviceDetails).map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = content.services.find((s) => s.id === id);
  const detail = getServiceDetail(id);
  if (!service || !detail) return {};

  return {
    title: `${service.title} | 경희리온한의원`,
    description: detail.hero.sub,
    alternates: { canonical: `/services/${id}` },
    robots: detail.isSample ? { index: false, follow: false } : undefined,
  };
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-8 md:mb-10">
      <p className="text-sm font-semibold text-primary mb-2">{eyebrow}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight break-keep">{title}</h2>
      {description && <p className="mt-3 text-gray-600 text-lg leading-relaxed break-keep">{description}</p>}
    </div>
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const service = content.services.find((s) => s.id === id);
  const detail = getServiceDetail(id);
  if (!service || !detail) notFound();

  const relatedPosts = detail.relatedCategory
    ? (await listPostsByCategory(detail.relatedCategory, 3).catch(() => []))
    : [];

  const trackingCategory = `ServiceDetail_${id}`;
  const phone = content.guide.contact;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: detail.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="animate-in fade-in pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {detail.isSample && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-800 text-sm text-center px-4 py-2 break-keep">
          시범 페이지입니다. 표시된 가격·횟수·문구는 임의의 샘플이며 검색엔진에 노출되지 않습니다.
        </div>
      )}

      <div className="max-w-screen-lg mx-auto px-4">
        <nav aria-label="breadcrumb" className="pt-8 text-sm text-gray-500 flex items-center gap-1">
          <Link href="/services" className="hover:text-primary transition-colors">진료 안내</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{service.title}</span>
        </nav>

        {/* 1. 히어로 */}
        <section className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center py-10 md:py-16">
          <div>
            <p className="text-primary font-semibold mb-3">{service.title}</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight break-keep">
              {detail.hero.headline}
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed break-keep">{detail.hero.sub}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {detail.hero.highlights.map((h) => (
                <li key={h} className="bg-primary/10 text-primary font-semibold text-sm px-4 py-2 rounded-full">
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <ClientTrackedLink
                href={content.header.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                action="click_booking"
                category={trackingCategory}
                label="hero"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                <Calendar className="w-5 h-5" />
                네이버 예약
              </ClientTrackedLink>
              <ClientTrackedLink
                href={`tel:${phone.replace(/-/g, '')}`}
                action="click_phone"
                category={trackingCategory}
                label="hero"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Phone className="w-5 h-5" />
                {phone}
              </ClientTrackedLink>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
            <Image
              src={detail.hero.image}
              alt={service.title}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* 2. 증상 */}
        <section className="py-10 md:py-14 border-t border-gray-100">
          <SectionHeading eyebrow="이런 불편함이 있다면" title="이런 증상으로 찾아오세요" />
          <ul className="grid sm:grid-cols-2 gap-3">
            {detail.symptoms.items.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl bg-gray-50 border border-gray-100 px-5 py-4">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-gray-800 font-medium break-keep">{item}</span>
              </li>
            ))}
          </ul>
          {detail.symptoms.note && (
            <p className="mt-5 text-gray-500 break-keep">{detail.symptoms.note}</p>
          )}
        </section>

        {/* 3. 진단 */}
        <section className="py-10 md:py-14 border-t border-gray-100">
          <SectionHeading eyebrow="진단" title="치료 전에 먼저 확인합니다" description={detail.diagnosis.description} />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
              <Image
                src={detail.diagnosis.image}
                alt="진단 장비"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <ul className="space-y-4">
              {detail.diagnosis.items.map((item, i) => (
                <li key={item.name} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg break-keep">{item.name}</h3>
                    <p className="mt-1 text-gray-600 leading-relaxed break-keep">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {detail.diagnosis.note && <p className="mt-5 text-sm text-gray-500 break-keep">※ {detail.diagnosis.note}</p>}
        </section>

        {/* 4. 치료 방법 */}
        <section className="py-10 md:py-14 border-t border-gray-100">
          <SectionHeading
            eyebrow="치료 방법"
            title="상태에 맞게 조합합니다"
            description="모든 치료를 모두에게 적용하지 않습니다. 진단 결과에 따라 필요한 치료만 선택합니다."
          />
          <div className="space-y-3">
            {detail.treatments.map((t, i) => (
              <details
                key={t.name}
                open={i === 0}
                className="group rounded-3xl border border-gray-200 bg-white shadow-sm open:shadow-md transition-shadow"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 break-keep">{t.name}</h3>
                    <p className="mt-1 text-gray-500 break-keep">{t.summary}</p>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 pt-1 grid md:grid-cols-[1fr_220px] gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-2">이럴 때</p>
                    <ul className="flex flex-wrap gap-2 mb-5">
                      {t.suitableFor.map((s) => (
                        <li key={s} className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full">
                          {s}
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-700 leading-relaxed break-keep">{t.method}</p>
                    {t.note && <p className="mt-4 text-sm text-gray-500 break-keep">※ {t.note}</p>}
                  </div>
                  {t.image && (
                    <div className="relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden bg-gray-50">
                      <Image src={t.image} alt={t.name} fill sizes="220px" className="object-cover" />
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 5. 진료 과정 */}
        <section className="py-10 md:py-14 border-t border-gray-100">
          <SectionHeading eyebrow="진료 과정" title="첫 방문은 이렇게 진행됩니다" />
          <ol className="relative space-y-6 border-l-2 border-primary/20 ml-4">
            {detail.process.map((step, i) => (
              <li key={step.title} className="relative pl-8">
                <span className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold ring-4 ring-white">
                  {i + 1}
                </span>
                <h3 className="font-bold text-gray-900 text-lg break-keep">{step.title}</h3>
                <p className="mt-1 text-gray-600 leading-relaxed break-keep">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 6. 생활 관리 */}
        <section className="py-10 md:py-14 border-t border-gray-100">
          <SectionHeading eyebrow="생활 관리" title="치료 효과를 오래 유지하려면" />
          <div className="grid sm:grid-cols-2 gap-4">
            {detail.care.map((c) => (
              <div key={c.title} className="rounded-3xl bg-gray-50 border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-2 break-keep">{c.title}</h3>
                <p className="text-gray-600 leading-relaxed break-keep">{c.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. FAQ */}
        <section className="py-10 md:py-14 border-t border-gray-100">
          <SectionHeading eyebrow="자주 묻는 질문" title="미리 궁금하실 만한 내용입니다" />
          <div className="space-y-3">
            {detail.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-gray-200 bg-white">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-bold text-gray-900 break-keep">
                    <span className="text-primary mr-2">Q.</span>
                    {f.q}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-6 text-gray-600 leading-relaxed break-keep">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 8. 관련 칼럼 + CTA + 내원 안내 */}
        <section className="border-t border-gray-100 pt-4 max-w-screen-md mx-auto">
          <BlogRelatedPosts posts={relatedPosts} />
          <BlogCTACard eyebrow="어깨 통증이 신경 쓰이신다면" trackingCategory={trackingCategory} />

          <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-1 shrink-0" />
              <ul className="text-gray-700 space-y-1 break-keep">
                <li>{content.guide.hours.weekdays}</li>
                <li>{content.guide.hours.wednesday}</li>
                <li>{content.guide.hours.saturday}</li>
                <li className="text-gray-500 text-sm">{content.guide.hours.lunch}</li>
              </ul>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div className="text-gray-700 break-keep">
                <p>{content.guide.address}</p>
                <p className="text-gray-500 text-sm mt-1">{content.guide.parking}</p>
              </div>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
