import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AyahDrop — Beautiful Quran Verse Cards for Social Media",
  description: "Generate stunning Quran verse cards with perfect Arabic text, verified translations, and beautiful designs. 114 surahs, 8 styles, instant PNG download. Share Islamic content that inspires.",
  keywords: "Quran, Islamic content, verse cards, social media, Islamic design, ayah, Muslim content creator, Quran quotes, Islamic art, ayah cards",
  openGraph: {
    title: "AyahDrop — Beautiful Quran Verse Cards",
    description: "Generate stunning Quran verse cards for social media in seconds. 114 surahs, 8 card styles, instant PNG download.",
    type: "website",
    url: "https://ayahdrop.vercel.app",
    images: [
      {
        url: "https://ayahdrop.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "AyahDrop — Beautiful Quran Verse Cards for Social Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AyahDrop — Beautiful Quran Verse Cards",
    description: "Generate stunning Quran verse cards for social media in seconds",
    images: ["https://ayahdrop.vercel.app/og-image.png"],
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
