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
  const workDirectory = path.join(process.cwd(), "app", "work");
  const slugs = await getSlugs(workDirectory);

  const works = slugs.map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = [""].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...works];
}
