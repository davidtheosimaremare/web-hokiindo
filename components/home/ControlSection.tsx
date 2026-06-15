import Link from "next/link";

export interface ControlProduct {
  id?: string;
  name: string;
  description: string;
  image: string | { url?: string };
  link?: string;
}

interface ControlSectionProps {
  heading?: string;
  description?: string;
  heroImage?: string | { url?: string; mimeType?: string };
  catalogLink?: string;
  contactLink?: string;
  viewAllLink?: string;
  viewAllCount?: string | number;
  products?: ControlProduct[];
}

const defaultProducts: ControlProduct[] = [
  {
    id: "contactor",
    name: "Contactor",
    description: "Kontaktor industri untuk switching beban daya besar secara otomatis dan handal.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    id: "overload-relay",
    name: "Overload Relay",
    description: "Relai proteksi motor dari kondisi overload untuk keamanan sistem jangka panjang.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
  },
  {
    id: "soft-starter",
    name: "Soft Starter",
    description: "Kontrol start motor bertahap untuk mengurangi arus inrush dan perlindungan mekanikal.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80",
  },
  {
    id: "vfd",
    name: "VFD / Inverter",
    description: "Variable Frequency Drive: Kendali kecepatan motor presisi untuk efisiensi energi optimal.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80",
  },
];

const defaultHeroImage =
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80";

export default function ControlSection({
  heading,
  description,
  products,
  heroImage,
  catalogLink,
  contactLink,
  viewAllLink,
  viewAllCount,
}: ControlSectionProps) {
  const activeProducts = products && products.length > 0 ? products : defaultProducts;
  const activeHeroImage = heroImage || defaultHeroImage;
  const activeHeading = heading || "Solusi Kontrol Siemens";
  const activeDescription =
    description ||
    "Rangkaian produk kontrol motor dan sistem Siemens yang menghadirkan presisi, efisiensi energi, dan fleksibilitas operasional untuk berbagai kebutuhan industri modern.";

  const finalHeroSrc =
    typeof activeHeroImage === "object" && activeHeroImage
      ? activeHeroImage.url || ""
      : activeHeroImage;

  const isVideo = typeof activeHeroImage === "object" && activeHeroImage && activeHeroImage.mimeType
    ? activeHeroImage.mimeType.startsWith("video/")
    : typeof finalHeroSrc === "string" && finalHeroSrc.match(/\.(mp4|webm|ogg)$/i);

  return (
    <section
      id="siemens-control"
      className="py-24 md:py-32 bg-[#f2f3ff] px-5 md:px-12 border-b border-white"
      aria-labelledby="control-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top: Text + Hero Image (reversed layout for visual variety) */}
        <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center mb-16 md:mb-24">
          {/* Text Block */}
          <div className="lg:w-1/2">
            <h2
              id="control-heading"
              className="font-bold text-[28px] md:text-[36px] leading-tight text-[#131b2e] mb-6"
            >
              {activeHeading}
            </h2>
            <p className="text-[#603e39] text-base leading-relaxed mb-8 max-w-xl">
              {activeDescription}
            </p>



            <div className="flex flex-wrap gap-4">
              <Link
                href={catalogLink || "/products/siemens-control"}
                id="control-cta-catalog"
                className="btn-primary"
              >
                Lihat Katalog
              </Link>
              <Link
                href={contactLink || "/contact"}
                id="control-cta-specialist"
                className="btn-outline"
              >
                Hubungi Spesialis
              </Link>
            </div>
          </div>

          {/* Hero Image / Video */}
          <div className="lg:w-1/2 w-full">
            <div className="relative aspect-video rounded-[3rem] overflow-hidden premium-shadow group">
              {isVideo ? (
                <video
                  src={finalHeroSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={finalHeroSrc}
                  alt="Siemens control products — contactor, VFD, soft starter"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {activeProducts.map((product, i) => (
            <Link
              href={product.link || `/products/${product.id || 'siemens-control'}`}
              key={product.id || `prod-${i}`}
              className="group bg-white overflow-hidden rounded-[2rem] border border-[#eaedff] hover:border-primary transition-all duration-300 card-shadow hover:card-shadow-hover"
            >
              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-[#faf8ff] p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={typeof product.image === 'object' && product.image ? product.image.url || "" : product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Product Info */}
              <div className="p-5 pt-0">
                <h3 className="font-bold text-xl text-[#131b2e] mb-1.5 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-[#603e39] text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}

          {/* "Lihat Semua" CTA Card */}
          <Link
            href={viewAllLink || "/products/siemens-control"}
            id="control-view-all"
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
              Lihat Semua Produk
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
