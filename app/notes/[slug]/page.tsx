import { notFound } from "next/navigation";
import { getContentItems } from "@/lib/content";
import { Note } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const notes = await getContentItems<Note>("notes");
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const notes = await getContentItems<Note>("notes");
  const note = notes.find((n) => n.slug === slug);
  if (!note) return {};
  return {
    title: note.title,
    alternates: {
      canonical: `/notes/${slug}`,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;

  try {
    const { default: Post } = await import(`@/contents/notes/${slug}/page.mdx`);
    return <Post />;
  } catch (err) {
    notFound();
  }
}

export const dynamicParams = false;
