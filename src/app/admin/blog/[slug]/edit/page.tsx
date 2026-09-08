import { getPost } from '@/lib/blog';
import { notFound } from 'next/navigation';
import EditBlogPostForm from './EditBlogPostForm';

export const dynamic = 'force-dynamic';

export default async function EditBlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return <EditBlogPostForm post={post} />;
}
