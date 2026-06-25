"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { name: "home", url: "/" },
    { name: "blogs", url: "/blogs" },
    { name: "projects", url: "/projects" },
    { name: "notes", url: "/notes" },
    { name: "about", url: "/about" },
  ];

  return (
    <header className="mt-6 text-center">
      <div className="flex justify-center space-x-4 tracking-tight group">
        {links.map((link) => {
          const isActive = pathname
            ? link.url === "/"
              ? pathname === "/"
              : pathname.startsWith(link.url)
            : false;
          return (
            <Link
              key={link.name}
              href={link.url}
              className={`transition-colors duration-300 ${
                isActive ? "text-teal-800" : "text-gray-400"
              } group-hover:text-gray-400 hover:text-teal-800!`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
