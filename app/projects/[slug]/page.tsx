import { notFound } from "next/navigation";
import { getContentItems } from "@/lib/content";
import { Project } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getContentItems<Project>("projects");
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const projects = await getContentItems<Project>("projects");
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  try {
    const { default: Post } = await import(
      `@/contents/projects/${slug}/page.mdx`
    );
    return <Post />;
  } catch (err) {
    notFound();
  }
}

export const dynamicParams = false;
