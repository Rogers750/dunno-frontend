import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dunno — AI-powered portfolios",
  description: "Upload your resume, Dunno builds your portfolio. Share dunno.app/yourname.",
  openGraph: {
    title: "Dunno — AI-powered portfolios",
    description: "Upload your resume, Dunno builds your portfolio.",
    siteName: "Dunno",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
