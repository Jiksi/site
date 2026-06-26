import { promises as fs } from "fs";
import path from "path";

const SITE_URL = "https://jiksi.xyz";

async function getSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === "page.mdx")
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name),
      );
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, "/"));
}

export default async function sitemap() {
  const projectsDirectory = path.join(process.cwd(), "contents", "projects");
  const projectSlugs = await getSlugs(projectsDirectory).catch(() => []);

  const blogsDirectory = path.join(process.cwd(), "contents", "blogs");
  const blogSlugs = await getSlugs(blogsDirectory).catch(() => []);

  const notesDirectory = path.join(process.cwd(), "contents", "notes");
  const noteSlugs = await getSlugs(notesDirectory).catch(() => []);

  const projects = projectSlugs.map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  const blogs = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blogs/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  const notes = noteSlugs.map((slug) => ({
    url: `${SITE_URL}/notes/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ["", "/about"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...projects, ...blogs, ...notes];
}
