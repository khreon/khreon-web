export const CATEGORY_META = [
  { key: 'Human', label: '일반 방문(사람)', fill: '#8b5cf6' },
  { key: 'GPTBot', label: 'GPT/ChatGPT', fill: '#10b981' },
  { key: 'Googlebot', label: 'Google 검색봇', fill: '#3b82f6' },
  { key: 'Claude', label: 'Claude AI', fill: '#f59e0b' },
  { key: 'OtherBot', label: '기타 크롤러', fill: '#64748b' },
] as const;

export type CategoryKey = typeof CATEGORY_META[number]['key'];
export type CategoryStats = Record<CategoryKey, number>;

export function emptyCategoryStats(): CategoryStats {
  return { Human: 0, GPTBot: 0, Googlebot: 0, Claude: 0, OtherBot: 0 };
}
