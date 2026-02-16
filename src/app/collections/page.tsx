"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { THEMED_COLLECTIONS, POPULAR_AYAHS, fetchAyah, AyahData } from "@/lib/quran-data";
import { CARD_STYLES } from "@/lib/card-styles";
import AyahCard from "@/components/AyahCard";

export default function CollectionsPage() {
  const [previewAyah, setPreviewAyah] = useState<AyahData | null>(null);
  const [previewStyle, setPreviewStyle] = useState(CARD_STYLES[0]);
  const [loading, setLoading] = useState(false);

  const handlePreview = useCallback(async (surah: number, ayah: number) => {
    setLoading(true);
    try {
      const data = await fetchAyah(surah, ayah);
      setPreviewAyah(data);
    } catch {
      // Silently fail for preview
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-12 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🕌</span>
          <span className="text-xl font-semibold tracking-tight">AyahDrop</span>
        </Link>
        <nav className="flex gap-4 text-sm text-gray-400">
          <Link href="/browse" className="hover:text-white transition-colors">Browse</Link>
          <Link href="/collections" className="text-[var(--color-gold)]">Collections</Link>
        </nav>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Themed Collections
        </h1>
        <p className="text-gray-400 mb-10">
          Curated verse collections for content creators. Pick a theme, generate cards, share with your audience.
        </p>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Collections list */}
          <div className="flex-1 space-y-8">
            {THEMED_COLLECTIONS.map((col) => (
              <div
                key={col.id}
                className="border border-white/10 rounded-2xl p-6 hover:border-[var(--color-gold)]/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{col.emoji}</span>
                  <h2 className="text-xl font-semibold">{col.name}</h2>
                  <span className="text-xs text-gray-500 ml-auto">{col.ayahs.length} verses</span>
                </div>
                <div className="space-y-2">
                  {col.ayahs.map((a) => (
                    <div
                      key={`${a.surah}-${a.ayah}`}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[var(--color-gold)]/60 font-mono w-10">
                          {a.surah}:{a.ayah}
                        </span>
                        <span className="text-sm text-gray-300">{a.label}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePreview(a.surah, a.ayah)}
                          className="px-3 py-1 text-xs rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                        >
                          Preview
                        </button>
                        <Link
                          href={`/?s=${a.surah}&a=${a.ayah}`}
                          className="px-3 py-1 text-xs rounded-lg bg-[var(--color-gold)]/10 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/20 transition-colors"
                        >
                          Create Card
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Popular Ayahs section */}
            <div className="border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">⭐</span>
                <h2 className="text-xl font-semibold">Most Popular Ayahs</h2>
                <span className="text-xs text-gray-500 ml-auto">{POPULAR_AYAHS.length} verses</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {POPULAR_AYAHS.map((a) => (
                  <Link
                    key={`${a.surah}-${a.ayah}`}
                    href={`/?s=${a.surah}&a=${a.ayah}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] hover:bg-[var(--color-gold)]/5 hover:border-[var(--color-gold)]/20 border border-transparent transition-all"
                  >
                    <span className="text-xs text-[var(--color-gold)]/60 font-mono w-10">
                      {a.surah}:{a.ayah}
                    </span>
                    <span className="text-sm text-gray-300 flex-1 truncate">{a.label}</span>
                    <span className="text-gray-600">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Preview sidebar */}
          <div className="lg:w-80 lg:sticky lg:top-6 lg:self-start">
            <div className="border border-white/10 rounded-2xl p-4">
              <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-3">Preview</h3>
              {loading && (
                <div className="h-80 flex items-center justify-center text-gray-500">
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
              )}
              {!loading && previewAyah && (
                <>
                  <AyahCard ayah={previewAyah} style={previewStyle} size="preview" />
                  {/* Style switcher */}
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {CARD_STYLES.filter((s) => !s.premium).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setPreviewStyle(s)}
                        className={`h-8 rounded-lg transition-all ${
                          previewStyle.id === s.id ? "ring-2 ring-[var(--color-gold)]" : ""
                        }`}
                        style={{ background: s.bgGradient }}
                        title={s.name}
                      />
                    ))}
                  </div>
                  <Link
                    href={`/?s=${previewAyah.surahNumber}&a=${previewAyah.ayahNumber}`}
                    className="block w-full mt-3 py-2.5 rounded-xl text-sm font-medium text-center transition-all"
                    style={{
                      background: "linear-gradient(135deg, #C9A84C, #A08030)",
                      color: "#1A1A2E",
                    }}
                  >
                    Create Full Card →
                  </Link>
                </>
              )}
              {!loading && !previewAyah && (
                <div className="h-80 flex items-center justify-center text-gray-600 text-sm text-center">
                  Click &ldquo;Preview&rdquo; on any verse<br />to see it here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-600 border-t border-white/5 mt-12">
        <p>Quran text via AlQuran.cloud · Sahih International translation</p>
        <p className="mt-1">Made with reverence · <Link href="/" className="text-[var(--color-gold)]/60 hover:text-[var(--color-gold)]">AyahDrop</Link></p>
      </footer>
    </div>
  );
}
