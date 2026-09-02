'use client';

import { useActionState, useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { createBlogPost } from '../actions';
import { CATEGORIES } from '@/lib/blog';
import { ImagePlus } from 'lucide-react';

export default function NewBlogPost() {
  const [state, formAction, pending] = useActionState(createBlogPost, null);

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const cursorPosRef = useRef(0);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [inserting, setInserting] = useState(false);
  const [insertError, setInsertError] = useState<string | null>(null);

  function openImagePicker() {
    // 파일 선택창이 뜨면서 textarea가 포커스를 잃기 전에, 지금 커서 위치를 기억해둔다.
    const textarea = contentRef.current;
    cursorPosRef.current = textarea ? textarea.selectionStart : 0;
    imageInputRef.current?.click();
  }

  async function handleInsertImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    e.target.value = ''; // 같은 파일을 다시 선택해도 change 이벤트가 뜨도록 초기화
    if (files.length === 0) return;

    setInsertError(null);
    setInserting(true);
    try {
      for (const file of files) {
        // 이미지는 서버를 거치지 않고 브라우저에서 Blob으로 직접 업로드된다.
        const blob = await upload(`blog/${Date.now()}-${file.name}`, file, {
          access: 'public',
          handleUploadUrl: '/api/blog/upload',
        });

        const textarea = contentRef.current;
        if (!textarea) continue;

        const markdown = `\n\n![](${blob.url})\n\n`;
        const pos = cursorPosRef.current;
        const before = textarea.value.slice(0, pos);
        const after = textarea.value.slice(pos);
        textarea.value = before + markdown + after;

        const newPos = pos + markdown.length;
        cursorPosRef.current = newPos;
        textarea.focus();
        textarea.setSelectionRange(newPos, newPos);
      }
    } catch (err) {
      setInsertError(err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.');
    } finally {
      setInserting(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">새 칼럼 작성</h2>

      <form action={formAction} className="space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="글 제목을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">요약 (목록/미리보기에 노출)</label>
          <input
            type="text"
            name="excerpt"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="한 줄 요약"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">본문 (마크다운 지원)</label>
            <button
              type="button"
              disabled={inserting}
              onClick={openImagePicker}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg disabled:opacity-50"
            >
              <ImagePlus className="w-4 h-4" />
              {inserting ? '업로드 중...' : '커서 위치에 이미지 삽입'}
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleInsertImage}
            />
          </div>
          <textarea
            ref={contentRef}
            name="content"
            required
            rows={16}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono text-sm"
            placeholder="글 내용을 입력하세요. 이미지를 넣고 싶은 자리에 커서를 두고 위 '이미지 삽입' 버튼을 누르면 그 위치에 삽입됩니다."
          />
          <p className="text-xs text-gray-400 mt-1.5">
            본문 안에 원하는 위치마다 커서를 두고 이미지를 삽입하세요. 4~5장 정도를 글 흐름에 맞게 배치하는 걸 추천합니다.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
          <select
            name="category"
            required
            defaultValue=""
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
          >
            <option value="" disabled>카테고리를 선택하세요</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">태그 (쉼표로 구분)</label>
          <input
            type="text"
            name="tags"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="예: 허리통증, 추나요법"
          />
        </div>

        {(state?.error || insertError) && (
          <p className="text-red-600 text-sm font-medium text-center bg-red-50 p-3 rounded-lg">
            {insertError || state?.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending || inserting}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50"
        >
          {pending ? '발행 중...' : '발행하기'}
        </button>
      </form>
    </div>
  );
}
