import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@/payload.config";

// Generate static params for all known projects
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const { docs } = await payload.find({
    collection: "projects",
    limit: 100,
    select: {
      slug: true,
    },
  });
  return docs.map((doc) => ({ slug: doc.slug }));
}

// Dynamic SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });
  const { docs } = await payload.find({
    collection: "projects",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });
  const project = docs[0];
  if (!project) return { title: "Proyek Tidak Ditemukan" };
  return {
    title: `${project.title} | PT Hokiindo Raya`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });
  const { docs } = await payload.find({
    collection: "projects",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
  });

  const project = docs[0];
  if (!project) notFound();

  // Mapping status
  const statusColor: Record<string, string> = {
    'Selesai': "text-primary border-primary/20 bg-[#f2f3ff]",
    'Sedang Berjalan': "text-[#00646e] border-[#00646e]/20 bg-[#f0fafa]",
  };

  const statusDot: Record<string, string> = {
    'Selesai': "bg-primary",
    'Sedang Berjalan': "bg-[#00646e]",
  };

  const heroImage =
    typeof project.featuredImage === "object" && project.featuredImage !== null && "url" in project.featuredImage
      ? project.featuredImage.url || ""
      : "";

  // Split description by newlines to form paragraph array
  const paragraphs: string[] = project.description
    ? project.description.split("\n").filter((p: string) => p.trim() !== "")
    : [];

  const challenges: { icon: string; title: string; description: string }[] = (
    project.challenges || []
  ).map((c: any) => ({
    icon: c.icon || "bolt",
    title: c.title || "",
    description: c.description || "",
  }));

  const specs: { label: string; value: string }[] = (project.specs || []).map(
    (s: any) => ({
      label: s.label || "",
      value: s.value || "",
    })
  );

  const gallery: { src: string; alt: string }[] = (project.gallery || [])
    .map((g: any) => {
      const imgUrl =
        typeof g.image === "object" && g.image !== null && "url" in g.image
          ? (g.image as any).url || ""
          : "";
      const imgAlt =
        typeof g.image === "object" && g.image !== null && "alt" in g.image
          ? (g.image as any).alt || ""
          : "";
      return {
        src: imgUrl,
        alt: imgAlt || project.title,
      };
    })
    .filter((img: any) => img.src !== "");

  return (
    <main className="flex-grow">
      {/* ===== HERO ===== */}
      <header className="relative w-full h-[614px] min-h-[500px] flex items-end pb-16 md:pb-20">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {heroImage && (
            <img
              src={heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/90 via-[#131b2e]/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-white/60 text-sm font-semibold mb-5">
            <Link href="/projects" className="hover:text-white transition-colors">
              Proyek
            </Link>
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              chevron_right
            </span>
            <span className="text-white/80">Detail Proyek</span>
          </div>
          {/* Title */}
          <h1 className="font-bold text-[40px] md:text-[56px] leading-[1.1] tracking-tight text-white max-w-4xl">
            {project.title}
          </h1>
        </div>
      </header>

      {/* ===== OVERVIEW CARD (floating) ===== */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 relative z-20 -mt-10 mb-20">
        <div className="bg-white/90 backdrop-blur-xl border border-[#ebbbb4]/30 rounded-[2rem] p-8 card-shadow grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Status */}
          <div>
            <p className="text-xs font-semibold text-[#603e39] uppercase tracking-wide mb-2">
              Status
            </p>
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-bold ${statusColor[project.status] || "text-[#5c5f61] border-[#5c5f61]/20 bg-[#f5f5f5]"}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${statusDot[project.status] || "bg-[#5c5f61]"}`}
              />
              {project.status}
            </div>
          </div>
          {/* Tahun */}
          <div>
            <p className="text-xs font-semibold text-[#603e39] uppercase tracking-wide mb-2">
              Tahun Proyek
            </p>
            <p className="font-bold text-lg text-[#131b2e]">{project.year}</p>
          </div>
          {/* Klien */}
          <div>
            <p className="text-xs font-semibold text-[#603e39] uppercase tracking-wide mb-2">
              Klien
            </p>
            <p className="font-bold text-lg text-[#131b2e]">{project.client}</p>
          </div>
          {/* Lokasi */}
          <div>
            <p className="text-xs font-semibold text-[#603e39] uppercase tracking-wide mb-2">
              Lokasi
            </p>
            <p className="font-bold text-lg text-[#131b2e] flex items-start gap-1">
              <span
                className="material-symbols-outlined text-primary mt-0.5 flex-shrink-0"
                style={{ fontSize: "18px" }}
              >
                location_on
              </span>
              {project.location || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT GRID ===== */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left: Description + Challenges */}
          <div className="lg:col-span-2 space-y-12">

            {/* About Project */}
            <section>
              <h2 className="font-bold text-[28px] md:text-[32px] text-[#131b2e] mb-6">
                Tentang Proyek
              </h2>
              <div className="space-y-4 text-[#603e39] text-lg leading-relaxed">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Challenges & Solutions */}
            {challenges.length > 0 && (
              <section>
                <h2 className="font-bold text-[22px] md:text-[26px] text-[#131b2e] mb-6">
                  Tantangan &amp; Solusi
                </h2>
                <div className="bg-[#f2f3ff] rounded-[2rem] p-8 border border-[#dae2fd]/50 space-y-6">
                  {challenges.map((challenge, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span
                          className="material-symbols-outlined text-primary"
                          style={{ fontSize: "20px" }}
                        >
                          {challenge.icon}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#131b2e] mb-1">
                          {challenge.title}
                        </h4>
                        <p className="text-[#603e39] text-sm leading-relaxed">
                          {challenge.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right: Sticky Sidebar — Technical Specs */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-[2rem] p-8 border border-[#ebbbb4]/30 card-shadow sticky top-28">
              <h3 className="font-bold text-xl text-[#131b2e] mb-6 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontSize: "22px" }}
                >
                  engineering
                </span>
                Spesifikasi Teknis
              </h3>
              <div className="space-y-4">
                {specs.length > 0 ? (
                  specs.map((spec, i) => (
                    <div
                      key={i}
                      className={`pb-4 ${
                        i < specs.length - 1
                          ? "border-b border-[#ebbbb4]/20"
                          : ""
                      }`}
                    >
                      <span className="text-xs font-bold text-[#603e39] uppercase tracking-wide block mb-1">
                        {spec.label}
                      </span>
                      <span className="text-sm font-semibold text-[#131b2e]">
                        {spec.value}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#603e39]">Spesifikasi belum diisi.</p>
                )}
              </div>

              {/* Contact CTA in sidebar */}
              <div className="mt-8 pt-6 border-t border-[#dae2fd]">
                <p className="text-xs text-[#603e39] mb-3">
                  Tertarik dengan solusi serupa?
                </p>
                <Link
                  href="/contact"
                  id="project-detail-sidebar-cta"
                  className="btn-primary w-full justify-center text-sm"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                  >
                    support_agent
                  </span>
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* ===== GALLERY ===== */}
      {gallery.length > 0 && (
        <div className="max-w-[1440px] mx-auto px-5 md:px-12 mb-20">
          <h2 className="font-bold text-[28px] md:text-[32px] text-[#131b2e] mb-8">
            Galeri Instalasi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((img, i) => (
              <div
                key={i}
                className={`group relative rounded-[2rem] overflow-hidden h-[280px] border border-[#ebbbb4]/20 card-shadow ${
                  i === 2 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== CTA SECTION ===== */}
      <section className="bg-[#e2e7ff] py-20 border-t border-[#dae2fd]">
        <div className="max-w-4xl mx-auto px-5 md:px-10 text-center">
          <h2 className="font-bold text-[36px] md:text-[48px] leading-tight text-[#131b2e] mb-5">
            Tertarik dengan solusi serupa?
          </h2>
          <p className="text-lg text-[#603e39] leading-relaxed mb-10 max-w-2xl mx-auto">
            Konsultasikan kebutuhan infrastruktur kelistrikan industri Anda dengan
            tim ahli kami untuk mendapatkan solusi yang andal dan efisien.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              id="project-detail-cta-konsultan"
              className="btn-primary"
            >
              Hubungi Konsultan Kami
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                arrow_forward
              </span>
            </Link>
            <Link
              href="/projects"
              id="project-detail-cta-back"
              className="btn-outline"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                arrow_back
              </span>
              Lihat Proyek Lain
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
