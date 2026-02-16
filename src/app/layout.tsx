import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AyahDrop — Beautiful Quran Verse Cards for Social Media",
  description: "Generate stunning Quran verse cards with perfect Arabic text, verified translations, and beautiful designs. 114 surahs, 8 styles, instant PNG download. Share Islamic content that inspires.",
  keywords: "Quran, Islamic content, verse cards, social media, Islamic design, ayah, Muslim content creator, Quran quotes, Islamic art, ayah cards",
  metadataBase: new URL("https://ayahdrop.vercel.app"),
  openGraph: {
    title: "AyahDrop — Beautiful Quran Verse Cards",
    description: "Generate stunning Quran verse cards for social media in seconds. 114 surahs, 8 card styles, instant PNG download.",
    type: "website",
    url: "https://ayahdrop.vercel.app",
    images: [
      {
        url: "/api/og",
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
    images: ["/api/og"],
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#C9A84C" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
