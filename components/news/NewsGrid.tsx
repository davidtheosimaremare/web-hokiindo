"use client";

import { useState } from "react";
import Link from "next/link";
import { articles, ARTICLES_PER_PAGE, type NewsArticle, type NewsCategory } from "@/lib/news";

const categoryColor: Record<NewsCategory, string> = {
  "Company News": "bg-[#eaedff] text-[#131b2e]",
  "Technical Insight": "bg-[#f2f3ff] text-[#603e39]",
  "Industry Trends": "bg-primary/10 text-primary",
};

function ArticleCard({ article }: { article: NewsArticle }) {
  return (
    <article className="group bg-white border border-[#ebbbb4]/30 rounded-[2rem] overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 card-shadow">
      {/* Image */}
      <div className="w-full aspect-[16/10] overflow-hidden bg-[#dae2fd] relative flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-grow">
        {/* Category + Date */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${categoryColor[article.category]}`}
          >
            {article.category}
          </span>
          <time
            dateTime={article.dateISO}
            className="text-[#5c5f61] text-sm font-semibold"
          >
            {article.date}
          </time>
        </div>

        {/* Title */}
        <h2 className="font-bold text-[18px] leading-snug text-[#131b2e] mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-[#603e39] text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {article.excerpt}
        </p>

        {/* Read More */}
        <Link
          href={`/news/${article.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 text-primary font-bold text-sm w-fit group/link hover:gap-2.5 transition-all duration-200"
        >
          Baca Artikel
          <span
            className="material-symbols-outlined transition-transform duration-200 group-hover/link:translate-x-1"
            style={{ fontSize: "18px" }}
          >
            arrow_forward
          </span>
        </Link>
      </div>
    </article>
  );
}

function PaginationButton({
  page,
  currentPage,
  onClick,
}: {
  page: number;
  currentPage: number;
  onClick: (p: number) => void;
}) {
  const isActive = page === currentPage;
  return (
    <button
      onClick={() => onClick(page)}
      aria-label={`Halaman ${page}`}
      aria-current={isActive ? "page" : undefined}
      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
        isActive
          ? "bg-primary text-white shadow-md"
          : "text-[#131b2e] hover:bg-[#eaedff] hover:text-primary"
      }`}
    >
      {page}
    </button>
  );
}

export default function NewsGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  const start = (currentPage - 1) * ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(start, start + ARTICLES_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {currentArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {/* Pagination */}
      <nav
        className="mt-16 mb-4 flex items-center justify-center gap-2"
        aria-label="Navigasi halaman berita"
      >
        {/* Prev */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Halaman sebelumnya"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#5c5f61] hover:bg-[#eaedff] hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
            chevron_left
          </span>
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationButton
            key={page}
            page={page}
            currentPage={currentPage}
            onClick={goToPage}
          />
        ))}

        {/* Next */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Halaman berikutnya"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#5c5f61] hover:bg-[#eaedff] hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
            chevron_right
          </span>
        </button>
      </nav>

      {/* Article count info */}
      <p className="text-center text-xs text-[#5c5f61] mb-8">
        Menampilkan {start + 1}–{Math.min(start + ARTICLES_PER_PAGE, articles.length)} dari{" "}
        {articles.length} artikel
      </p>
    </>
  );
}
