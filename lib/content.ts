import { promises as fs } from "fs";
import path from "path";
import { ContentItem } from "@/types";

export async function getContentItems<T extends ContentItem>(
  dirName: string
): Promise<T[]> {
  const dirPath = path.join(process.cwd(), "app", dirName);

  const entries = await fs
    .readdir(dirPath, {
      recursive: true,
      withFileTypes: true,
    })
    .catch(() => []);

  const items: T[] = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const fullPath = path.join(entry.parentPath || dirPath, entry.name);
    const relativePath = path
      .relative(dirPath, fullPath)
      .replace(/\\/g, "/");

    // Ignore list pages or helper scripts
    if (
      relativePath === "page.mdx" ||
      relativePath === "page.tsx" ||
      relativePath === `get-${dirName}.ts` ||
      relativePath === "get-posts.ts" ||
      relativePath === "get-notes.ts" ||
      relativePath === "get-projects.ts"
    ) {
      continue;
    }

    if (!relativePath.endsWith(".md") && !relativePath.endsWith(".mdx")) {
      continue;
    }

    let slug = "";
    if (entry.name === "page.mdx" || entry.name === "page.md") {
      slug = path.basename(entry.parentPath || "");
    } else {
      slug = path.parse(entry.name).name;
    }

    if (!slug || slug === dirName) continue;

    try {
      const content = await fs.readFile(fullPath, "utf-8");

      let title = "";
      let publishDate = "";
      let tags: string[] = [];

      // 1. Try parsing YAML frontmatter
      const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (frontmatterMatch) {
        const fmContent = frontmatterMatch[1];

        const titleMatch = fmContent.match(/title:\s*["']?([^"\n\r']+)["']?/);
        if (titleMatch) title = titleMatch[1].trim();

        const dateMatch = fmContent.match(
          /(?:publishDate|date):\s*["']?([^"\n\r']+)["']?/,
        );
        if (dateMatch) publishDate = dateMatch[1].trim();

        const tagsMatch = fmContent.match(/tags:\s*\[\s*([^\]]*)\s*\]/);
        if (tagsMatch) {
          tags = tagsMatch[1]
            .split(",")
            .map((t) => t.trim().replace(/^["']|["']$/g, ""))
            .filter(Boolean);
        } else {
          const simpleTagsMatch = fmContent.match(/tags:\s*([^\n\r]+)/);
          if (simpleTagsMatch) {
            tags = simpleTagsMatch[1]
              .split(",")
              .map((t) => t.trim().replace(/^["']|["']$/g, ""))
              .filter(Boolean);
          }
        }
      }

      // 2. Fallback to export const metadata parsing
      if (!title || !publishDate || tags.length === 0) {
        if (!title) {
          const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
          if (titleMatch) title = titleMatch[1];
        }
        if (!publishDate) {
          const dateMatch = content.match(
            /(?:publishDate|date):\s*["']([^"']+)["']/,
          );
          if (dateMatch) publishDate = dateMatch[1];
        }
        if (tags.length === 0) {
          const tagsMatch = content.match(/tags:\s*\[\s*([^\]]*)\s*\]/);
          if (tagsMatch) {
            tags = tagsMatch[1]
              .split(",")
              .map((t) => t.trim().replace(/^["']|["']$/g, ""))
              .filter(Boolean);
          }
        }
      }

      // 3. Fallback to H1 tag
      if (!title) {
        const h1Match = content.match(/^#\s+(.+)$/m);
        if (h1Match) {
          title = h1Match[1].trim();
        } else {
          title = slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        }
      }

      // 4. Fallback date
      if (!publishDate) {
        const stat = await fs.stat(fullPath);
        publishDate = stat.birthtime.toISOString().split("T")[0];
      }

      items.push({
        slug,
        title,
        publishDate,
        tags,
      } as T);
    } catch (err) {
      console.error(`Error parsing item at ${fullPath}:`, err);
    }
  }

  return items.sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}
