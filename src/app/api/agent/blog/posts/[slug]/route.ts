import { NextResponse } from 'next/server';
import { getPost, deletePost } from '@/lib/blog';
import { verifyAgentAuth } from '@/lib/agentAuth';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse> {
  if (!verifyAgentAuth(request)) {
    return NextResponse.json({ error: '인증되지 않은 요청입니다.' }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
      return NextResponse.json({ error: `존재하지 않는 글입니다: ${slug}` }, { status: 404 });
    }

    await deletePost(slug);

    return NextResponse.json({ slug });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
