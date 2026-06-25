import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Link, ViewTransitions } from "next-view-transitions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://jiksi.xyz"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Zhicxi Azis Pramana",
    template: "%s | Zhicxi Azis Pramana",
  },
  description: "My portfolio, blog, and personal website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${inter.className}`}>
        <body className="antialiased tracking-tight">
          <svg className="pointer-events-none absolute cursor-none">
            <filter id="grainy">
              <feTurbulence type="turbulence" baseFrequency="0.5" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </svg>
          <div className="min-h-svh flex flex-col justify-between p-[0_2rem_2rem_2rem] bg-white text-gray-900">
            <Header />
            <main className="max-w-[60ch] grow mx-auto w-full space-y-6 pt-6">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}

function Header() {
  const links = [
    { name: "home", url: "/" },
    { name: "blogs", url: "/blogs" },
    { name: "projects", url: "/projects" },
    { name: "notes", url: "/notes" },
    { name: "about", url: "/about" },
  ];

  return (
    <header className="mt-6 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            className="text-gray-400 hover:text-teal-800 transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
}

function Footer() {
  const links = [
    { name: "email", url: "mailto:zhicxi.ap@gmail.com" },
    { name: "linkedin", url: "https://www.linkedin.com/in/zhicxi" },
    { name: "github", url: "https://github.com/jiksi" },
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-800 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
