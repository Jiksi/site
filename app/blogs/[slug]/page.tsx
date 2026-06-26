import { notFound } from "next/navigation";
import { BlogPost } from "@/types";
import { getContentItems } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getContentItems<BlogPost>("blogs");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const posts = await getContentItems<BlogPost>("blogs");
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  try {
    const { default: Post } = await import(`@/contents/blogs/${slug}/page.mdx`);
    return <Post />;
  } catch (err) {
    notFound();
  }
}

export const dynamicParams = false;
