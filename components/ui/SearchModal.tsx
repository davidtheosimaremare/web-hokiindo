"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  type: string;
  title: string;
  excerpt: string;
  href: string;
  icon: string;
}

const TYPE_COLORS: Record<string, string> = {
  Halaman:  "bg-[#eaedff] text-[#3730a3]",
  Produk:   "bg-[#fef3c7] text-[#92400e]",
  Layanan:  "bg-[#d1fae5] text-[#065f46]",
  Berita:   "bg-[#ffe4e6] text-[#9f1239]",
  Proyek:   "bg-[#f0fdf4] text-[#166534]",
  Karir:    "bg-[#f3f4f6] text-[#374151]",
};

const SUGGESTIONS = [
  "ACB", "MCCB", "Busbar APS", "Contactor", "VFD", "Proyek", "Berita", "Karir",
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const inputRef  = useRef<HTMLInputElement>(null);
  const modalRef  = useRef<HTMLDivElement>(null);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [query,    setQuery]    = useState("");
  const [results,  setResults]  = useState<SearchResult[]>([]);
  const [loading,  setLoading]  = useState(false);
  const [focused,  setFocused]  = useState(-1); // keyboard nav index

  // Focus input when opened, reset state
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
      setQuery("");
      setResults([]);
      setFocused(-1);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Debounced search
  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); setLoading(false); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setFocused(-1);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => doSearch(val.trim()), 280);
  };

  const handleSuggestionClick = (term: string) => {
    setQuery(term);
    doSearch(term);
    inputRef.current?.focus();
  };

  // Keyboard nav through results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setFocused((f) => Math.min(f + 1, results.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setFocused((f) => Math.max(f - 1, -1)); }
    if (e.key === "Enter" && focused >= 0) {
      e.preventDefault();
      const r = results[focused];
      if (r.href.startsWith("http")) window.open(r.href, "_blank");
      else window.location.href = r.href;
      onClose();
    }
  };

  if (!isOpen) return null;

  const showSuggestions = query.length < 2;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[14vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0d1120]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ animation: "fadeInUp 0.18s ease both" }}
      >
        {/* Search input row */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f0f2ff]">
          <span
            className={`material-symbols-outlined transition-colors duration-200 ${loading ? "text-primary animate-spin" : "text-[#603e39]/50"}`}
            style={{ fontSize: "24px" }}
          >
            {loading ? "progress_activity" : "search"}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Cari produk, berita, proyek, atau halaman..."
            className="flex-grow bg-transparent border-none outline-none text-[#131b2e] text-base md:text-lg font-medium placeholder-[#603e39]/40"
            autoComplete="off"
            aria-label="Cari"
            aria-autocomplete="list"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); setResults([]); inputRef.current?.focus(); }}
              className="p-1.5 rounded-full hover:bg-[#f2f3ff] text-[#603e39]/50 transition-colors"
              aria-label="Hapus pencarian"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>close</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-1 p-1.5 rounded-full hover:bg-[#f2f3ff] text-[#603e39] transition-colors flex items-center"
            aria-label="Tutup pencarian"
          >
            <span className="text-xs font-bold border border-[#dae2fd] rounded px-1.5 py-0.5 text-[#603e39]/60">ESC</span>
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* ── Suggestions when empty ── */}
          {showSuggestions && (
            <div className="px-5 py-5">
              <p className="text-[10px] font-bold text-[#603e39]/50 uppercase tracking-widest mb-3">
                Saran Pencarian
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleSuggestionClick(term)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f2f3ff] border border-[#dae2fd] rounded-full text-sm text-[#131b2e] font-medium hover:border-primary hover:text-primary hover:bg-[#eaedff] transition-all duration-200"
                  >
                    <span className="material-symbols-outlined text-primary/60" style={{ fontSize: "13px" }}>
                      search
                    </span>
                    {term}
                  </button>
                ))}
              </div>

              {/* Page shortcuts */}
              <p className="text-[10px] font-bold text-[#603e39]/50 uppercase tracking-widest mt-5 mb-3">
                Navigasi Cepat
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Produk & Katalog", href: "https://shop.hokiindo.co.id", icon: "inventory_2" },
                  { label: "Proyek Unggulan",  href: "/projects",                   icon: "construction" },
                  { label: "Berita Terbaru",   href: "/news",                       icon: "newspaper" },
                  { label: "Hubungi Kami",     href: "/contact",                    icon: "call" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#f8f9ff] border border-[#eaedff] hover:border-primary/20 hover:bg-[#eaedff] transition-all duration-200 group"
                  >
                    <span
                      className="material-symbols-outlined text-primary/60 group-hover:text-primary transition-colors"
                      style={{ fontSize: "18px", fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm font-semibold text-[#131b2e]">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ── Live results ── */}
          {!showSuggestions && !loading && results.length === 0 && (
            <div className="px-5 py-10 text-center">
              <span className="material-symbols-outlined text-[#dae2fd] block mx-auto mb-3" style={{ fontSize: "40px" }}>
                search_off
              </span>
              <p className="text-sm text-[#603e39]/60 font-medium">
                Tidak ada hasil untuk <strong>&ldquo;{query}&rdquo;</strong>
              </p>
              <p className="text-xs text-[#603e39]/40 mt-1">
                Coba kata kunci lain atau kunjungi halaman katalog produk kami.
              </p>
            </div>
          )}

          {!showSuggestions && results.length > 0 && (
            <ul className="py-2" role="listbox" aria-label="Hasil pencarian">
              {results.map((r, i) => {
                const isExternal = r.href.startsWith("http");
                const isActive   = i === focused;
                const Comp       = isExternal ? "a" : Link;
                const extraProps = isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {};

                return (
                  <li key={i} role="option" aria-selected={isActive}>
                    <Comp
                      href={r.href}
                      {...(extraProps as any)}
                      onClick={onClose}
                      onMouseEnter={() => setFocused(i)}
                      className={`flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-colors duration-150 ${
                        isActive ? "bg-[#f2f3ff]" : "hover:bg-[#fafbff]"
                      }`}
                    >
                      {/* Icon */}
                      <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex items-center justify-center flex-shrink-0">
                        <span
                          className="material-symbols-outlined text-primary"
                          style={{ fontSize: "18px", fontVariationSettings: "'FILL' 1" }}
                        >
                          {r.icon}
                        </span>
                      </div>

                      {/* Text */}
                      <div className="flex-grow min-w-0">
                        <p className="font-semibold text-sm text-[#131b2e] leading-snug truncate">
                          {r.title}
                        </p>
                        {r.excerpt && (
                          <p className="text-xs text-[#603e39]/60 truncate mt-0.5">{r.excerpt}</p>
                        )}
                      </div>

                      {/* Type badge */}
                      <span
                        className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          TYPE_COLORS[r.type] || "bg-[#f2f3ff] text-[#131b2e]"
                        }`}
                      >
                        {r.type}
                      </span>

                      {/* External icon */}
                      {isExternal && (
                        <span className="material-symbols-outlined text-[#603e39]/30 flex-shrink-0" style={{ fontSize: "14px" }}>
                          open_in_new
                        </span>
                      )}
                    </Comp>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#f0f2ff] flex items-center gap-4 text-[10px] text-[#603e39]/40 font-semibold">
          <span className="flex items-center gap-1">
            <kbd className="border border-[#dae2fd] rounded px-1">↑↓</kbd> navigasi
          </span>
          <span className="flex items-center gap-1">
            <kbd className="border border-[#dae2fd] rounded px-1">↵</kbd> pilih
          </span>
          <span className="flex items-center gap-1">
            <kbd className="border border-[#dae2fd] rounded px-1">ESC</kbd> tutup
          </span>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
