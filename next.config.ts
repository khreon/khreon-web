import type { NextConfig } from "next";

// 워드프레스 시절 글 주소(루트 경로, /slug/)를 새 사이트의 /blog/slug 로 이전한다.
// 대부분은 슬러그가 그대로지만, 발행 후 워드프레스에서 슬러그를 수정한 2건은 새 슬러그로 매핑한다.
const WORDPRESS_SLUG_REDIRECTS: [string, string][] = [
  ['osipgyeon-jeoljeolo-nannayo-chiryo-anbadeumyeon', 'osipgyeon-jeoljeolo-nannayo-chiryo-anbadeumyeon'],
  ['osipgyeon-hoebok-gigan', 'osipgyeon-hoebok-gigan'],
  ['child-frequent-illness-when-to-visit-clinic', 'child-frequent-illness-when-to-visit-clinic'],
  ['kid-poor-appetite-height-growth', 'kid-poor-appetite-height-growth'],
  ['car-accident-settlement-timing-treatment-period', 'car-accident-settlement-timing-treatment-period'],
  ['rotator-cuff-tear-natural-healing-without-surgery', 'rotator-cuff-tear-natural-healing-without-surgery'],
  ['back-sprain-vs-herniated-disc-carrying-baby', 'back-sprain-vs-herniated-disc-carrying-baby'],
  ['driving-back-pain-disc-vs-muscle-pain', 'driving-back-pain-disc-vs-muscle-pain'],
  ['shoulder-calcific-tendinitis-korean-medicine', 'shoulder-calcific-tendinitis-korean-medicine'],
  ['tennis-elbow-acupuncture-pharmacopuncture', 'tennis-elbow-acupuncture-pharmacopuncture'],
  ['postpartum-tonic-timing', 'postpartum-tonic-timing'],
  ['herniated-disc-acupuncture-effect', 'herniated-disc-acupuncture-effect'],
  ['facial-palsy-korean-medicine-treatment', 'facial-palsy-korean-medicine-treatment'],
  ['car-accident-back-pain-lasts-long', 'car-accident-back-pain-lasts-long'],
  ['child-immunity-herbal-medicine', 'child-immunity-herbal-medicine'],
  ['ivf-preparation-herbal-medicine', 'ivf-preparation-herbal-medicine'],
  ['chronic-shoulder-pain-axillary-nerve-yakchim', 'chronic-shoulder-pain-axillary-nerve-yakchim'],
  ['traffic-accident-delayed-onset-pain', 'traffic-accident-delayed-onset-pain'],
  ['frozen-shoulder-vs-rotator-cuff', 'frozen-shoulder-vs-rotator-cuff'],
  ['soa-seongjang-chiryo-sinho-3gaji', 'soa-seongjang-chiryo-sinho-3gaji'],
  ['diet-herbal-medicine-appetite-metabolism', 'diet-herbal-medicine-appetite-metabolism'],
  ['children-growth-treatment-genetics-environment', 'children-growth-treatment-genetics-environment'],
  ['menopause-herbal-medicine-vs-hormone-therapy', 'menopause-herbal-medicine-vs-hormone-therapy'],
  ['neck-disc-chuna-therapy-before-surgery', 'neck-disc-chuna-therapy-before-surgery'],
  ['traffic-accident-sequelae-early-treatment', 'traffic-accident-sequelae-early-treatment'],
  ['children-growth-herbal-medicine-ingredients', 'children-growth-herbal-medicine-ingredients'],
  ['postpartum-herbal-medicine-best-timing', 'postpartum-herbal-medicine-best-timing'],
  ['rotator-cuff-tear-surgery-vs-conservative-treatment', 'rotator-cuff-tear-surgery-vs-conservative-treatment'],
  ['rotator-cuff-pdrn-injection-treatment', 'rotator-cuff-pdrn-injection-treatment'],
  ['frozen-shoulder-sleeper-stretch-rehabilitation', 'frozen-shoulder-sleeper-stretch-rehabilitation'],
  ['ivf-korean-medicine-pregnancy-rate', 'ivf-korean-medicine-pregnancy-rate'],
  ['shoulder-pain-exercise-or-rest-rotator-cuff-vs-frozen-shoulder', 'shoulder-pain-exercise-or-rest-rotator-cuff-vs-frozen-shoulder'],
  ['pediatric-growth-acupuncture-knee-ankle-bone-growth', 'pediatric-growth-acupuncture-knee-ankle-bone-growth'],
  // 워드프레스에서 발행 후 슬러그가 바뀐 글
  ['deer-antler-growth', 'velvet-antler-growth-herbal-medicine'],
  ['traffic-accident-treatment', 'traffic-accident-sequelae-fast-recovery'],
];

// 로컬 초안이 없어 이번에 이전되지 않은 글 (해당 카테고리 목록으로 보낸다)
const WORDPRESS_ORPHAN_REDIRECTS: [string, string][] = [
  ['traffic-accident-back-pain', '/blog/category/traffic-accident'],
  ['traffic-accident-neck-pain', '/blog/category/traffic-accident'],
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...WORDPRESS_SLUG_REDIRECTS.map(([oldSlug, newSlug]) => ({
        source: `/${oldSlug}`,
        destination: `/blog/${newSlug}`,
        permanent: true,
      })),
      ...WORDPRESS_ORPHAN_REDIRECTS.map(([oldSlug, destination]) => ({
        source: `/${oldSlug}`,
        destination,
        permanent: true,
      })),
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
  experimental: {
    // 이미지는 브라우저에서 Blob으로 직접 업로드되므로, 이 값은 텍스트 필드만 감당하면 된다.
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
