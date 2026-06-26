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
      {notes.length > 0 ? (
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
      ) : (
        <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-8 text-center my-4">
          <p className="text-sm text-gray-500">No content available yet.</p>
        </div>
      )}
    </>
  );
}
