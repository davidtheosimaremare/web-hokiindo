import Link from "next/link";

export interface EcosystemProduct {
  id?: string;
  name: string;
  description: string;
  image?: string | { url?: string };
}

interface EcosystemSectionProps {
  badge?: string;
  heading?: string;
  description?: string;
  busbarHeading?: string;
  busbarDescription?: string;
  busbarHeroImage?: string | { url?: string };
  busbars?: EcosystemProduct[];
  lightHeading?: string;
  lightDescription?: string;
  lightHeroImage?: string | { url?: string };
  lights?: EcosystemProduct[];
}

const defaultBusbars: EcosystemProduct[] = [
  {
    id: "aps-sandwich",
    name: "APS Sandwich Series",
    description:
      "Desain kompak untuk efisiensi ruang tinggi pada distribusi tegangan rendah industri.",
  },
  {
    id: "aps-lighting",
    name: "APS Lighting Series",
    description:
      "Sistem busbar khusus untuk distribusi daya pencahayaan industri yang efisien.",
  },
  {
    id: "aps-feeder",
    name: "APS Feeder Units",
    description:
      "Unit distribusi daya yang handal untuk berbagai konfigurasi sistem listrik.",
  },
];

const defaultLights: EcosystemProduct[] = [
  {
    id: "ultra-portable",
    name: "Ultra Portable Series",
    description:
      "Lampu kerja ringkas dengan baterai tahan lama dan ketahanan benturan tinggi untuk lapangan.",
  },
  {
    id: "professional-area",
    name: "Professional Area Light",
    description:
      "Pencahayaan area luas dengan output lumens tinggi untuk operasional proyek malam hari.",
  },
  {
    id: "hazardous-location",
    name: "Hazardous Location Series",
    description:
      "Sertifikasi khusus untuk penggunaan aman di area berbahaya dan mudah terbakar.",
  },
];

const defaultBusbarHero =
  "https://images.unsplash.com/photo-1621902736256-e5c0b28e70a5?w=900&q=80";
const defaultLightHero =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80";

function ProductCard({ product }: { product: EcosystemProduct }) {
  const imgSrc =
    typeof product.image === "object" && product.image
      ? product.image.url || ""
      : product.image;

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-[#eaedff] hover:border-primary/30 transition-all duration-300 group card-shadow hover:card-shadow-hover flex flex-col">
      {/* Placeholder image area */}
      <div className="aspect-video mb-5 overflow-hidden rounded-2xl bg-[#f2f3ff] flex items-center justify-center">
        {imgSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-3"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-30">
            <span
              className="material-symbols-outlined text-[#131b2e]"
              style={{ fontSize: "40px" }}
            >
              widgets
            </span>
          </div>
        )}
      </div>
      <h4 className="font-bold text-lg mb-2 text-[#131b2e] group-hover:text-primary transition-colors">
        {product.name}
      </h4>
      <p className="text-sm text-[#603e39] leading-relaxed flex-grow">
        {product.description}
      </p>
    </div>
  );
}

export default function EcosystemSection({
  badge,
  heading,
  description,
  busbarHeading,
  busbarDescription,
  busbarHeroImage,
  busbars,
  lightHeading,
  lightDescription,
  lightHeroImage,
  lights,
}: EcosystemSectionProps) {
  const activeBusbars = busbars && busbars.length > 0 ? busbars : defaultBusbars;
  const activeLights = lights && lights.length > 0 ? lights : defaultLights;
  const activeBusbarHero = busbarHeroImage || defaultBusbarHero;
  const activeLightHero = lightHeroImage || defaultLightHero;

  const activeBadge = badge || "Ekosistem Produk Pendukung";
  const activeHeading = heading || "Ekosistem Pendukung Industri";
  const activeDescription =
    description ||
    "Hokiindo menyediakan solusi produk tambahan untuk melengkapi infrastruktur kelistrikan Anda dengan standar kualitas global.";

  const activeBusbarHeading = busbarHeading || "Busbar APS";
  const activeBusbarDescription =
    busbarDescription ||
    "Solusi distribusi daya berkapasitas tinggi yang dirancang dengan teknik presisi. Sistem Busbar APS menawarkan efisiensi ruang maksimal, instalasi cepat, dan kemudahan maintenance jangka panjang.";

  const activeLightHeading = lightHeading || "Lampu Proyek Portable G-Comin";
  const activeLightDescription =
    lightDescription ||
    "Pencahayaan portabel dengan daya tahan ekstrem untuk lingkungan kerja yang menantang. Menghadirkan intensitas cahaya tinggi dengan efisiensi energi optimal.";

  const finalBusbarHero =
    typeof activeBusbarHero === "object" && activeBusbarHero
      ? activeBusbarHero.url || ""
      : activeBusbarHero;

  const finalLightHero =
    typeof activeLightHero === "object" && activeLightHero
      ? activeLightHero.url || ""
      : activeLightHero;

  return (
    <section
      id="ecosystem"
      className="py-24 md:py-32 bg-[#f2f3ff] px-5 md:px-12"
      aria-labelledby="ecosystem-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#dae2fd] text-primary font-semibold text-sm mb-6">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px" }}
            >
              hub
            </span>
            {activeBadge}
          </div>
          <h2
            id="ecosystem-heading"
            className="font-bold text-[36px] md:text-[48px] leading-tight text-[#131b2e] mb-5"
          >
            {activeHeading}
          </h2>
          <p className="text-[#603e39] text-lg max-w-3xl mx-auto leading-relaxed">
            {activeDescription}
          </p>
        </div>

        {/* ===== Busbar APS Sub-Section ===== */}
        <div className="mb-24 md:mb-32">
          {/* Busbar Hero Row */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-primary font-semibold text-sm mb-6 border border-[#dae2fd]">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "16px" }}
                >
                  bolt
                </span>
                <span className="uppercase tracking-wider">Power Infrastructure</span>
              </div>
              <h3 className="font-bold text-[32px] md:text-[40px] leading-tight text-[#131b2e] mb-5">
                {activeBusbarHeading}
              </h3>
              <p className="text-[#603e39] text-lg leading-relaxed mb-8">
                {activeBusbarDescription}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["Kapasitas Tinggi", "Instalasi Cepat", "IP65 Rated", "Low Loss"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-white border border-[#dae2fd] text-sm font-semibold text-[#603e39]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/products/busbar-aps"
                id="busbar-cta-konsultasi"
                className="btn-primary"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  support_agent
                </span>
                Konsultasi Teknis
              </Link>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="rounded-[3rem] overflow-hidden premium-shadow group aspect-video">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={finalBusbarHero}
                  alt="Busbar APS system"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </div>
          </div>

          {/* Busbar Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeBusbars.map((p, i) => (
                <ProductCard key={p.id || `busbar-${i}`} product={p} />
              ))}
            </div>
            {/* CTA card */}
            <Link
              href="/products/busbar-aps"
              id="busbar-view-catalog"
              className="bg-primary rounded-[2rem] flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:bg-primary/90 transition-all premium-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span
                  className="material-symbols-outlined text-white"
                  style={{ fontSize: "32px" }}
                >
                  add
                </span>
              </div>
              <p className="text-white font-bold text-lg leading-tight">
                Lihat Katalog
              </p>
              <p className="text-white/70 text-xs mt-2">APS Series lengkap</p>
            </Link>
          </div>
        </div>

        {/* ===== Lampu Proyek Portable Sub-Section ===== */}
        <div>
          {/* Lights Hero Row (reversed) */}
          <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center mb-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-primary font-semibold text-sm mb-6 border border-[#dae2fd]">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "16px" }}
                >
                  lightbulb
                </span>
                <span className="uppercase tracking-wider">Industrial Illumination</span>
              </div>
              <h3 className="font-bold text-[32px] md:text-[40px] leading-tight text-[#131b2e] mb-5">
                {activeLightHeading}
              </h3>
              <p className="text-[#603e39] text-lg leading-relaxed mb-8">
                {activeLightDescription}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["Tahan Benturan", "Waterproof IP67", "LED Efisien", "Baterai Long-Life"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-white border border-[#dae2fd] text-sm font-semibold text-[#603e39]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/products/g-comin"
                id="light-cta-teknologi"
                className="btn-primary"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  science
                </span>
                Pelajari Teknologi
              </Link>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="rounded-[3rem] overflow-hidden premium-shadow group aspect-video">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={finalLightHero}
                  alt="G-Comin portable project lights"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </div>
          </div>

          {/* Lights Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              {activeLights.map((p, i) => (
                <div
                  key={p.id || `light-${i}`}
                  className="bg-white p-8 rounded-[2.5rem] card-shadow hover:card-shadow-hover transition-all flex flex-col group"
                >
                  <div className="aspect-square mb-6 overflow-hidden rounded-3xl bg-[#f2f3ff] flex items-center justify-center">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={typeof p.image === 'object' && p.image ? p.image.url || "" : p.image}
                        alt={p.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-3"
                      />
                    ) : (
                      <span
                        className="material-symbols-outlined text-[#dae2fd] group-hover:text-primary/30 transition-colors"
                        style={{ fontSize: "64px" }}
                      >
                        flashlight_on
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xl mb-2 text-[#131b2e] group-hover:text-primary transition-colors">
                    {p.name}
                  </h4>
                  <p className="text-[#603e39] text-sm leading-relaxed flex-grow">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
            {/* CTA card */}
            <Link
              href="/products/g-comin"
              id="light-view-catalog"
              className="bg-primary rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:bg-primary/90 transition-all premium-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span
                  className="material-symbols-outlined text-white"
                  style={{ fontSize: "32px" }}
                >
                  add
                </span>
              </div>
              <p className="text-white font-bold text-lg leading-tight">
                Lihat Katalog
              </p>
              <p className="text-white/70 text-xs mt-2">G-Comin Series</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
