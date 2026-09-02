import { marked } from 'marked';

// marked는 물결표(~) 하나만 있어도 취소선(~~text~~)으로 오인해서,
// "10:00~21:00" 같은 시간 범위 표기가 중간이 취소선 처리되는 문제가 있다.
// 렌더링 전에 물결표를 전부 이스케이프해서 항상 글자 그대로 표시되게 한다.
export async function renderMarkdown(content: string): Promise<string> {
  const escaped = content.replace(/~/g, '\\~');
  return marked.parse(escaped);
}
