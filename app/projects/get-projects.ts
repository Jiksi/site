import { Project } from "@/types";
import { getContentItems } from "@/lib/content";

export async function getProjects(): Promise<Project[]> {
  return getContentItems<Project>("projects");
}
