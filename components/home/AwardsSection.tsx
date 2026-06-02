import Link from "next/link";

export interface Award {
  id?: string;
  year: string;
  title: string;
  description: string;
  image?: string | { url?: string };
  isComingSoon?: boolean;
}

interface AwardsSectionProps {
  badge?: string;
  judul?: string;
  deskripsi?: string;
  awards?: Award[];
  companyProfilePdfUrl?: string;
}

const defaultAwards: Award[] = [
  {
    id: "award-2024",
    year: "2024",
    title: "Best Growth Distributor",
    description:
      "Penghargaan prestisius dari Siemens atas ekspansi pasar yang luar biasa dan keunggulan teknis di wilayah Indonesia.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
  },
  {
    id: "award-2025",
    year: "2025",
    title: "Best Growth Distributor",
    description:
      "Melanjutkan momentum pertumbuhan dengan integrasi solusi industri mutakhir dan dedikasi berkelanjutan kepada mitra.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    id: "award-2026",
    year: "2026",
    title: "Segera Hadir",
    description:
      "Menciptakan standar baru dalam inovasi teknik dan kemitraan strategis yang berkelanjutan bersama Siemens.",
    isComingSoon: true,
  },
];

function AwardCard({ award, index }: { award: Award; index: number }) {
  // Staggered vertical offset for cascading effect
  const offsetClasses = [
    "md:self-end",
    "md:mb-16 md:self-end",
    "md:mb-32 md:self-end",
  ];

  return (
    <div
      className={`group bg-white overflow-hidden border border-black/5 card-shadow hover:card-shadow-hover transition-all duration-500 rounded-[2rem] ${offsetClasses[index] ?? ""}`}
      style={{ transitionProperty: "box-shadow, transform" }}
    >
      {/* Card Image */}
      <div className="relative h-52 overflow-hidden bg-[#f2f3ff]">
        {award.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={typeof award.image === 'object' && award.image ? award.image.url || "" : award.image}
            alt={`Award ${award.year}: ${award.title}`}
            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#eaedff]/50 to-white/50" />
            <span
              className="material-symbols-outlined text-[#dae2fd] z-10"
              style={{ fontSize: "72px" }}
            >
              rocket_launch
            </span>
          </div>
        )}
        {/* Year badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/90 backdrop-blur-md text-[#333333] font-bold py-1 px-4 rounded-full text-xs tracking-wider border border-black/5">
            {award.year}
          </span>
        </div>
        {/* Siemens badge for real awards */}
        {!award.isComingSoon && (
          <div className="absolute bottom-4 right-4 z-10">
            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-md shadow-sm border border-black/5 flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[#00646e]"
                style={{ fontSize: "14px" }}
              >
                verified
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg"
                alt="Siemens"
                className="h-3.5 w-auto"
              />
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-[#333333] mb-3 group-hover:text-primary transition-colors">
          {award.title}
        </h3>
        <p className="text-[#603e39] text-sm leading-relaxed">
          {award.description}
        </p>
      </div>
    </div>
  );
}

export default function AwardsSection({
  badge,
  judul,
  deskripsi,
  awards,
  companyProfilePdfUrl,
}: AwardsSectionProps) {
  const activeAwards = awards && awards.length > 0 ? awards : defaultAwards;
  const activeBadge = badge || "Penghargaan & Pencapaian";
  const activeJudul = judul || "Perjalanan Keunggulan Kami";
  const activeDeskripsi =
    deskripsi ||
    "Menelusuri jejak inovasi, dedikasi, dan kepemimpinan kami dalam menyediakan solusi kelistrikan dan otomasi industri terdepan di Indonesia.";

  return (
    <section
      id="awards"
      className="relative py-24 md:py-36 px-5 md:px-12 bg-[#f2f3ff] overflow-hidden"
      aria-labelledby="awards-heading"
    >
      {/* Circuit grid background */}
      <div className="absolute inset-0 circuit-grid-bg pointer-events-none" />

      {/* Animated Circuit Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="circuit-line" style={{ left: '20%', animationDelay: '0s' }} />
        <div className="circuit-line" style={{ left: '60%', animationDelay: '4s' }} />
        <div className="circuit-line" style={{ left: '85%', animationDelay: '2s' }} />
        <div className="circuit-line horizontal" style={{ top: '30%', animationDelay: '2s' }} />
        <div className="circuit-line horizontal" style={{ top: '70%', animationDelay: '6s' }} />
      </div>

      {/* Decorative red glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(188,1,0,0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#dae2fd] text-[#00646e] text-sm font-semibold mb-6">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px" }}
            >
              emoji_events
            </span>
            {activeBadge}
          </div>
          <h2
            id="awards-heading"
            className="font-bold text-[36px] md:text-[48px] leading-tight text-[#131b2e] mb-5"
          >
            {activeJudul}
          </h2>
          <p className="text-[#603e39] text-lg max-w-2xl mx-auto leading-relaxed">
            {activeDeskripsi}
          </p>
        </div>

        {/* Awards Grid - staggered layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {activeAwards.map((award, i) => (
            <AwardCard key={award.id || `award-${i}`} award={award} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
          <Link
            href="/about"
            id="awards-cta-about"
            className="btn-primary inline-flex"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "18px" }}
            >
              history
            </span>
            Lihat Profil Perusahaan
          </Link>
          <a
            href={companyProfilePdfUrl || "/assets/company-profile.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex bg-white/50 backdrop-blur-sm"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "18px" }}
            >
              download
            </span>
            Download Company Profile
          </a>
        </div>
      </div>
    </section>
  );
}
