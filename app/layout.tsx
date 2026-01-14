import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Internship Tracker",
  description: "Track your internship applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold">
                  IT
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold">
                    Internship Tracker
                  </span>
                  <span className="text-xs text-slate-400">
                    Your internship command center
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <Link href="/" className="hover:text-slate-100">
                  Dashboard
                </Link>
              </div>
            </nav>
          </header>
          <main className="mx-auto flex w-full max-w-6xl flex-1 px-4 py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
