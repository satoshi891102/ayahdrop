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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Amiri:wght@400;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
