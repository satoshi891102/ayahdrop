import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Themed Quran Collections — AyahDrop",
  description: "Curated Quran verse collections for content creators. Patience, Trust, Gratitude, Mercy, Guidance, Love of the Prophet ﷺ. Pick a theme and create beautiful cards.",
  openGraph: {
    title: "Themed Quran Collections — AyahDrop",
    description: "Curated verse collections for Islamic content creators.",
    images: ["/api/og"],
  },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
