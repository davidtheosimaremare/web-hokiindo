"use client";

import { useState } from "react";
import Link from "next/link";
import { articles as libArticles } from "@/lib/news";

interface NewsSectionProps {
  limit?: number;
}

const categoryColors: Record<string, string> = {
  "Company News": "bg-primary",
  "Technical Insight": "bg-[#00646e]",
  "Industry Trends": "bg-[#603e39]",
};

const PAGE_SIZE = 3;

export default function NewsSection({ limit = 9 }: NewsSectionProps) {
  const [page, setPage] = useState(0);

  const articles = libArticles.slice(0, limit);
  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const visible = articles.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section
      id="news"
      className="py-14 md:py-20 bg-white px-5 md:px-12"
      aria-labelledby="news-heading"
    >
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2
              id="news-heading"
              className="font-bold text-[22px] md:text-[28px] text-[#131b2e]"
            >
              Berita &amp; Artikel
            </h2>
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f3ff] text-primary text-xs font-semibold border border-[#dae2fd]">
              <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>newspaper</span>
              Update Terbaru
            </span>
          </div>

          {/* Controls: prev / page indicator / next / lihat semua */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Artikel sebelumnya"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-8 h-8 rounded-full border border-[#dae2fd] flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-all text-[#131b2e] disabled:opacity-25 disabled:pointer-events-none"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_left</span>
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5 px-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Halaman ${i + 1}`}
                  onClick={() => setPage(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === page ? "20px" : "6px",
                    height: "6px",
                    background: i === page ? "#bc0100" : "#dae2fd",
                  }}
                />
              ))}
            </div>

            <button
              aria-label="Artikel berikutnya"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-8 h-8 rounded-full border border-[#dae2fd] flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-all text-[#131b2e] disabled:opacity-25 disabled:pointer-events-none"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_right</span>
            </button>

            <Link
              href="/news"
              id="news-cta-all"
              className="hidden md:inline-flex items-center gap-1 ml-2 text-xs font-semibold text-primary hover:underline"
            >
              Lihat Semua
              <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Compact 3-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visible.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group flex gap-3 p-3 rounded-2xl border border-transparent hover:border-[#eaedff] hover:bg-[#faf8ff] transition-all duration-200"
            >
              {/* Small thumbnail */}
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col justify-between min-w-0 py-0.5">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`${categoryColors[article.category] ?? "bg-primary"} text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider`}
                    >
                      {article.category}
                    </span>
                    <span className="text-[10px] text-[#603e39]">{article.date}</span>
                  </div>
                  <h3 className="font-semibold text-sm leading-snug text-[#131b2e] group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>
                <p className="text-[#603e39] text-xs line-clamp-1 mt-1">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: lihat semua */}
        <div className="text-center mt-6 md:hidden">
          <Link href="/news" className="text-sm font-semibold text-primary inline-flex items-center gap-1">
            Lihat Semua Artikel
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>arrow_forward</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
