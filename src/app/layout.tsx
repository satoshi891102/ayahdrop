import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AyahDrop — Beautiful Quran Verse Cards for Social Media",
  description: "Generate stunning Quran verse cards with perfect Arabic text, verified translations, and beautiful designs. Share Islamic content that inspires.",
  keywords: "Quran, Islamic content, verse cards, social media, Islamic design, ayah, Muslim content creator",
  openGraph: {
    title: "AyahDrop — Beautiful Quran Verse Cards",
    description: "Generate stunning Quran verse cards for social media in seconds",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
