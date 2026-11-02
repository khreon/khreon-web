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
  /** 클리닉별로 필요한 추가 안내 (예: 보험 접수 절차, 응급 신호). 진료 과정 다음에 표시된다. */
  extraSections?: {
    eyebrow: string;
    title: string;
    description?: string;
    /** true 이면 번호가 붙은 단계형, 아니면 카드형 */
    numbered?: boolean;
    items: { title: string; description: string }[];
    note?: string;
  }[];
  care: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
  ctaEyebrow: string;
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
  ctaEyebrow: '어깨 통증이 신경 쓰이신다면',
  relatedCategory: 'orthopedics',
};

const accident: ServiceDetail = {
  id: 'accident',
  isSample: true,
  hero: {
    headline: '사고 후 통증, 눈에 보이지 않는 손상까지 살펴봅니다',
    sub: '사고 당시에는 괜찮다가 며칠 뒤 목과 허리가 아파지는 경우가 많습니다. 사고 경위와 현재 증상을 꼼꼼히 확인하고, 자동차보험 진료 절차도 함께 안내해 드립니다.',
    highlights: ['자동차보험 진료', '초음파 진단', '후유증 대비 한약'],
    image: '/images/traffic-accident-clinic.png',
  },
  symptoms: {
    items: [
      '사고 직후엔 괜찮았는데 며칠 뒤 목과 허리가 아파요',
      '뒷목이 뻣뻣하고 두통이나 어지러움이 있어요',
      '어깨와 등이 결리고 무겁게 느껴져요',
      '팔이나 다리가 저리거나 당겨요',
      '잠을 설치고 쉽게 피로해요',
      '운전하거나 차를 탈 때 몸이 긴장돼요',
    ],
    note: '가벼운 사고라도 증상이 늦게 나타날 수 있습니다. 불편함이 느껴지면 진찰을 받아보세요.',
  },
  diagnosis: {
    description: '사고 경위와 충격 방향을 확인하고, 현재 통증의 원인을 하나씩 짚어 갑니다.',
    items: [
      {
        name: '사고 경위 및 증상 확인',
        description: '사고 상황, 충격 부위, 사고 이후 달라진 증상을 자세히 묻고 기록합니다.',
      },
      {
        name: '움직임·신경학적 검사',
        description: '목과 허리의 가동범위, 팔다리 저림과 근력을 확인해 신경 쪽 문제 여부를 살핍니다.',
      },
      {
        name: '실시간 초음파 진단',
        description: '원장이 직접 근육과 인대 등 연부조직의 상태를 영상으로 확인합니다.',
      },
      {
        name: '정밀검사 연계',
        description: '추가 확인이 필요하다고 판단되면 MRI 등 영상 검사 의뢰를 안내합니다.',
      },
    ],
    image: '/images/ultrasound-device.jpg',
    note: '초음파로 확인할 수 있는 범위에는 한계가 있습니다.',
  },
  treatments: [
    {
      name: '침 치료',
      summary: '굳은 근육을 풀고 통증을 줄이는 기본 치료',
      suitableFor: ['목·허리 통증', '어깨 결림', '두통'],
      method:
        '긴장된 근육과 경혈에 침을 놓아 통증과 뻣뻣함을 줄입니다. 사고 직후라 몸이 예민한 시기에도 자극을 낮춰 편안하게 시술합니다.',
      note: '자동차보험 접수가 확인된 경우 보험 기준에 따라 진료합니다.',
      image: '/images/acupuncture.jpg',
    },
    {
      name: '약침',
      summary: '통증 부위에 약침액을 주입하는 치료',
      suitableFor: ['특정 부위의 깊은 통증', '반복되는 근육통'],
      method:
        '통증이 집중된 부위에 한약재에서 추출한 약침액을 주입해 염증과 통증을 완화합니다. 필요할 때 초음파로 위치를 확인하며 시술합니다.',
      note: '약침 성분에 알레르기가 있으면 미리 알려주세요.',
      image: '/images/pharmacoacupunture.png',
    },
    {
      name: '추나요법',
      summary: '사고로 틀어진 척추와 관절의 정렬을 맞추는 수기 치료',
      suitableFor: ['목·허리 틀어짐', '골반 불균형', '움직일 때 뻐근함'],
      method:
        '충격으로 흐트러진 목, 등, 허리, 골반의 정렬을 손으로 교정합니다. 급성기에는 무리하지 않는 범위에서 진행합니다.',
      image: '/images/chuna-therapy.jpg',
    },
    {
      name: '후유증 대비 한약',
      summary: '회복과 컨디션 관리를 돕는 맞춤 탕약',
      suitableFor: ['피로', '수면 문제', '회복이 더딘 경우'],
      method:
        '어혈과 긴장, 체력 상태를 살펴 몸 상태에 맞게 처방합니다. 복용 중인 약이 있다면 반드시 알려주세요.',
      note: '한약의 보험 적용 여부와 범위는 보험사 기준에 따라 달라질 수 있습니다.',
      image: '/images/korean-herbal-medicine2.jpg',
    },
  ],
  process: [
    {
      title: '접수 및 문진',
      description: '사고 경위와 현재 불편한 부위를 확인하고, 보험 접수 여부를 확인합니다.',
    },
    {
      title: '검사와 초음파',
      description: '움직임과 신경 상태를 살피고 초음파로 연부조직을 확인합니다.',
    },
    {
      title: '진단 설명과 치료 계획',
      description: '현재 상태와 치료 방향, 내원 간격을 알기 쉽게 설명드립니다.',
    },
    {
      title: '치료',
      description: '침, 약침, 추나 등을 상태에 맞게 조합하고, 필요하면 한약을 처방합니다.',
    },
    {
      title: '경과 확인',
      description: '회복 정도에 따라 치료를 조정하고, 필요한 경우 소견서 등 서류 발급을 안내합니다.',
    },
  ],
  extraSections: [
    {
      eyebrow: '자동차보험 진료',
      title: '보험으로 진료받으려면 이렇게 하세요',
      description: '순서대로 진행하면 첫 방문에서 바로 진료를 받으실 수 있습니다.',
      numbered: true,
      items: [
        {
          title: '보험사에 사고 접수',
          description: '가해 차량 보험사에 대인 접수가 되어 있는지 먼저 확인합니다.',
        },
        {
          title: '접수번호와 신분증 준비',
          description: '보험사에서 받은 접수번호와 신분증(모바일 신분증 가능)을 챙겨 방문해 주세요.',
        },
        {
          title: '병원에서 확인 후 진료',
          description: '접수번호를 확인한 뒤 바로 진료를 시작합니다.',
        },
      ],
    },
    {
      eyebrow: '접수번호가 없다면',
      title: '아직 보험 접수 전이어도 진료받을 수 있습니다',
      items: [
        {
          title: '먼저 진료받고 나중에 정산',
          description:
            '우선 진료비를 결제하신 뒤, 보험 접수가 확인되면 보험 적용 기준에 따라 정산해 드립니다.',
        },
      ],
      note: '정산 방식은 보험사 처리 상황에 따라 달라질 수 있어 내원 전 전화로 확인하시면 더 정확합니다.',
    },
    {
      eyebrow: '정밀검사',
      title: 'MRI 등 정밀검사가 필요할 때',
      numbered: true,
      items: [
        {
          title: '의뢰서 발급',
          description: '진찰 결과 추가 검사가 필요하면 검사 의뢰서와 병원 안내를 드립니다.',
        },
        {
          title: '검사 병원 예약 및 검사',
          description: '안내받은 병원에서 직접 예약해 검사를 받습니다.',
        },
        {
          title: '결과 확인 후 치료 조정',
          description: '결과를 가져오시면 함께 살펴보고 치료 계획에 반영합니다.',
        },
      ],
    },
  ],
  care: [
    {
      title: '무리한 활동 줄이기',
      description: '사고 직후 2~3주는 무거운 물건을 들거나 격한 운동을 피하는 것이 좋습니다.',
    },
    {
      title: '증상이 나아져도 끝까지 치료하기',
      description: '통증이 줄었다고 중간에 그만두면 후유증으로 남을 수 있습니다. 치료 계획을 끝까지 함께 확인해 주세요.',
    },
    {
      title: '수면 자세 점검',
      description: '높지 않은 베개를 쓰고 목이 꺾이지 않게 바로 눕거나 옆으로 누워 주무세요.',
    },
    {
      title: '증상 변화 기록하기',
      description: '통증 부위와 강도가 언제 달라지는지 메모해 두면 진료와 치료 조정에 도움이 됩니다.',
    },
  ],
  faqs: [
    {
      q: '사고가 경미한데 치료를 받아도 되나요?',
      a: '네. 경미한 사고도 시간이 지나 통증이 생길 수 있습니다. 불편함이 있다면 진찰을 통해 상태를 확인해 보세요.',
    },
    {
      q: '자동차보험으로 진료받으면 본인 부담이 있나요?',
      a: '보험 접수가 확인되면 보험 기준에 따라 진료하며, 항목에 따라 안내가 달라질 수 있습니다. 내원 시 자세히 설명드립니다.',
    },
    {
      q: '다른 병원에서 치료받고 있어도 함께 다닐 수 있나요?',
      a: '병행 가능한지는 보험사 기준과 치료 내용에 따라 달라집니다. 현재 받고 있는 치료를 알려주시면 함께 확인해 드립니다.',
    },
    {
      q: 'MRI를 꼭 찍어야 하나요?',
      a: '모든 환자분께 필요한 검사는 아닙니다. 진찰 결과 필요하다고 판단될 때만 안내드립니다.',
    },
    {
      q: '한약도 보험이 되나요?',
      a: '보험 적용 여부와 범위는 보험사 기준에 따라 달라질 수 있어 처방 전에 미리 안내드립니다.',
    },
  ],
  ctaEyebrow: '사고 후 통증이 걱정되신다면',
  relatedCategory: 'traffic-accident',
};

const spine: ServiceDetail = {
  id: 'spine',
  isSample: true,
  hero: {
    headline: '목·허리 통증, 원인부터 정확히 확인합니다',
    sub: '같은 허리 통증이라도 디스크, 근육, 관절 중 어디에서 비롯됐는지에 따라 치료가 달라집니다. 체형과 생활 습관까지 살펴 맞춤 치료를 계획합니다.',
    highlights: ['정확한 원인 진단', '맞춤 침·약침', '추나 체형 교정'],
    image: '/images/spine-pain-clinic.png',
  },
  symptoms: {
    items: [
      '오래 앉아 있으면 허리가 뻐근하고 무거워요',
      '아침에 일어날 때 허리나 목이 뻣뻣해요',
      '뒷목과 어깨가 뭉치고 두통이 자주 와요',
      '팔이나 다리가 저리거나 당겨요',
      '허리를 숙이거나 펼 때 통증이 있어요',
      '거북목이나 굽은 자세가 걱정돼요',
      '치료를 받아도 자꾸 재발해요',
    ],
    note: '같은 증상도 원인이 다를 수 있어 진찰 후 상태에 맞는 치료를 정합니다.',
  },
  diagnosis: {
    description: '아픈 부위만 보지 않고, 자세와 움직임 전체를 살펴 원인을 찾습니다.',
    items: [
      {
        name: '문진 및 자세·체형 확인',
        description: '서 있을 때와 앉을 때의 자세, 통증이 생기는 상황과 생활 습관을 확인합니다.',
      },
      {
        name: '움직임·신경학적 검사',
        description: '가동범위와 팔다리 저림, 근력을 확인해 신경 압박 가능성을 살핍니다.',
      },
      {
        name: '초음파 진단',
        description: '근육과 인대 등 연부조직의 상태를 영상으로 확인합니다.',
      },
      {
        name: '영상검사 연계',
        description: '디스크나 협착 등이 의심되면 X-ray, MRI 등 정밀검사를 안내합니다.',
      },
    ],
    image: '/images/doctor-consulting.jpg',
    note: '영상검사 결과가 있다면 지참해 주시면 진료에 도움이 됩니다.',
  },
  treatments: [
    {
      name: '침 치료',
      summary: '굳은 근육을 이완시키는 기본 치료',
      suitableFor: ['목·어깨 뭉침', '허리 뻐근함', '근육성 통증'],
      method:
        '목과 허리 주변의 긴장된 근육과 경혈에 침을 놓아 통증과 뻣뻣함을 줄입니다. 자극을 최소화해 침이 처음인 분도 부담이 적도록 시술합니다.',
      note: '건강보험이 적용되는 치료입니다.',
      image: '/images/acupuncture.jpg',
    },
    {
      name: '약침',
      summary: '통증 부위에 약침액을 주입하는 치료',
      suitableFor: ['깊은 곳의 통증', '반복되는 통증', '염증성 통증'],
      method:
        '통증이 집중된 부위에 약침액을 주입해 염증과 통증을 줄입니다. 필요할 때 초음파로 위치를 확인하며 시술합니다.',
      note: '약침 성분에 알레르기가 있으면 미리 알려주세요.',
      image: '/images/pharmacoacupunture.png',
    },
    {
      name: '추나요법',
      summary: '척추와 관절의 정렬을 맞추는 수기 치료',
      suitableFor: ['거북목·굽은 등', '골반 불균형', '자세로 인한 통증'],
      method:
        '목, 등, 허리, 골반의 정렬 상태를 함께 살펴 틀어진 부분을 손으로 교정합니다. 통증의 구조적인 원인을 다루는 데 목적이 있습니다.',
      note: '건강보험 적용은 질환과 횟수 등 요건에 따라 달라집니다.',
      image: '/images/chuna-therapy.jpg',
    },
    {
      name: '부항 및 온열 치료',
      summary: '근육 긴장을 풀고 혈류를 돕는 보조 치료',
      suitableFor: ['만성 뭉침', '찬 곳에서 심해지는 통증'],
      method:
        '뭉친 부위에 부항을 적용하거나 따뜻하게 하여 근육 이완과 혈류를 돕습니다. 증상과 시기에 따라 침 치료와 함께 적용합니다.',
      note: '피부가 약하거나 출혈 경향이 있으면 미리 알려주세요.',
    },
  ],
  process: [
    {
      title: '접수 및 문진',
      description: '통증이 시작된 시기, 아픈 동작, 하루 생활 패턴을 확인합니다.',
    },
    {
      title: '자세·움직임 검사와 초음파',
      description: '체형과 움직임을 살피고 초음파로 연부조직을 확인합니다.',
    },
    {
      title: '진단 설명과 치료 계획',
      description: '현재 상태와 치료 방향, 내원 간격을 알기 쉽게 설명드립니다.',
    },
    {
      title: '치료',
      description: '침, 약침, 추나 등을 상태에 맞게 조합해 진행합니다.',
    },
    {
      title: '경과 확인과 재발 방지 안내',
      description: '회복 정도에 따라 치료를 조정하고, 일상에서 지켜야 할 자세와 운동을 안내합니다.',
    },
  ],
  care: [
    {
      title: '50분마다 일어나기',
      description: '오래 앉아 있을 때는 50분마다 잠깐 일어나 걷거나 허리를 펴주세요.',
    },
    {
      title: '앉는 자세 점검',
      description: '엉덩이를 의자 깊숙이 넣고 모니터는 눈높이에 맞춰 목이 앞으로 빠지지 않게 하세요.',
    },
    {
      title: '물건은 무릎을 굽혀 들기',
      description: '허리만 숙여 들지 말고 무릎을 굽혀 물건을 몸 가까이에서 드세요.',
    },
    {
      title: '걷기와 가벼운 스트레칭',
      description: '통증이 심하지 않다면 매일 걷기와 가벼운 스트레칭이 도움이 됩니다. 통증이 심해지면 중단하세요.',
    },
  ],
  faqs: [
    {
      q: '디스크 진단을 받았는데 한의원 치료가 가능한가요?',
      a: '진단 결과와 증상 정도에 따라 가능한 경우가 많습니다. 영상검사 결과를 가져오시면 상태를 함께 살펴보고 치료 방향을 안내드립니다.',
    },
    {
      q: '치료 기간은 얼마나 걸리나요?',
      a: '원인과 증상의 정도, 생활 환경에 따라 달라 일률적으로 말씀드리기 어렵습니다. 첫 진료에서 예상 치료 계획을 설명드립니다.',
    },
    {
      q: '추나요법은 아프지 않나요?',
      a: '시술 전에 방법과 느낌을 설명드리고, 통증을 참지 않아도 되도록 강도를 조절해서 진행합니다.',
    },
    {
      q: '치료를 받으면 재발하지 않나요?',
      a: '자세와 생활 습관이 원인인 경우 재발할 수 있어, 치료와 함께 생활 관리 방법을 안내해 드립니다.',
    },
    {
      q: '수술이 필요한지도 알 수 있나요?',
      a: '진찰과 영상검사 결과를 종합해 설명드리며, 수술 여부를 판단해야 하는 경우에는 전문 의료기관 진료를 안내드립니다.',
    },
  ],
  ctaEyebrow: '목·허리 통증이 계속된다면',
  relatedCategory: 'orthopedics',
};

export const serviceDetails: Record<string, ServiceDetail> = {
  joint,
  accident,
  spine,
};

export function getServiceDetail(id: string): ServiceDetail | undefined {
  return serviceDetails[id];
}
