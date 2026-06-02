import type { Metadata } from "next";

import NewsGrid from "@/components/news/NewsGrid";

export const metadata: Metadata = {
  title: "Berita & Wawasan Industri | PT Hokiindo Raya",
  description:
    "Update terbaru dari PT Hokiindo Raya — penghargaan, insight teknis, dan tren industri kelistrikan Indonesia. Distributed authorized partner Siemens.",
  openGraph: {
    title: "Berita & Wawasan Industri | PT Hokiindo Raya",
    description:
      "Temukan artikel terbaru seputar teknologi kelistrikan, automation, dan berita perusahaan PT Hokiindo Raya.",
    type: "website",
    locale: "id_ID",
  },
};

export default function NewsPage() {
  return (
    <>

      <main className="flex-grow flex flex-col pb-20 pt-[116px]">

        {/* ===== HERO ===== */}
        <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center bg-[#283044] overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=85')",
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-12 flex flex-col items-center md:items-start text-center md:text-left gap-6">
            {/* Badge */}
            <span className="bg-primary/90 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.1em] shadow-md">
              Updates &amp; Insights
            </span>
            {/* Heading */}
            <h1 className="font-bold text-[44px] md:text-[64px] leading-[1.1] tracking-tight text-white drop-shadow-lg max-w-4xl">
              Berita &amp; Wawasan Industri
            </h1>
            {/* Subtext */}
            <p className="text-white/85 text-lg leading-relaxed max-w-2xl drop-shadow">
              Discover the latest advancements in electrical technology, insightful
              industry trends, and key updates from PT Hokiindo Raya&apos;s ongoing
              projects and partnerships.
            </p>
          </div>
        </section>

        {/* ===== ARTICLE GRID + PAGINATION ===== */}
        <section
          className="max-w-[1440px] w-full mx-auto px-5 md:px-12 pt-16"
          aria-label="Daftar artikel berita"
        >
          <NewsGrid />
        </section>

      </main>

    </>
  );
}
