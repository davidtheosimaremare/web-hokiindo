import Link from "next/link";

export interface SiemensProduct {
  id?: string;
  name: string;
  description: string;
  image: string | { url?: string };
}

interface SiemensSectionProps {
  heading?: string;
  description?: string;
  heroImage?: string | { url?: string };
  products?: SiemensProduct[];
}

const defaultProducts: SiemensProduct[] = [
  {
    id: "acb",
    name: "ACB",
    description: "Air Circuit Breakers: Solusi perlindungan sirkuit daya tinggi yang tangguh dan andal.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80",
  },
  {
    id: "mccb",
    name: "MCCB",
    description: "Molded Case Circuit Breakers: Perlindungan handal untuk aplikasi industri menengah.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    id: "mcb",
    name: "MCB",
    description: "Miniature Circuit Breakers: Kontrol presisi untuk sirkuit yang lebih kecil dan aman.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
  },
  {
    id: "rcbo",
    name: "RCBO",
    description: "Residual Current Breaker: Perlindungan keselamatan komprehensif untuk manusia dan peralatan.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80",
  },
];

const defaultHeroImage =
  "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=900&q=80";

export default function SiemensSection({
  heading,
  description,
  products,
  heroImage,
}: SiemensSectionProps) {
  const activeProducts = products && products.length > 0 ? products : defaultProducts;
  const activeHeroImage = heroImage || defaultHeroImage;
  const activeHeading = heading || "Solusi Proteksi Siemens";
  const activeDescription =
    description ||
    "Menghadirkan keandalan tinggi dan teknik modern untuk memastikan keamanan maksimal pada infrastruktur industri Anda. Produk Siemens dirancang untuk efisiensi dan performa tanpa kompromi.";

  const finalHeroSrc =
    typeof activeHeroImage === "object" && activeHeroImage
      ? activeHeroImage.url || ""
      : activeHeroImage;

  return (
    <section
      id="siemens-products"
      className="py-24 md:py-32 bg-white px-5 md:px-12 border-b border-[#f2f3ff]"
      aria-labelledby="siemens-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Top: Text + Hero Image */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-16 md:mb-24">
          {/* Text Block */}
          <div className="lg:w-1/2">
            <h2
              id="siemens-heading"
              className="font-bold text-[36px] md:text-[48px] leading-tight text-[#131b2e] mb-6"
            >
              {activeHeading}
            </h2>
            <p className="text-[#603e39] text-lg leading-relaxed mb-8 max-w-xl">
              {activeDescription}
            </p>

            {/* Stats Row */}
            <div className="flex gap-8 mb-10">
              {[
                { value: "500+", label: "Produk tersedia" },
                { value: "15+", label: "Tahun pengalaman" },
                { value: "99.9%", label: "Keandalan sistem" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-bold text-2xl text-primary">{stat.value}</span>
                  <span className="text-sm text-[#603e39] mt-1">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products/siemens-protection"
                id="siemens-cta-catalog"
                className="btn-primary"
              >
                Lihat Katalog
              </Link>
              <Link
                href="/contact"
                id="siemens-cta-specialist"
                className="btn-outline"
              >
                Hubungi Spesialis
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:w-1/2 w-full">
            <div className="relative aspect-video rounded-[3rem] overflow-hidden premium-shadow group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={finalHeroSrc}
                alt="Siemens electrical protection products"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              {/* Siemens Overlay Badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl">
                <div className="w-10 h-10 bg-[#00646e] rounded-xl flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-white"
                    style={{ fontSize: "20px" }}
                  >
                    verified_user
                  </span>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#603e39] uppercase tracking-wider">Authorized</div>
                  <div className="text-sm font-bold text-[#00646e]">Siemens Partner</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {activeProducts.map((product, i) => (
            <Link
              href={`/products/${product.id || 'siemens-protection'}`}
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
                <p className="text-[#603e39] text-sm line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}

          {/* "Lihat Semua" CTA Card */}
          <Link
            href="/products/siemens-protection"
            id="siemens-view-all"
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
            <p className="text-white/70 text-xs mt-2">500+ item tersedia</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
