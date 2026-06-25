import { Link } from "next-view-transitions";
import { NameTransition } from "@/components/name";
import { getNotes } from "./get-notes";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Notes",
  alternates: {
    canonical: "/notes",
  },
};

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <>
      <NameTransition />
      <p className="text-gray-800 leading-snug">
        A collection of quick notes, code snippets, and random tech thoughts
        that are too short for a blog post.
      </p>
      <ul className="text-gray-800 list-disc pl-5 space-y-1">
        {notes.map((note) => (
          <li key={note.slug} className="pl-1">
            <strong className="font-medium">
              <Link
                href={`/notes/${note.slug}`}
                className="text-teal-800 hover:text-teal-950"
              >
                {note.title}
              </Link>
            </strong>
            <small className="flex text-sm text-gray-500 mb-3">
              {formatDate(note.publishDate)}
              {note.tags.length > 0 && ` // ${note.tags.join(", ")}`}
            </small>
          </li>
        ))}
      </ul>
    </>
  );
}
