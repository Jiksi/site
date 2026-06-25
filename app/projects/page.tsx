import { Link } from "next-view-transitions";
import { NameTransition } from "@/components/name";
import { getProjects } from "./get-projects";
import { formatYear } from "@/lib/utils";

export const metadata = {
  title: "Projects",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <NameTransition />
      <p className="text-gray-800 leading-snug">
        A showcase of projects I've built
      </p>
      <ul className="text-gray-800 list-disc pl-5 space-y-1">
        {projects.map((project) => (
          <li key={project.slug} className="pl-1">
            <strong className="font-medium">
              <Link
                href={`/projects/${project.slug}`}
                className="text-teal-800 hover:text-teal-950"
              >
                {project.title}
              </Link>
            </strong>
            <small className="flex text-sm text-gray-500 mb-3">
              {formatYear(project.publishDate)}
              {project.tags.length > 0 && ` // ${project.tags.join(", ")}`}
            </small>
          </li>
        ))}
      </ul>
    </>
  );
}
