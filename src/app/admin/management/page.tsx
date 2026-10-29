import { FileSpreadsheet, FileText, ExternalLink } from 'lucide-react';

type ManagementLink = {
  label: string;
  type: 'sheet' | 'doc';
  href: string;
};

type ManagementSection = {
  title: string;
  links: ManagementLink[];
};

const MANAGEMENT_SECTIONS: ManagementSection[] = [
  {
    title: '경영',
    links: [
      {
        label: '경영 지표 관리',
        type: 'sheet',
        href: 'https://docs.google.com/spreadsheets/d/19hqkDj9cnM8ogTT4rHApyIJMn2HQ8471p9kJRKa7kYY/edit?gid=270719310#gid=270719310',
      },
      {
        label: '주간 일지',
        type: 'doc',
        href: 'https://docs.google.com/document/d/1ZQhYhRv6MjSNmUBhlUBXmi6N4uNjhRuZeffvyNE3hQE/edit?tab=t.0#heading=h.y2mau6b42uql',
      },
      {
        label: '운영 회의',
        type: 'sheet',
        href: 'https://docs.google.com/spreadsheets/d/1v6EJn39guFPIBnTKxelnZfmyKs86Zpit-YXTh3ENTh0/edit?gid=1545811357#gid=1545811357',
      },
    ],
  },
  {
    title: '재무',
    links: [
      {
        label: '자산 관리',
        type: 'sheet',
        href: 'https://docs.google.com/spreadsheets/d/1kcJv2hJkF2YWZs_1jA2F4zfgxdEXpvHLOWEIXqO_-CA/edit?gid=0#gid=0',
      },
    ],
  },
  {
    title: '매뉴얼',
    links: [
      {
        label: '원장 인계',
        type: 'doc',
        href: 'https://docs.google.com/document/d/1UDc_62DOu97wA_4o1J0MKhT2L680Q_5ipQod-dzQgg8/edit?tab=t.0#heading=h.3fvs7actsnr3',
      },
      {
        label: '원내 매뉴얼',
        type: 'doc',
        href: 'https://docs.google.com/document/d/1nPd5R9gBMZOf2L1OEgU1a1AUBpyVAvFqBp6_KyAde5s/edit?tab=t.0#heading=h.j4r0vk8ppf9x',
      },
    ],
  },
];

export default function AdminManagementPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">경영관리</h2>
        <p className="text-sm text-gray-500 mt-1">버튼을 누르면 구글 드라이브 문서가 새 탭에서 열립니다.</p>
      </div>

      <div className="space-y-8">
        {MANAGEMENT_SECTIONS.map((section) => (
          <section key={section.title}>
            <h3 className="text-sm font-bold text-gray-500 mb-3">{section.title}</h3>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {section.links.map((link) => {
                const Icon = link.type === 'sheet' ? FileSpreadsheet : FileText;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 hover:border-primary/30 hover:shadow-sm transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 truncate">{link.label}</p>
                      <p className="text-xs text-gray-400">{link.type === 'sheet' ? '구글 시트' : '구글 문서'}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors shrink-0" />
                  </a>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
