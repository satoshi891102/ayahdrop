"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { SURAHS, POPULAR_AYAHS, THEMED_COLLECTIONS, fetchAyah, AyahData } from "@/lib/quran-data";
import { CARD_STYLES, CardStyle, FREE_STYLES } from "@/lib/card-styles";
import AyahCard from "@/components/AyahCard";
import { toPng } from "html-to-image";

type AppState = "home" | "creating" | "result";

export default function Home() {
  const [state, setState] = useState<AppState>("home");
  const [surah, setSurah] = useState<number>(2);
  const [ayahNum, setAyahNum] = useState<number>(255);
  const [ayahData, setAyahData] = useState<AyahData | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<CardStyle>(CARD_STYLES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const selectedSurah = SURAHS.find((s) => s.number === surah);
  const maxAyah = selectedSurah?.ayahs || 1;

  // URL-based ayah sharing: ?s=2&a=255 opens directly to that ayah
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const s = params.get("s");
    const a = params.get("a");
    if (s && a) {
      const surahNum = parseInt(s);
      const ayahNumber = parseInt(a);
      if (surahNum >= 1 && surahNum <= 114 && ayahNumber >= 1) {
        handleGenerate(surahNum, ayahNumber);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update URL when viewing a result
  useEffect(() => {
    if (state === "result" && ayahData) {
      const url = new URL(window.location.href);
      url.searchParams.set("s", ayahData.surahNumber.toString());
      url.searchParams.set("a", ayahData.ayahNumber.toString());
      window.history.replaceState({}, "", url.toString());
    } else if (state === "home") {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url.toString());
    }
  }, [state, ayahData]);

  const filteredSurahs = searchQuery
    ? SURAHS.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.arabic.includes(searchQuery) ||
          s.number.toString() === searchQuery
      )
    : SURAHS;

  const handleGenerate = useCallback(async (s?: number, a?: number) => {
    const targetSurah = s ?? surah;
    const targetAyah = a ?? ayahNum;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchAyah(targetSurah, targetAyah);
      setAyahData(data);
      setSurah(targetSurah);
      setAyahNum(targetAyah);
      setState("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch ayah. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [surah, ayahNum]);

  const handleDownload = useCallback(async () => {
    if (!exportRef.current) return;
    setDownloading(true);

    try {
      // Wait for fonts
      await document.fonts.ready;
      
      const dataUrl = await toPng(exportRef.current, {
        width: 1080,
        height: 1080,
        pixelRatio: 2,
        cacheBust: true,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
        },
      });

      const link = document.createElement("a");
      link.download = `ayahdrop-${ayahData?.surahNumber}-${ayahData?.ayahNumber}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
      setError("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  }, [ayahData]);

  const handleRandomAyah = useCallback(() => {
    const pick = POPULAR_AYAHS[Math.floor(Math.random() * POPULAR_AYAHS.length)];
    handleGenerate(pick.surah, pick.ayah);
  }, [handleGenerate]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state !== "home") {
        setState("home");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [state]);

  return (
    <div className="min-h-screen">
      {/* Hero / Home */}
      {state === "home" && (
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 md:px-12">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🕌</span>
              <span className="text-xl font-semibold tracking-tight">AyahDrop</span>
            </div>
            <button
              onClick={handleRandomAyah}
              className="px-4 py-2 text-sm rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              Random Ayah ✨
            </button>
          </header>

          {/* Hero */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Beautiful Quran Verses
              <br />
              <span style={{ color: "var(--color-gold)" }}>for Social Media</span>
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-lg">
              Generate stunning verse cards with perfect Arabic text and verified translations. Ready to share in seconds.
            </p>

            {/* Quick Picks */}
            <div className="w-full max-w-xl mb-8">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Popular Ayahs</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {POPULAR_AYAHS.slice(0, 8).map((p) => (
                  <button
                    key={`${p.surah}-${p.ayah}`}
                    onClick={() => handleGenerate(p.surah, p.ayah)}
                    disabled={loading}
                    className="px-3 py-1.5 text-xs rounded-full border border-white/10 hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/10 transition-all disabled:opacity-50"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Themed Collections */}
            <div className="w-full max-w-xl">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 text-center">Collections</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {THEMED_COLLECTIONS.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => {
                      const pick = col.ayahs[Math.floor(Math.random() * col.ayahs.length)];
                      handleGenerate(pick.surah, pick.ayah);
                    }}
                    disabled={loading}
                    className="px-3 py-3 text-xs rounded-xl border border-white/10 hover:border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)]/5 transition-all disabled:opacity-50 text-center"
                  >
                    <span className="block text-lg mb-1">{col.emoji}</span>
                    <span className="text-gray-300">{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Surah / Ayah picker */}
            <div className="w-full max-w-xl bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Surah search/select */}
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Surah</label>
                  <input
                    type="text"
                    placeholder="Search surah..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[var(--color-gold)]/50 mb-2"
                  />
                  <select
                    value={surah}
                    onChange={(e) => {
                      setSurah(Number(e.target.value));
                      setAyahNum(1);
                      setSearchQuery("");
                    }}
                    className="w-full px-3 py-2 bg-[#1A1A2E] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[var(--color-gold)]/50"
                    size={5}
                  >
                    {filteredSurahs.map((s) => (
                      <option key={s.number} value={s.number}>
                        {s.number}. {s.name} ({s.arabic}) — {s.ayahs} ayahs
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ayah number */}
                <div className="w-32">
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Ayah</label>
                  <input
                    type="number"
                    min={1}
                    max={maxAyah}
                    value={ayahNum}
                    onChange={(e) => setAyahNum(Math.min(Math.max(1, Number(e.target.value)), maxAyah))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[var(--color-gold)]/50"
                  />
                  <p className="text-xs text-gray-600 mt-1">of {maxAyah}</p>
                </div>
              </div>

              <button
                onClick={() => handleGenerate()}
                disabled={loading}
                className="w-full mt-4 py-3 rounded-xl font-medium transition-all disabled:opacity-50"
                style={{
                  background: loading ? "#333" : "linear-gradient(135deg, #C9A84C, #A08030)",
                  color: "#1A1A2E",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  "Generate Card"
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="text-center py-6 text-xs text-gray-600">
            Quran text via AlQuran.cloud · Sahih International translation · Made with reverence
          </footer>
        </div>
      )}

      {/* Result / Card Editor */}
      {state === "result" && ayahData && (
        <div className="min-h-screen flex flex-col">
          {/* Top bar */}
          <header className="flex items-center justify-between px-6 py-4 md:px-12 border-b border-white/10">
            <button
              onClick={() => setState("home")}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back
            </button>
            <div className="flex items-center gap-2">
              <span className="text-lg">🕌</span>
              <span className="font-semibold">AyahDrop</span>
            </div>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-50"
              style={{
                background: downloading ? "#333" : "linear-gradient(135deg, #C9A84C, #A08030)",
                color: "#1A1A2E",
              }}
            >
              {downloading ? "Exporting..." : "Download PNG"}
            </button>
          </header>

          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Card preview */}
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="w-full max-w-md">
                <AyahCard ayah={ayahData} style={selectedStyle} cardRef={cardRef} size="preview" />
              </div>
            </div>

            {/* Style picker sidebar */}
            <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/10 p-6 overflow-y-auto">
              <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">Card Style</h3>
              <div className="grid grid-cols-2 gap-3">
                {CARD_STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => !s.premium && setSelectedStyle(s)}
                    className={`relative rounded-xl p-3 text-left transition-all ${
                      selectedStyle.id === s.id
                        ? "ring-2 ring-[var(--color-gold)]"
                        : "hover:ring-1 hover:ring-white/20"
                    } ${s.premium ? "opacity-60 cursor-not-allowed" : ""}`}
                    style={{ background: s.bgGradient }}
                  >
                    <span
                      className="block text-xs font-medium mb-1"
                      style={{ color: s.arabicColor }}
                    >
                      {s.name}
                    </span>
                    <span
                      className="block text-[10px]"
                      style={{ color: s.translationColor, opacity: 0.7 }}
                    >
                      ﷽
                    </span>
                    {s.premium && (
                      <span className="absolute top-1.5 right-1.5 text-[8px] bg-[var(--color-gold)] text-black px-1.5 py-0.5 rounded-full font-bold">
                        PRO
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Ayah info */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-3">Ayah Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Surah</span>
                    <span>{ayahData.surahName} ({ayahData.surahArabic})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Ayah</span>
                    <span>{ayahData.ayahNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Translation</span>
                    <span>Sahih International</span>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-3">Share</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const shareUrl = `https://ayahdrop.vercel.app?s=${ayahData.surahNumber}&a=${ayahData.ayahNumber}`;
                      const text = `"${ayahData.translation}"\n— Surah ${ayahData.surahName} (${ayahData.surahNumber}:${ayahData.ayahNumber})\n\n${shareUrl}`;
                      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
                      window.open(url, "_blank");
                    }}
                    className="flex-1 py-2 rounded-xl text-sm bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors text-center"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      const shareUrl = `https://ayahdrop.vercel.app?s=${ayahData.surahNumber}&a=${ayahData.ayahNumber}`;
                      const text = `"${ayahData.translation}"\n\nSurah ${ayahData.surahName} (${ayahData.surahNumber}:${ayahData.ayahNumber})`;
                      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
                      window.open(url, "_blank");
                    }}
                    className="flex-1 py-2 rounded-xl text-sm bg-white/5 text-gray-300 hover:bg-white/10 transition-colors text-center"
                  >
                    𝕏 Post
                  </button>
                  <button
                    onClick={() => {
                      const shareUrl = `https://ayahdrop.vercel.app?s=${ayahData.surahNumber}&a=${ayahData.ayahNumber}`;
                      const text = `"${ayahData.translation}" — Surah ${ayahData.surahName} (${ayahData.surahNumber}:${ayahData.ayahNumber})\n\n${shareUrl}`;
                      navigator.clipboard.writeText(text);
                      const btn = document.activeElement as HTMLButtonElement;
                      const orig = btn.textContent;
                      btn.textContent = "Copied!";
                      setTimeout(() => { btn.textContent = orig; }, 2000);
                    }}
                    className="flex-1 py-2 rounded-xl text-sm bg-white/5 text-gray-300 hover:bg-white/10 transition-colors text-center"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => handleGenerate()}
                  className="w-full py-2.5 rounded-xl text-sm border border-white/10 hover:bg-white/5 transition-colors"
                >
                  Regenerate with Different Ayah
                </button>
                <button
                  onClick={handleRandomAyah}
                  className="w-full py-2.5 rounded-xl text-sm border border-white/10 hover:bg-white/5 transition-colors"
                >
                  Random Ayah ✨
                </button>
              </div>
            </div>
          </div>

          {/* Hidden export canvas — 1080x1080 for high-res download */}
          <div
            style={{
              position: "absolute",
              left: "-9999px",
              top: 0,
            }}
          >
            <AyahCard ayah={ayahData} style={selectedStyle} cardRef={exportRef} size="export" />
          </div>
        </div>
      )}
    </div>
  );
}
