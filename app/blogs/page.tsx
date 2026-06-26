import { Link } from "next-view-transitions";
import { NameTransition } from "@/components/name";
import { formatDate } from "@/lib/utils";
import { getContentItems } from "@/lib/content";
import { BlogPost } from "@/types";

export const metadata = {
  title: "Blogs",
  alternates: {
    canonical: "/blogs",
  },
};

export default async function BlogsPage() {
  const posts = await getContentItems<BlogPost>("blogs");

  return (
    <>
      <NameTransition />
      <p>Putting my thoughts into long-form articles.</p>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
            <small>
              {formatDate(post.publishDate)}
              {post.tags.length > 0 && ` // ${post.tags.join(", ")}`}
            </small>
          </li>
        ))}
      </ul>
    </>
  );
}
