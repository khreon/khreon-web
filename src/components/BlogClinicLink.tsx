import { ChevronRight, Stethoscope } from 'lucide-react';
import content from '../../content.json';
import ClientTrackedLink from '@/components/ClientTrackedLink';
import { getServiceDetailsByCategory } from '@/lib/serviceDetails';
import type { CategorySlug } from '@/lib/blog';

type Props = {
  category: CategorySlug | '';
};

export default function BlogClinicLink({ category }: Props) {
  if (!category) return null;

  const clinics = getServiceDetailsByCategory(category).flatMap((detail) => {
    const service = content.services.find((s) => s.id === detail.id);
    return service ? [{ detail, service }] : [];
  });

  if (clinics.length === 0) return null;

  const heading =
    clinics.length === 1
      ? `${clinics[0].service.title}, 더 자세히 알아보세요`
      : '관련 진료를 더 자세히 알아보세요';

  return (
    <div className="mt-14">
      <h2 className="mb-4 border-l-4 border-primary pl-3 text-lg md:text-xl font-bold text-gray-900 break-keep">
        {heading}
      </h2>
      <div className="space-y-3">
        {clinics.map(({ detail, service }) => (
          <ClientTrackedLink
            key={detail.slug}
            href={`/services/${detail.slug}`}
            action="click_clinic_link"
            category="BlogClinicLink"
            label={detail.slug}
            className="group flex flex-col gap-4 rounded-2xl border-2 border-primary/40 bg-primary-light px-5 py-5 transition-colors hover:border-primary sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="flex min-w-0 items-center gap-4">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <Stethoscope className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block text-base md:text-lg font-bold text-gray-900 break-keep">
                  {service.title}
                </span>
                <span className="mt-1 block text-sm text-gray-600 break-keep">
                  {service.keywords.join(' · ')}
                </span>
              </span>
            </span>
            <span className="inline-flex flex-shrink-0 items-center justify-center gap-1 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-primary-dark">
              진료 안내 보기
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </ClientTrackedLink>
        ))}
      </div>
    </div>
  );
}
