import { Link } from "next-view-transitions";
import { NameTransition } from "@/components/name";
import { formatDate, formatYear } from "@/lib/utils";
import { getContentItems } from "@/lib/content";
import { BlogPost, Project } from "@/types";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const projects = await getContentItems<Project>("projects");
  const blogs = await getContentItems<BlogPost>("blogs");

  const yearsOfExperience = new Date().getFullYear() - 2023;

  return (
    <>
      <NameTransition />

      <p>
        I'm a software engineer with {yearsOfExperience} years of experience,
        based in{" "}
        <a
          href="https://maps.app.goo.gl/jT3pXEEWBJ3W9VyCA"
          target="_blank"
          rel="noopener noreferrer"
        >
          Balikpapan, Indonesia
        </a>
        . From frontend to backend to DevOps. Basically, I do everything.
      </p>

      <div>
        <h2>Projects</h2>
        <ul>
          {projects.slice(0, 5).map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              <small>
                {formatYear(project.publishDate)}
                {project.tags.length > 0 && ` // ${project.tags.join(", ")}`}
              </small>
            </li>
          ))}
        </ul>
        {projects.length > 5 && (
          <p className="mt-2 pl-6">
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
        <h2>Skills</h2>
        <ul>
          <li>
            Languages
            <small>
              JavaScript, TypeScript, HTML, CSS, PHP, SQL, Python, Dart, C++
            </small>
          </li>
          <li>
            Frontend
            <small>
              React, Next.js, Inertia.js, TailwindCSS, shadcn/ui, Framer Motion,
              Expo, Flutter, Responsive Design
            </small>
          </li>
          <li>
            Backend & APIs
            <small>
              Laravel, Node.js, Express.js, FastAPI, Midtrans, Prisma ORM, REST
              API Design, JWT, OAuth2
            </small>
          </li>
          <li>
            Database & ORM
            <small>
              MySQL, Eloquent ORM, Prisma ORM, SQLite, Firebase, PostgreSQL,
              Supabase
            </small>
          </li>
          <li>
            DevOps & Cloud
            <small>
              Git, Cloudflare, Vercel, Hostinger, cPanel, Docker, VPS
              Deployment, Shared Hosting, Subdomain Routing
            </small>
          </li>
        </ul>
      </div>

      <div>
        <h2>Blogs</h2>
        <ul>
          {blogs.slice(0, 5).map((post) => (
            <li key={post.slug}>
              <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
              <small>
                {formatDate(post.publishDate)}
                {post.tags.length > 0 && ` // ${post.tags.join(", ")}`}
              </small>
            </li>
          ))}
        </ul>
        {blogs.length > 5 && (
          <p className="mt-2 pl-6">
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
