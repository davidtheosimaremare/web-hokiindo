import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShareButtons from "@/components/news/ShareButtons";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
  type ContentBlock,
  type NewsCategory,
} from "@/lib/news";

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artikel Tidak Ditemukan" };
  return {
    title: `${article.title} | PT Hokiindo Raya`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
      type: "article",
      publishedTime: article.dateISO,
    },
  };
}

const categoryLabel: Record<NewsCategory, string> = {
  "Company News": "Berita Perusahaan",
  "Technical Insight": "Wawasan Teknis",
  "Industry Trends": "Tren Industri",
};

const categoryColor: Record<NewsCategory, string> = {
  "Company News": "bg-[#eaedff] text-[#131b2e]",
  "Technical Insight": "bg-[#f2f3ff] text-[#603e39]",
  "Industry Trends": "bg-primary/10 text-primary",
};

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={index} className="text-[#603e39] text-lg leading-relaxed mb-6">
          {block.text}
        </p>
      );

    case "italic-paragraph":
      return (
        <p key={index} className="text-[#603e39] text-lg leading-relaxed mb-6 italic">
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2
          key={index}
          className="font-bold text-[26px] md:text-[32px] leading-snug text-[#131b2e] mt-10 mb-4"
        >
          {block.text}
        </h2>
      );

    case "blockquote":
      return (
        <blockquote
          key={index}
          className="relative bg-[#f2f3ff] border-l-4 border-primary px-8 py-8 rounded-r-[2rem] my-8"
        >
          {/* Decorative quote mark */}
          <span
            className="material-symbols-outlined absolute top-4 right-5 text-[#dae2fd] opacity-60"
            style={{ fontSize: "48px" }}
          >
            format_quote
          </span>
          <p className="text-[#131b2e] text-xl font-semibold leading-relaxed mb-3 italic">
            {block.text}
          </p>
          <footer className="text-[#603e39] text-sm font-bold not-italic">
            — {block.author}
          </footer>
        </blockquote>
      );

    default:
      return null;
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);

  return (
    <>
      <Navbar />
      <main className="w-full pt-[116px]">

        {/* ===== ARTICLE ===== */}
        <article className="mx-auto mt-12 mb-20 max-w-[1440px] px-5 md:px-12">

          {/* Header */}
          <header className="mb-8 max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-[#5c5f61] mb-6">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                chevron_right
              </span>
              <Link href="/news" className="hover:text-primary transition-colors">
                Berita
              </Link>
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                chevron_right
              </span>
              <span className="text-[#131b2e] font-semibold line-clamp-1">
                {article.title}
              </span>
            </nav>

            {/* Category + Date */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider ${categoryColor[article.category]}`}
              >
                {categoryLabel[article.category]}
              </span>
              <time
                dateTime={article.dateISO}
                className="text-[#5c5f61] text-sm font-semibold"
              >
                {article.date}
              </time>
              {article.author && (
                <>
                  <span className="text-[#5c5f61]">·</span>
                  <span className="text-[#5c5f61] text-sm">{article.author}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="font-bold text-[36px] md:text-[52px] leading-[1.1] tracking-tight text-[#131b2e] mb-0">
              {article.title}
            </h1>
          </header>

          {/* Hero Image — wide 21:9 */}
          <figure className="w-full rounded-[2rem] overflow-hidden border border-[#ebbbb4]/30 mb-12 relative card-shadow">
            <div className="aspect-[21/9] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.image}
                alt={article.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </figure>

          {/* Body Content */}
          <div className="max-w-3xl mx-auto">
            {article.content ? (
              article.content.map((block, i) => renderBlock(block, i))
            ) : (
              <p className="text-[#603e39] text-lg leading-relaxed">{article.excerpt}</p>
            )}

            {/* Share Bar */}
            <div className="mt-14 pt-8 border-t border-[#ebbbb4]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <ShareButtons title={article.title} />
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  arrow_back
                </span>
                Kembali ke Semua Berita
              </Link>
            </div>
          </div>
        </article>

        {/* ===== RELATED NEWS ===== */}
        <section className="bg-[#f2f3ff] py-20 border-t border-[#ebbbb4]/20">
          <div className="max-w-[1440px] mx-auto px-5 md:px-12">
            <h2 className="font-bold text-[26px] md:text-[32px] text-[#131b2e] mb-10">
              Berita Terkait
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/news/${rel.slug}`}
                  className="group block bg-white rounded-[2rem] border border-[#ebbbb4]/30 overflow-hidden hover:shadow-xl transition-all duration-300 card-shadow"
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rel.image}
                      alt={rel.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-primary text-xs font-bold uppercase tracking-wider">
                        {categoryLabel[rel.category]}
                      </span>
                      <span className="text-[#5c5f61] text-xs">· {rel.date}</span>
                    </div>
                    <h3 className="font-bold text-lg text-[#131b2e] group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {rel.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
