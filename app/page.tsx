import { Link } from "next-view-transitions";
import { NameTransition } from "@/components/name";
import { Small } from "@/components/small";
import { getProjects } from "@/app/projects/get-projects";
import { getBlogPosts } from "@/app/blogs/get-posts";
import { formatDate, formatYear } from "@/lib/utils";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const projects = await getProjects();
  const blogs = await getBlogPosts();

  const yearsOfExperience = new Date().getFullYear() - 2023;

  return (
    <>
      <NameTransition />

      <p className="text-gray-800 leading-snug">
        I'm a software engineer with {yearsOfExperience} years of experience,
        based in{" "}
        <a
          href="https://maps.app.goo.gl/jT3pXEEWBJ3W9VyCA"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-800 hover:text-teal-950"
        >
          Balikpapan, Indonesia
        </a>
        . From frontend to backend to DevOps. Basically, I do everything.
      </p>

      <div>
        <h2 className="text-gray-800 font-medium mt-6 mb-3 text-lg">
          Projects
        </h2>
        <ul className="text-gray-800 list-disc pl-5 space-y-1">
          {projects.slice(0, 5).map((project) => (
            <li key={project.slug} className="pl-1">
              <Link
                href={`/projects/${project.slug}`}
                className="text-teal-800 hover:text-teal-950"
              >
                {project.title}
              </Link>
              <Small>
                {formatYear(project.publishDate)}
                {project.tags.length > 0 && ` // ${project.tags.join(", ")}`}
              </Small>
            </li>
          ))}
        </ul>
        {projects.length > 5 && (
          <p className="text-gray-800 leading-snug mt-2 pl-6">
            <Link
              href="/projects"
              className="text-gray-400 transition-colors duration-300 hover:text-teal-800 underline"
            >
              see more projects
            </Link>
          </p>
        )}
      </div>

      <div>
        <h2 className="text-gray-800 font-medium mt-6 mb-3 text-lg">Skills</h2>
        <ul className="text-gray-800 list-disc pl-5 space-y-1">
          <li className="pl-1">
            <strong className="font-medium">Languages:</strong> JavaScript,
            TypeScript, HTML, CSS, PHP, SQL, Python, Dart, C++
          </li>
          <li className="pl-1">
            <strong className="font-medium">Frontend:</strong> React, Next.js,
            Inertia.js, TailwindCSS, shadcn/ui, Framer Motion, Expo, Flutter,
            Responsive Design
          </li>
          <li className="pl-1">
            <strong className="font-medium">Backend & APIs:</strong> Laravel,
            Node.js, Express.js, FastAPI, Midtrans, Prisma ORM, REST API Design,
            JWT, OAuth2
          </li>
          <li className="pl-1">
            <strong className="font-medium">Database & ORM:</strong> MySQL,
            Eloquent ORM, Prisma ORM, SQLite, Firebase, PostgreSQL, Supabase
          </li>
          <li className="pl-1">
            <strong className="font-medium">DevOps & Cloud:</strong> Git,
            Cloudflare, Vercel, Hostinger, cPanel, Docker, VPS Deployment,
            Shared Hosting, Subdomain Routing
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-gray-800 font-medium mt-6 mb-3 text-lg">Blogs</h2>
        <ul className="text-gray-800 list-disc pl-5 space-y-1">
          {blogs.slice(0, 5).map((post) => (
            <li key={post.slug} className="pl-1">
              <strong className="font-medium">
                <Link
                  href={`/blogs/${post.slug}`}
                  className="text-teal-800 hover:text-teal-950"
                >
                  {post.title}
                </Link>
              </strong>
              <Small>
                {formatDate(post.publishDate)}
                {post.tags.length > 0 && ` // ${post.tags.join(", ")}`}
              </Small>
            </li>
          ))}
        </ul>
        {blogs.length > 5 && (
          <p className="text-gray-800 leading-snug mt-2 pl-6">
            <Link
              href="/blogs"
              className="text-gray-400 transition-colors duration-300 hover:text-teal-800 underline"
            >
              see more blogs
            </Link>
          </p>
        )}
      </div>
    </>
  );
}
