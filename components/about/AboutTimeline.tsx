export interface Milestone {
  id?: string;
  year: string;
  icon: string;
  title: string;
  description: string;
}

interface AboutTimelineProps {
  badge?: string;
  judul?: string;
  deskripsi?: string;
  milestones?: Milestone[];
}

const defaultMilestones: Milestone[] = [
  {
    id: "2023",
    year: "2023",
    icon: "verified",
    title: "Authorized Distributor Siemens",
    description:
      "Resmi menjadi partner terpercaya Siemens untuk distribusi perangkat kelistrikan dan otomasi industri di Indonesia.",
  },
  {
    id: "2024",
    year: "2024",
    icon: "hub",
    title: "Expand ke Support Ecosystem",
    description:
      "Memperluas lini produk dengan menghadirkan solusi infrastruktur seperti Busbar APS dan sistem pencahayaan industrial G-Comin.",
  },
  {
    id: "2025",
    year: "2025",
    icon: "trending_up",
    title: "Growing Business",
    description:
      "Terus bertumbuh dalam skala layanan dan jaringan distribusi, siap mendukung ekosistem industri yang lebih luas di seluruh nusantara.",
  },
];

export default function AboutTimeline({
  badge,
  judul,
  deskripsi,
  milestones,
}: AboutTimelineProps) {
  const activeMilestones = milestones && milestones.length > 0 ? milestones : defaultMilestones;
  const activeBadge = badge || "Milestone Perusahaan";
  const activeJudul = judul || "Perjalanan Kami";
  const activeDeskripsi = deskripsi || "Langkah demi langkah menuju keunggulan dan kepercayaan industri.";

  // Offset array for staircase effect
  const offsetClasses = ["", "md:mb-16", "md:mb-32"];

  return (
    <section
      id="perjalanan"
      className="relative py-24 md:py-40 px-5 md:px-12 bg-[#f2f3ff] overflow-hidden"
      aria-labelledby="timeline-heading"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage:
            "linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)",
        }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#dae2fd] text-primary font-semibold text-sm mb-6">
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              timeline
            </span>
            {activeBadge}
          </div>
          <h2
            id="timeline-heading"
            className="font-bold text-[36px] md:text-[48px] leading-tight text-[#131b2e] mb-5"
          >
            {activeJudul}
          </h2>
          <p className="text-[#603e39] text-lg max-w-2xl mx-auto">
            {activeDeskripsi}
          </p>
        </div>

        {/* Staircase cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {activeMilestones.map((m, i) => (
            <div
              key={m.id || `mile-${i}`}
              className={`group bg-white overflow-hidden border border-black/5 card-shadow hover:card-shadow-hover transition-all duration-500 rounded-[2rem] ${offsetClasses[i] ?? ""}`}
            >
              {/* Icon area */}
              <div className="relative h-48 bg-[#f2f3ff] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#eaedff]/50 to-white/50" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white/90 backdrop-blur-md text-[#333333] font-bold py-1 px-4 rounded-full text-xs tracking-wider border border-black/5">
                    {m.year}
                  </span>
                </div>
                <span
                  className="material-symbols-outlined text-[#dae2fd] relative z-10 group-hover:text-primary/20 transition-colors duration-500"
                  style={{ fontSize: "72px" }}
                >
                  {m.icon}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-xl text-[#333333] mb-3 group-hover:text-primary transition-colors">
                  {m.title}
                </h3>
                <p className="text-[#603e39] text-sm leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
