"use client";

import { useState } from "react";
import Link from "next/link";
import { SURAHS } from "@/lib/quran-data";

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "Meccan" | "Medinan">("all");

  const filtered = SURAHS.filter((s) => {
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.arabic.includes(search) ||
      s.number.toString() === search;
    const matchesFilter = filter === "all" || s.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-12 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🕌</span>
          <span className="text-xl font-semibold tracking-tight">AyahDrop</span>
        </Link>
        <nav className="flex gap-4 text-sm text-gray-400">
          <Link href="/browse" className="text-[var(--color-gold)]">Browse</Link>
          <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
        </nav>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Browse All Surahs
        </h1>
        <p className="text-gray-400 mb-8">
          Explore all 114 surahs of the Noble Quran. Select any surah to create beautiful verse cards.
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Search by name, number, or Arabic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[var(--color-gold)]/50"
          />
          <div className="flex gap-2">
            {(["all", "Meccan", "Medinan"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm border transition-all ${
                  filter === f
                    ? "border-[var(--color-gold)]/50 bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                    : "border-white/10 text-gray-400 hover:border-white/20"
                }`}
              >
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mb-8 text-sm text-gray-500">
          <span>{filtered.length} surahs</span>
          <span>{filtered.reduce((sum, s) => sum + s.ayahs, 0).toLocaleString()} total ayahs</span>
        </div>

        {/* Surah Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((s) => (
            <Link
              key={s.number}
              href={`/?s=${s.number}&a=1`}
              className="group flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-[var(--color-gold)]/30 hover:bg-[var(--color-gold)]/5 transition-all"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-[var(--color-gold)] font-semibold text-sm group-hover:bg-[var(--color-gold)]/10 transition-colors">
                {s.number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm truncate">{s.name}</span>
                  <span className="text-gray-500 text-xs arabic-text">{s.arabic}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span>{s.ayahs} ayahs</span>
                  <span className={s.type === "Meccan" ? "text-amber-500/60" : "text-emerald-500/60"}>
                    {s.type}
                  </span>
                </div>
              </div>
              <div className="text-gray-600 group-hover:text-[var(--color-gold)] transition-colors">
                →
              </div>
            </Link>
          ))}
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
