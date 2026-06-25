import { Note } from "@/types";
import { getContentItems } from "@/lib/content";

export async function getNotes(): Promise<Note[]> {
  return getContentItems<Note>("notes");
}
