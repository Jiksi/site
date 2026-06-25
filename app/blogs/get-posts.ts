import { BlogPost } from "@/types";
import { getContentItems } from "@/lib/content";

export async function getBlogPosts(): Promise<BlogPost[]> {
  return getContentItems<BlogPost>("blogs");
}
