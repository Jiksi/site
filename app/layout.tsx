import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import Header from "@/layout/header";
import Footer from "@/layout/footer";

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
