import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";

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
  description: "Frontend developer, based in Balikpapan, Indonesia",
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
          <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 bg-white text-gray-900">
            <main className="max-w-[60ch] mx-auto w-full space-y-6">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}

function Footer() {
  const links = [
    { name: "email", url: "mailto:zhicxi.ap@gmail.com" },
    { name: "instagram", url: "https://www.instagram.com/jiksilalapo" },
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
            className="text-gray-400 hover:text-teal-500 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
