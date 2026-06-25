import { Link } from "next-view-transitions";
import { NameTransition } from "@/components/name";
import { getBlogPosts } from "./get-posts";
import { formatDate } from "@/lib/utils";
import { Small } from "@/components/small";

export const metadata = {
  title: "Blogs",
  alternates: {
    canonical: "/blogs",
  },
};

export default async function BlogsPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <NameTransition />
      <p className="text-gray-800 leading-snug">
        Putting my thoughts into long-form articles.
      </p>
      <ul className="text-gray-800 list-disc pl-5 space-y-1">
        {posts.map((post) => (
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
    </>
  );
}
