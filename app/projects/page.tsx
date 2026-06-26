import { Link } from "next-view-transitions";
import { NameTransition } from "@/components/name";
import { formatYear } from "@/lib/utils";
import { getContentItems } from "@/lib/content";
import { Project } from "@/types";

export const metadata = {
  title: "Projects",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getContentItems<Project>("projects");

  return (
    <>
      <NameTransition />
      <p>A showcase of projects I've built</p>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              <small>
                {formatYear(project.publishDate)}
                {project.tags.length > 0 && ` // ${project.tags.join(", ")}`}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-8 text-center my-4">
          <p className="text-sm text-gray-500">No content available yet.</p>
        </div>
      )}
    </>
  );
}
