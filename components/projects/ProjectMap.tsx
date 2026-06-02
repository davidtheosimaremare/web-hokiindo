"use client";

export interface MapLocation {
  id: string;
  label: string;
  count: number;
  x: string;
  y: string;
}

export interface MapStat {
  value: string;
  label: string;
}

interface ProjectMapProps {
  mapData?: {
    badge?: string;
    title?: string;
    description?: string;
    stats?: MapStat[];
  };
  projectLocations?: MapLocation[];
}

const defaultLocations: MapLocation[] = [
  { id: "jakarta", label: "Jakarta", count: 45, x: "28.5%", y: "64%" },
  { id: "surabaya", label: "Surabaya", count: 28, x: "44.5%", y: "66%" },
  { id: "balikpapan", label: "Balikpapan", count: 17, x: "50.5%", y: "44%" },
  { id: "makassar", label: "Makassar", count: 12, x: "57.5%", y: "58%" },
  { id: "medan", label: "Medan", count: 9, x: "11%", y: "22%" },
];

const defaultStats: MapStat[] = [
  { value: "100+", label: "Total Proyek" },
  { value: "5", label: "Kota Utama" },
  { value: "50+", label: "Klien Industri" },
];

export default function ProjectMap({ mapData, projectLocations }: ProjectMapProps) {
  const badge = mapData?.badge || "Sebaran Proyek Nasional";
  const title = mapData?.title || "Jejak Proyek Kami";
  const description =
    mapData?.description ||
    "Jaringan distribusi dan instalasi yang menjangkau pusat-pusat industri nasional.";
  const stats =
    mapData?.stats && mapData.stats.length > 0 ? mapData.stats : defaultStats;
  const locations =
    projectLocations && projectLocations.length > 0
      ? projectLocations
      : defaultLocations;

  return (
    <section
      id="peta-proyek"
      className="py-20 md:py-28 px-5 md:px-12 bg-[#f2f3ff] relative overflow-hidden"
      aria-labelledby="map-heading"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#dae2fd] text-primary font-semibold text-sm mb-5">
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              location_on
            </span>
            {badge}
          </div>
          <h2
            id="map-heading"
            className="font-bold text-[32px] md:text-[40px] text-[#131b2e] mb-4"
          >
            {title}
          </h2>
          <p className="text-[#603e39] text-lg max-w-xl mx-auto">
            {description}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex justify-center gap-10 md:gap-20 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-bold text-3xl md:text-4xl text-primary">{s.value}</div>
              <div className="text-sm text-[#603e39] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Map Card */}
        <div className="relative rounded-[2rem] overflow-hidden border border-white/50 bg-white/70 backdrop-blur-md card-shadow w-full">
          
          {/* Map & Pins Container (Full-width, max-w-none) */}
          <div className="relative w-full aspect-[1875.5/860.859] mx-auto">
            {/* Map Wrapper with rounded corners to clip map background */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/indonesia-map.svg"
                alt="Peta Indonesia"
                className="w-full h-full object-cover opacity-85 select-none pointer-events-none"
              />
            </div>

            {/* Pulsing Dots positioned absolutely */}
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: loc.x, top: loc.y }}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 bg-[#131b2e] text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-lg z-30">
                  {loc.label}: {loc.count} Proyek
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-[#131b2e] rotate-45 -mt-1" />
                </div>
                
                {/* Pulse dot */}
                <div
                  className="w-4 h-4 bg-primary rounded-full cursor-pointer relative z-10"
                  style={{
                    animation: "pulse-red 2s infinite",
                    animationDelay: `${Math.random() * 1}s`,
                  }}
                />

                {/* Text Label */}
                <span className="text-[9px] md:text-xs font-bold text-[#131b2e] mt-1 bg-white/90 px-1.5 py-0.5 rounded shadow-sm border border-black/5 whitespace-nowrap select-none pointer-events-none z-10">
                  {loc.label}
                </span>
              </div>
            ))}
          </div>

          {/* Description (Positioned absolutely in the bottom-right corner) */}
          <div className="absolute bottom-8 right-6 sm:bottom-12 sm:right-10 text-right max-w-[200px] sm:max-w-xs md:max-w-sm pointer-events-none z-10 bg-white/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/30 shadow-sm">
            <p className="font-bold text-[11px] sm:text-xs text-[#131b2e] mb-1">
              Visualisasi Sebaran Proyek Nasional
            </p>
            <p className="text-[#603e39] text-[9px] sm:text-[10px] leading-relaxed">
              Penanda pulse berwarna merah merepresentasikan lokasi proyek kami yang tersebar di seluruh Indonesia. Arahkan kursor pada penanda untuk melihat rincian proyek.
            </p>
          </div>
        </div>
      </div>

      {/* Pulse animation CSS */}
      <style>{`
        @keyframes pulse-red {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(188, 1, 0, 0.7); }
          70% { transform: scale(1.15); box-shadow: 0 0 0 10px rgba(188, 1, 0, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(188, 1, 0, 0); }
        }
      `}</style>
    </section>
  );
}
