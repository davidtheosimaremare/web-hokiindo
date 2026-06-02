import Link from "next/link";

interface ProductEcosystemProps {
  badge?: string;
  heading?: string;
  description?: string;
  siemensLogo?: string | { url?: string };
  siemensBadge?: string;
  siemensTitle?: string;
  siemensDescription?: string;
  siemensImage?: string | { url?: string };
  gcominLogo?: string | { url?: string };
  gcominBadge?: string;
  gcominTitle?: string;
  gcominDescription?: string;
  gcominImage?: string | { url?: string };
  apsLogo?: string | { url?: string };
  apsBadge?: string;
  apsTitle?: string;
  apsDescription?: string;
  apsImage?: string | { url?: string };
}

const defaultSiemensImg = "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80";
const defaultGcominImg = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=80";
const defaultApsImg = "https://images.unsplash.com/photo-1621902736256-e5c0b28e70a5?w=700&q=80";

export default function ProductEcosystem({
  badge,
  heading,
  description,
  siemensLogo,
  siemensBadge,
  siemensTitle,
  siemensDescription,
  siemensImage,
  gcominLogo,
  gcominBadge,
  gcominTitle,
  gcominDescription,
  gcominImage,
  apsLogo,
  apsBadge,
  apsTitle,
  apsDescription,
  apsImage,
}: ProductEcosystemProps) {
  const activeBadge = badge || "Ekosistem Produk";
  const activeHeading = heading || "Solusi Produk Kami";
  const activeDescription =
    description ||
    "Kami menghadirkan teknologi mutakhir untuk mendukung efisiensi dan keamanan infrastruktur industri Anda.";

  const activeSiemensLogoUrl =
    typeof siemensLogo === "object" && siemensLogo
      ? siemensLogo.url || ""
      : siemensLogo || "";
  const activeSiemensBadge = siemensBadge || "Primary Partner";
  const activeSiemensTitle = siemensTitle || "Authorized Siemens Solutions";
  const activeSiemensDescription =
    siemensDescription ||
    "Menyediakan rangkaian lengkap perangkat otomasi dan distribusi tenaga listrik Siemens dengan dukungan teknis bersertifikasi untuk keandalan maksimal operasional Anda.";
  const activeSiemensImg =
    typeof siemensImage === "object" && siemensImage
      ? siemensImage.url || ""
      : siemensImage || defaultSiemensImg;

  const activeGcominLogoUrl =
    typeof gcominLogo === "object" && gcominLogo
      ? gcominLogo.url || ""
      : gcominLogo || "";
  const activeGcominBadge = gcominBadge || "G-COMIN";
  const activeGcominTitle = gcominTitle || "Lampu Proyek Portable";
  const activeGcominDescription =
    gcominDescription ||
    "Solusi pencahayaan industrial yang tangguh dan mudah dipindahkan, dirancang khusus untuk area kerja ekstrem dengan daya tahan tinggi.";
  const activeGcominImg =
    typeof gcominImage === "object" && gcominImage
      ? gcominImage.url || ""
      : gcominImage || defaultGcominImg;

  const activeApsLogoUrl =
    typeof apsLogo === "object" && apsLogo
      ? apsLogo.url || ""
      : apsLogo || "";
  const activeApsBadge = apsBadge || "APS";
  const activeApsTitle = apsTitle || "Busbar APS";
  const activeApsDescription =
    apsDescription ||
    "Sistem distribusi tenaga listrik busway yang efisien dan fleksibel, meminimalkan penggunaan kabel serta memberikan kemudahan dalam pemeliharaan.";
  const activeApsImg =
    typeof apsImage === "object" && apsImage
      ? apsImage.url || ""
      : apsImage || defaultApsImg;

  return (
    <section
      id="solusi-produk"
      className="py-20 px-5 md:px-10 bg-white"
      aria-labelledby="ecosystem-heading"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2f3ff] text-primary font-semibold text-sm mb-4 border border-[#dae2fd]">
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              category
            </span>
            {activeBadge}
          </div>
          <h2
            id="ecosystem-heading"
            className="font-bold text-[32px] md:text-[40px] text-[#131b2e] mb-4"
          >
            {activeHeading}
          </h2>
          <p className="text-[#603e39] text-lg max-w-2xl mx-auto">
            {activeDescription}
          </p>
        </div>

        {/* Top Level: Siemens — wide horizontal card */}
        <div className="w-full bg-white rounded-[2rem] overflow-hidden border border-black/5 card-shadow hover:card-shadow-hover transition-all duration-500 group relative z-20">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-[#f2f3ff]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeSiemensImg}
                alt="Siemens Solutions"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Content */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-5">
              {activeSiemensLogoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={activeSiemensLogoUrl} alt="Siemens" className="h-8 md:h-10 w-auto object-contain self-start" />
              ) : (
                <span className="inline-flex w-fit px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                  {activeSiemensBadge}
                </span>
              )}
              <h3 className="font-bold text-2xl md:text-3xl text-[#131b2e] leading-snug">
                {activeSiemensTitle}
              </h3>
              <p className="text-[#5c5f61] text-base leading-relaxed">
                {activeSiemensDescription}
              </p>
              <Link
                href="/products/siemens-protection"
                id="about-siemens-cta"
                className="btn-primary w-fit"
              >
                Lihat Katalog
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Connecting Lines (desktop only) */}
        <div className="hidden md:block w-full max-w-2xl relative h-24 z-10 -mt-1">
          {/* Vertical stem */}
          <div className="absolute top-0 left-1/2 w-px h-12 bg-gradient-to-b from-primary/30 to-[#dae2fd]/60 -translate-x-1/2" />
          {/* Horizontal branch */}
          <div className="absolute top-12 left-1/4 right-1/4 h-px bg-[#dae2fd]/60" />
          {/* Left drop */}
          <div className="absolute top-12 left-1/4 w-px h-12 bg-gradient-to-b from-[#dae2fd]/60 to-[#dae2fd]/20 -translate-x-1/2" />
          {/* Right drop */}
          <div className="absolute top-12 right-1/4 w-px h-12 bg-gradient-to-b from-[#dae2fd]/60 to-[#dae2fd]/20 translate-x-1/2" />
        </div>

        {/* Mobile divider */}
        <div className="md:hidden h-10 w-px bg-gradient-to-b from-primary/20 to-[#dae2fd]/20 my-3 z-10" />

        {/* Second Level: G-Comin + APS */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
          {/* Lampu Proyek Portable (G-COMIN) */}
          <div className="bg-white rounded-[2rem] overflow-hidden border border-black/5 card-shadow hover:card-shadow-hover transition-all duration-500 group flex flex-col">
            <div className="h-56 relative overflow-hidden bg-[#f2f3ff]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeGcominImg}
                alt="Lampu Proyek Portable G-Comin"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                {activeGcominLogoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={activeGcominLogoUrl} alt="G-Comin" className="h-8 w-auto object-contain bg-white/90 p-1 rounded-md border border-black/5 backdrop-blur-md" />
                ) : (
                  <span className="bg-white/90 backdrop-blur-md text-[#33] text-xs font-bold px-3 py-1 rounded-full border border-black/5">
                    {activeGcominBadge}
                  </span>
                )}
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow gap-4">
              <h3 className="font-bold text-xl text-[#131b2e]">
                {activeGcominTitle}
              </h3>
              <p className="text-[#5c5f61] text-sm leading-relaxed flex-grow">
                {activeGcominDescription}
              </p>
              <Link
                href="/products/g-comin"
                id="about-gcomin-cta"
                className="btn-primary w-fit text-sm py-2.5 px-6"
              >
                Lihat Katalog
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          {/* Busbar APS */}
          <div className="bg-white rounded-[2rem] overflow-hidden border border-black/5 card-shadow hover:card-shadow-hover transition-all duration-500 group flex flex-col">
            <div className="h-56 relative overflow-hidden bg-[#f2f3ff]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeApsImg}
                alt="Busbar APS"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                {activeApsLogoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={activeApsLogoUrl} alt="APS" className="h-8 w-auto object-contain bg-white/90 p-1 rounded-md border border-black/5 backdrop-blur-md" />
                ) : (
                  <span className="bg-white/90 backdrop-blur-md text-[#33] text-xs font-bold px-3 py-1 rounded-full border border-black/5">
                    {activeApsBadge}
                  </span>
                )}
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow gap-4">
              <h3 className="font-bold text-xl text-[#131b2e]">{activeApsTitle}</h3>
              <p className="text-[#5c5f61] text-sm leading-relaxed flex-grow">
                {activeApsDescription}
              </p>
              <Link
                href="/products/busbar-aps"
                id="about-aps-cta"
                className="btn-primary w-fit text-sm py-2.5 px-6"
              >
                Lihat Katalog
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

