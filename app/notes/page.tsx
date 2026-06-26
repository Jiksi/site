import { Link } from "next-view-transitions";
import { NameTransition } from "@/components/name";
import { formatDate } from "@/lib/utils";
import { Note } from "@/types";
import { getContentItems } from "@/lib/content";

export const metadata = {
  title: "Notes",
  alternates: {
    canonical: "/notes",
  },
};

export default async function NotesPage() {
  const notes = await getContentItems<Note>("notes");

  return (
    <>
      <NameTransition />
      <p>
        A collection of quick notes, code snippets, and random tech thoughts
        that are too short for a blog post.
      </p>
      <ul>
        {notes.map((note) => (
          <li key={note.slug}>
            <Link href={`/notes/${note.slug}`}>{note.title}</Link>
            <small>
              {formatDate(note.publishDate)}
              {note.tags.length > 0 && ` // ${note.tags.join(", ")}`}
            </small>
          </li>
        ))}
      </ul>
    </>
  );
}
