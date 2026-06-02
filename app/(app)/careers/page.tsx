import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { getPayload } from "payload";
import configPromise from "@/payload.config";
import JobCard from "@/components/careers/JobCard";

export const metadata: Metadata = {
  title: "Karir | PT Hokiindo Raya",
  description:
    "Bergabunglah dengan tim PT Hokiindo Raya — distributor resmi Siemens terkemuka di Indonesia. Temukan posisi karir yang sesuai passion Anda dalam lingkungan inovatif dan kolaboratif.",
  openGraph: {
    title: "Karir | PT Hokiindo Raya",
    description:
      "Bertumbuh bersama PT Hokiindo Raya — temukan posisi karir Anda.",
    type: "website",
    locale: "id_ID",
  },
};

// Fallback Mock Openings
const defaultJobs = [
  {
    id: "sales-engineer",
    title: "Sales Engineer",
    department: "Sales",
    type: "Full Time",
    location: "Jakarta",
    description: "Sebagai Sales Engineer, Anda akan menjadi jembatan antara solusi teknis kompleks dengan kebutuhan klien. Anda akan bertanggung jawab untuk mempresentasikan produk Siemens kami, menganalisis kebutuhan teknis pelanggan, dan merancang solusi yang optimal.",
    requirements: "Kualifikasi:\n• Pendidikan minimal D3/S1 Teknik Elektro/Mesin\n• Memiliki pengalaman di bidang B2B Sales / Elektrikal\n• Mampu berbahasa Inggris dengan baik",
    skills: [
      { icon: "engineering", label: "Teknik Elektro/Mesin" },
      { icon: "handshake", label: "B2B Sales" },
      { icon: "language", label: "English Proficient" },
    ],
  },
  {
    id: "technical-support",
    title: "Technical Support Engineer",
    department: "Engineering",
    type: "Full Time",
    location: "Jakarta",
    description: "Memberikan dukungan teknis purna jual kepada pelanggan untuk produk Siemens. Mendiagnosa permasalahan, melakukan commissioning, dan memberikan pelatihan penggunaan produk kepada klien industri.",
    requirements: "Kualifikasi:\n• Pendidikan minimal D3/S1 Teknik Elektro\n• Memiliki pengalaman di bidang Customer Support / Low Voltage Systems",
    skills: [
      { icon: "build", label: "Teknik Elektro" },
      { icon: "support_agent", label: "Customer Support" },
      { icon: "electric_bolt", label: "Low Voltage Systems" },
    ],
  },
  {
    id: "product-specialist",
    title: "Product Specialist — Siemens Control",
    department: "Product",
    type: "Full Time",
    location: "Jakarta / Remote",
    description: "Menjadi expert internal untuk lini produk Siemens Control (Contactor, VFD, Soft Starter). Bertanggung jawab atas pelatihan tim sales, pembuatan materi teknis, dan dukungan pre-sales untuk proyek-proyek strategis.",
    requirements: "Kualifikasi:\n• Memiliki pemahaman kuat mengenai produk Siemens Control Systems\n• Mampu melakukan presentasi & training",
    skills: [
      { icon: "school", label: "Product Knowledge" },
      { icon: "device_hub", label: "Siemens Control Systems" },
      { icon: "co_present", label: "Presentasi & Training" },
    ],
  },
];

export default async function CareersPage() {
  const payload = await getPayload({ config: configPromise });

  // 1. Fetch Page Content Global Data
  const pageData = await payload.findGlobal({
    slug: "careers-page",
    depth: 2,
  });

  // 2. Fetch Open Job Openings from main database
  const { docs: dbJobs } = await payload.find({
    collection: "careers",
    where: {
      status: {
        equals: "open",
      },
    },
    limit: 100,
  });

  // 3. Fetch Profile Email
  const profile = await payload.findGlobal({
    slug: "profile",
    depth: 1,
  });

  const contactEmail = profile?.email || "info@hokiindo.co.id";

  // Destructure content blocks with fallbacks
  const heroBadge = pageData?.hero?.badge || "Bergabung Bersama Kami";
  const heroTitle = pageData?.hero?.title || "Bertumbuh Bersama PT Hokiindo Raya";
  const heroDesc = pageData?.hero?.description || "Kami mencari talenta terbaik untuk bergabung dalam tim yang dinamis, inovatif, dan berdedikasi tinggi. Temukan potensi maksimal Anda bersama kami dalam lingkungan kerja yang mengedepankan kolaborasi dan keunggulan.";
  const heroBg = typeof pageData?.hero?.backgroundImage === "object" && pageData?.hero?.backgroundImage !== null && "url" in pageData?.hero?.backgroundImage
    ? pageData?.hero?.backgroundImage.url || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85"
    : "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85";

  const cultureBadge = pageData?.culture?.badge || "DNA Perusahaan";
  const cultureTitle = pageData?.culture?.title || "Budaya & Nilai Kami";
  const cultureDesc = pageData?.culture?.description || "Kami percaya bahwa inovasi lahir dari kebebasan berekspresi dan dedikasi pada proses. Nilai-nilai ini menjadi panduan kami dalam setiap langkah.";
  const cultureValues = pageData?.culture?.values && pageData.culture.values.length > 0
    ? pageData.culture.values
    : [
        {
          icon: "lightbulb",
          title: "Kebebasan Berkreativitas",
          description: "Kami memberikan ruang seluas-luasnya bagi setiap individu untuk mengemukakan ide dan bereksperimen. Inovasi bermula dari keberanian mencoba hal baru.",
        },
        {
          icon: "precision_manufacturing",
          title: "Fokus pada Proses",
          description: "Hasil yang luar biasa berasal dari proses yang disiplin. Kami menghargai ketelitian, metodologi yang kuat, dan dedikasi dalam setiap tahap pekerjaan.",
        },
        {
          icon: "trending_up",
          title: "Peningkatan Berkelanjutan",
          description: "Kami selalu haus akan pembelajaran. Evaluasi tanpa henti dan kemauan untuk beradaptasi adalah kunci agar kami tetap relevan dan kompetitif.",
        },
      ];

  const benefitsTitle = pageData?.benefits?.title || "Apa yang Kami Tawarkan";
  const benefitsPerks = pageData?.benefits?.perks && pageData.benefits.perks.length > 0
    ? pageData.benefits.perks
    : [
        { icon: "health_and_safety", label: "BPJS Kesehatan & Ketenagakerjaan" },
        { icon: "school", label: "Training & Sertifikasi Siemens" },
        { icon: "work_history", label: "Flexible Working Arrangement" },
        { icon: "emoji_events", label: "Performance Bonus" },
        { icon: "directions_car", label: "Tunjangan Transport" },
        { icon: "restaurant", label: "Tunjangan Makan" },
      ];

  const jobsBadge = pageData?.jobsHeading?.badge || "Lowongan Kerja";
  const jobsTitle = pageData?.jobsHeading?.title || "Posisi yang Tersedia";
  const jobsDesc = pageData?.jobsHeading?.description || "Jelajahi peluang karir dan temukan peran yang sesuai dengan passion Anda.";

  const ctaTitle = pageData?.cta?.title || "Siap Mengambil Langkah Berikutnya?";
  const ctaDesc = pageData?.cta?.description || "Bergabunglah dengan tim yang berkomitmen menghadirkan teknologi terbaik untuk industri Indonesia.";

  // Use database jobs, if empty fallback to mock jobs
  const jobsToDisplay = dbJobs.length > 0 ? dbJobs : defaultJobs;

  return (
    <>
      <main className="flex-grow pt-[116px]">

        {/* ===== HERO ===== */}
        <section className="relative pt-0 pb-0 overflow-hidden flex items-center justify-center min-h-[700px]">
          {/* BG Image */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroBg}
              alt="Lingkungan kerja modern PT Hokiindo Raya"
              className="w-full h-full object-cover opacity-90"
            />
            {/* gradient from left */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#faf8ff]/95 via-[#faf8ff]/70 to-transparent" />
            {/* gradient from bottom for mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf8ff]/80 to-transparent md:hidden" />
          </div>

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-12 py-32">
            <div className="max-w-2xl glass-panel rounded-[2rem] p-10 md:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/20">
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                  work
                </span>
                {heroBadge}
              </div>
              <h1 className="font-bold text-[40px] md:text-[52px] leading-[1.1] tracking-tight text-[#131b2e] mb-6">
                {heroTitle}
              </h1>
              <p className="text-lg text-[#603e39] leading-relaxed mb-8">
                {heroDesc}
              </p>
              <a
                href="#posisi"
                id="careers-hero-cta"
                className="btn-primary inline-flex"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  arrow_downward
                </span>
                Lihat Posisi Tersedia
              </a>
            </div>
          </div>
        </section>

        {/* ===== BUDAYA & NILAI ===== */}
        <section
          id="nilai"
          className="py-20 md:py-28 bg-white px-5 md:px-12"
          aria-labelledby="values-heading"
        >
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2f3ff] text-primary font-semibold text-sm mb-5 border border-[#dae2fd]">
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  diversity_3
                </span>
                {cultureBadge}
              </div>
              <h2
                id="values-heading"
                className="font-bold text-[28px] md:text-[40px] text-[#131b2e] mb-4"
              >
                {cultureTitle}
              </h2>
              <p className="text-[#603e39] text-lg max-w-2xl mx-auto leading-relaxed">
                {cultureDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cultureValues.map((val) => (
                <div
                  key={val.title}
                  className="glass-panel rounded-[2rem] p-8 md:p-10 hover:card-shadow-hover transition-shadow duration-300 border border-white/40"
                >
                  <div className="w-16 h-16 rounded-full bg-[#eaedff] flex items-center justify-center mb-6">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontSize: "32px", fontVariationSettings: "'FILL' 1" }}
                    >
                      {val.icon}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-[#131b2e] mb-3">{val.title}</h3>
                  <p className="text-[#603e39] text-base leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== JOB OPENINGS ===== */}
        <section
          id="posisi"
          className="py-20 md:py-28 bg-[#f2f3ff] px-5 md:px-12 relative overflow-hidden"
          aria-labelledby="jobs-heading"
        >
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 max-w-[1440px] mx-auto">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-primary font-semibold text-sm mb-5 border border-[#dae2fd] shadow-sm">
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  work_history
                </span>
                {jobsBadge}
              </div>
              <h2
                id="jobs-heading"
                className="font-bold text-[28px] md:text-[36px] text-[#131b2e] mb-3"
              >
                {jobsTitle}
              </h2>
              <p className="text-[#603e39] text-lg">
                {jobsDesc}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {jobsToDisplay.map((job) => (
                <JobCard key={job.id} job={job} contactEmail={contactEmail} />
              ))}

              {/* General application / empty state hint */}
              <div className="text-center py-8 border border-dashed border-[#dae2fd] rounded-[2rem] bg-white/60">
                <span
                  className="material-symbols-outlined text-[#c7d2fe] block mb-3"
                  style={{ fontSize: "40px" }}
                >
                  mail_outline
                </span>
                <p className="text-[#603e39] text-sm">
                  Tidak menemukan posisi yang cocok? Kirimkan CV Anda secara umum ke{" "}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-primary font-bold hover:underline"
                  >
                    {contactEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA BOTTOM ===== */}
        <section className="relative overflow-hidden bg-[#0d1120] px-5 md:px-12 py-28 md:py-36">

          {/* — Decorative glowing orbs — */}
          <div className="pointer-events-none absolute inset-0 z-0">
            {/* Red glow left */}
            <div
              className="absolute -left-24 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #bc0100 0%, transparent 70%)" }}
            />
            {/* Soft blue glow right */}
            <div
              className="absolute -right-32 top-0 w-[480px] h-[480px] rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
            />
            {/* Dot-grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          {/* — Horizontal rule top — */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative z-10 max-w-[1440px] mx-auto">

            {/* Top badge */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                Bergabunglah Sekarang
              </div>
            </div>

            {/* Main copy */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="font-bold text-[36px] md:text-[56px] leading-[1.1] tracking-tight text-white mb-6">
                {ctaTitle}
              </h2>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed">
                {ctaDesc}
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link
                href="#posisi"
                id="careers-bottom-cta"
                className="group inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-full hover:bg-primary/90 hover:shadow-[0_0_40px_rgba(188,1,0,0.4)] transition-all duration-300 text-base"
              >
                Lihat Semua Posisi
                <span
                  className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1"
                  style={{ fontSize: "20px" }}
                >
                  arrow_forward
                </span>
              </Link>
              <a
                href={`mailto:${contactEmail}`}
                id="careers-bottom-email"
                className="inline-flex items-center gap-2 border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base backdrop-blur-sm bg-white/5 hover:bg-white/10"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  mail_outline
                </span>
                Kirim CV Umum
              </a>
            </div>



          </div>

          {/* — Horizontal rule bottom — */}
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>

      </main>
    </>
  );
}
