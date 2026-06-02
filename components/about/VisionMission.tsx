interface VisionMissionProps {
  badge?: string;
  judul?: string;
  visiJudul?: string;
  visiDeskripsi?: string;
  misiJudul?: string;
  misiItems?: string[] | { text: string }[] | null;
}

const defaultMisi = [
  "Menyediakan produk kelistrikan berkualitas tinggi standar internasional.",
  "Memberikan layanan teknis prima dan solusi komprehensif bagi setiap klien.",
  "Mendorong inovasi berkelanjutan dalam industri infrastruktur energi.",
];

export default function VisionMission({
  badge,
  judul,
  visiJudul,
  visiDeskripsi,
  misiJudul,
  misiItems,
}: VisionMissionProps) {
  const activeBadge = badge || "Visi & Misi";
  const activeJudul = judul || "Arah & Tujuan Kami";
  const activeVisiJudul = visiJudul || "Visi Kami";
  const activeVisiDeskripsi =
    visiDeskripsi ||
    "Menjadi partner solusi elektrikal terdepan di Indonesia yang mengutamakan kualitas, keandalan, dan inovasi berkelanjutan.";
  const activeMisiJudul = misiJudul || "Misi Kami";

  // Normalize misiItems from either string array or CMS text objects
  const activeMisiItems =
    misiItems && misiItems.length > 0
      ? misiItems.map((item) => (typeof item === "object" ? item.text : item))
      : defaultMisi;

  return (
    <section
      id="visi-misi"
      className="py-20 px-5 md:px-10"
      aria-labelledby="vm-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2f3ff] text-primary font-semibold text-sm mb-4 border border-[#dae2fd]">
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              flag
            </span>
            {activeBadge}
          </div>
          <h2
            id="vm-heading"
            className="font-bold text-[32px] md:text-[40px] text-[#131b2e]"
          >
            {activeJudul}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visi Card */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group hover:shadow-xl transition-shadow duration-300 border border-black/5 card-shadow">
            <div className="w-16 h-16 bg-[#f2f3ff] flex items-center justify-center rounded-full mb-8 group-hover:bg-primary/10 transition-colors duration-300">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontSize: "32px" }}
              >
                visibility
              </span>
            </div>
            <h3 className="font-bold text-2xl text-[#131b2e] mb-4">{activeVisiJudul}</h3>
            <p className="text-[#5c5f61] text-lg leading-relaxed">
              {activeVisiDeskripsi}
            </p>
            {/* Watermark icon */}
            <div className="absolute -right-8 -bottom-8 opacity-[0.04] text-primary pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: "160px" }}>
                visibility
              </span>
            </div>
          </div>

          {/* Misi Card */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 flex flex-col justify-center relative overflow-hidden group hover:shadow-xl transition-shadow duration-300 border border-black/5 card-shadow">
            <div className="w-16 h-16 bg-[#f2f3ff] flex items-center justify-center rounded-full mb-8 group-hover:bg-primary/10 transition-colors duration-300">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontSize: "32px" }}
              >
                rocket_launch
              </span>
            </div>
            <h3 className="font-bold text-2xl text-[#131b2e] mb-4">{activeMisiJudul}</h3>
            <ul className="space-y-4 text-[#5c5f61] text-base leading-relaxed">
              {activeMisiItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="material-symbols-outlined text-primary mt-0.5 flex-shrink-0"
                    style={{ fontSize: "20px" }}
                  >
                    check_circle
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {/* Watermark icon */}
            <div className="absolute -right-8 -bottom-8 opacity-[0.04] text-primary pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: "160px" }}>
                rocket_launch
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
