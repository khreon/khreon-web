import type { CategorySlug } from '@/lib/blog';

export type ServiceDetail = {
  /** content.json services[].id 와 동일 */
  id: string;
  /** true 이면 시범 안내 배너를 보여주고 검색엔진 색인을 막는다. 실제 내용 확정 후 제거. */
  isSample?: boolean;
  hero: {
    headline: string;
    sub: string;
    highlights: string[];
    image: string;
  };
  symptoms: {
    items: string[];
    note?: string;
  };
  diagnosis: {
    description: string;
    items: { name: string; description: string }[];
    image: string;
    note?: string;
  };
  treatments: {
    name: string;
    summary: string;
    suitableFor: string[];
    method: string;
    note?: string;
    image?: string;
  }[];
  process: { title: string; description: string }[];
  care: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
  relatedCategory?: CategorySlug;
};

// 아래 수치(가격, 횟수, 기간)와 문구는 시범용 임의 샘플입니다. 실제 값으로 교체하세요.
const joint: ServiceDetail = {
  id: 'joint',
  isSample: true,
  hero: {
    headline: '어깨 통증, 원인을 눈으로 확인하고 치료합니다',
    sub: '오십견인지 회전근개 손상인지에 따라 치료 방향이 달라집니다. 원장이 초음파로 직접 확인한 뒤 꼭 필요한 부위에만 정밀하게 치료합니다.',
    highlights: ['실시간 초음파 진단', 'PDRN 연어약침', '편안한 침 치료'],
    image: '/images/shoulder-joint-clinic.png',
  },
  symptoms: {
    items: [
      '팔을 들어 올릴 때 어깨가 아프거나 걸리는 느낌이 있어요',
      '밤에 자다가 어깨 통증 때문에 자주 깨요',
      '옷을 입거나 머리를 감는 동작이 불편해요',
      '손이 등 뒤로 잘 가지 않아요',
      '한쪽으로 누워 자기 힘들어요',
      '어깨에서 소리가 나거나 뻐근하게 뻗치는 통증이 있어요',
    ],
    note: '위 증상이 있다고 모두 같은 질환은 아닙니다. 진찰과 검사 후 원인에 맞는 치료를 정합니다.',
  },
  diagnosis: {
    description:
      '증상만으로 짐작하지 않고, 어깨 상태를 직접 확인한 뒤 치료 계획을 세웁니다.',
    items: [
      {
        name: '문진 및 가동범위 검사',
        description: '통증이 생기는 동작과 팔이 움직이는 범위를 확인합니다.',
      },
      {
        name: '실시간 초음파 진단',
        description:
          '원장이 직접 힘줄, 점액낭, 관절 주변 조직의 상태를 영상으로 보며 병변 부위를 가늠합니다.',
      },
      {
        name: '정밀검사 연계',
        description:
          '초음파로 확인하기 어렵거나 추가 검사가 필요하다고 판단되면 MRI 등 영상 검사 의뢰를 안내합니다.',
      },
    ],
    image: '/images/ultrasound-device.jpg',
    note: '초음파로 확인할 수 있는 범위에는 한계가 있습니다.',
  },
  treatments: [
    {
      name: '침 치료',
      summary: '긴장된 근육을 풀고 통증을 줄이는 기본 치료',
      suitableFor: ['어깨 뻐근함', '근육 긴장', '움직일 때 통증'],
      method:
        '어깨와 목, 등 주변의 긴장된 근육과 경혈에 침을 놓아 통증과 뻣뻣함을 줄입니다. 자극을 최소화해 침이 처음인 분도 부담이 적도록 시술합니다.',
      note: '건강보험이 적용되는 치료입니다.',
      image: '/images/acupuncture.jpg',
    },
    {
      name: '연어약침 (PDRN)',
      summary: '연어 유래 PDRN 성분을 활용한 약침',
      suitableFor: ['힘줄 부위 통증', '반복되는 어깨 통증', '회복이 더딘 경우'],
      method:
        '연어에서 얻은 PDRN 성분을 정제한 약침액을 초음파로 위치를 확인하며 필요한 부위에 주입합니다. 조직 회복을 돕는 것을 목적으로 하며, 적용 여부와 횟수는 상태에 따라 달라집니다.',
      note: '비급여 치료입니다. 약침 성분에 알레르기가 있는 경우 미리 알려주세요.',
      image: '/images/pharmacoacupunture.png',
    },
    {
      name: '추나요법',
      summary: '어깨를 둘러싼 뼈와 관절의 정렬을 맞추는 수기 치료',
      suitableFor: ['굽은 등과 라운드숄더', '견갑골 주변 통증', '목·어깨 연관 통증'],
      method:
        '어깨뿐 아니라 목, 등, 견갑골의 정렬 상태를 함께 살펴 틀어진 부분을 손으로 교정합니다. 어깨에 부담을 주는 자세 문제를 구조적으로 개선하는 데 목적이 있습니다.',
      note: '건강보험 적용은 질환과 횟수 등 요건에 따라 달라집니다.',
      image: '/images/chuna-therapy.jpg',
    },
    {
      name: '전침 및 온열 치료',
      summary: '침 치료를 보조하는 자극과 열 치료',
      suitableFor: ['만성 뻣뻣함', '찬 곳에서 심해지는 통증'],
      method:
        '침에 약한 전기 자극을 더하거나 어깨 부위를 따뜻하게 하여 혈류와 근육 이완을 돕습니다. 증상과 시기에 따라 적용합니다.',
      note: '심박동기 등 삽입형 전자 의료기기를 사용 중이면 반드시 알려주세요.',
    },
  ],
  process: [
    {
      title: '접수 및 문진',
      description: '통증이 시작된 시기, 아픈 동작, 복용 중인 약을 확인합니다.',
    },
    {
      title: '가동범위 검사와 초음파',
      description: '팔의 움직임을 살피고 초음파로 어깨 상태를 직접 확인합니다.',
    },
    {
      title: '진단 설명과 치료 계획',
      description: '현재 상태와 예상 치료 횟수, 방문 간격을 알기 쉽게 설명드립니다.',
    },
    {
      title: '치료',
      description: '침, 약침, 추나 등을 상태에 맞게 조합해 진행합니다.',
    },
    {
      title: '경과 확인',
      description: '회복 정도에 따라 치료 강도와 간격을 조정하고 관리 방법을 안내합니다.',
    },
  ],
  care: [
    {
      title: '아픈 쪽으로 눕지 않기',
      description: '밤에 통증이 심하다면 아픈 어깨 아래에 얇은 베개나 쿠션을 받쳐 압박을 줄여보세요.',
    },
    {
      title: '무리하게 들어 올리지 않기',
      description: '통증을 참고 팔을 억지로 올리거나 무거운 물건을 드는 동작은 피해주세요.',
    },
    {
      title: '가볍게 풀어주기',
      description: '팔을 아래로 늘어뜨리고 시계추처럼 작게 흔드는 동작은 부담이 적은 기본 운동입니다. 아프면 중단하세요.',
    },
    {
      title: '작업 자세 점검',
      description: '모니터는 눈높이에, 팔꿈치는 책상에 받쳐 어깨가 앞으로 말리지 않도록 해주세요.',
    },
  ],
  faqs: [
    {
      q: '치료는 얼마나 오래 받아야 하나요?',
      a: '질환의 종류와 진행 정도, 개인 상태에 따라 달라 일률적으로 말씀드리기 어렵습니다. 보통 초기에는 주 2~3회 집중적으로 치료한 뒤 회복에 따라 간격을 늘려갑니다.',
    },
    {
      q: '초음파 진단은 따로 비용이 드나요?',
      a: '진단 목적의 초음파와 초음파를 이용한 시술은 비용 구성이 다를 수 있습니다. 내원 시 해당 내용을 미리 설명드립니다.',
    },
    {
      q: '약침이 많이 아프지 않을까요?',
      a: '일반 침보다 약액이 들어가 묵직한 느낌이 있을 수 있으나, 시술 전에 방법과 느낌을 설명드리고 부담이 적도록 진행합니다.',
    },
    {
      q: '운동이나 일상생활은 그대로 해도 되나요?',
      a: '통증이 심한 시기에는 무리한 동작을 줄이는 것이 좋습니다. 상태에 맞는 활동 범위를 진료 시 안내해 드립니다.',
    },
    {
      q: '복용 중인 약이 있는데 치료받을 수 있나요?',
      a: '대부분 가능하지만 혈액응고에 영향을 주는 약이나 알레르기가 있는 경우 시술 방법이 달라질 수 있으니 접수 시 꼭 알려주세요.',
    },
  ],
  relatedCategory: 'orthopedics',
};

export const serviceDetails: Record<string, ServiceDetail> = {
  joint,
};

export function getServiceDetail(id: string): ServiceDetail | undefined {
  return serviceDetails[id];
}
