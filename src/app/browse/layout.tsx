import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse All 114 Surahs — AyahDrop",
  description: "Explore all 114 surahs of the Noble Quran. Select any surah to create beautiful verse cards for social media. Filter by Meccan or Medinan revelation.",
  openGraph: {
    title: "Browse All 114 Surahs — AyahDrop",
    description: "Explore all 114 surahs. Create beautiful verse cards instantly.",
    images: ["/api/og"],
  },
};

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
