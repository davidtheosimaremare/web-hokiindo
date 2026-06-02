interface AboutHeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string | { url?: string };
}

const defaultBg = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=80";

export default function AboutHero({
  title,
  subtitle,
  backgroundImage,
}: AboutHeroProps) {
  const activeTitle = title || "Membangun Masa Depan Kelistrikan Indonesia";
  const activeSubtitle =
    subtitle ||
    "Menghubungkan inovasi global dengan kebutuhan industri lokal melalui presisi dan dedikasi tanpa kompromi.";
  const activeBg =
    typeof backgroundImage === "object" && backgroundImage
      ? backgroundImage.url || ""
      : backgroundImage || defaultBg;

  // Split title if it contains "Kelistrikan Indonesia" to keep the block style
  const hasKelistrikan = activeTitle.includes("Kelistrikan Indonesia");
  const displayTitle = hasKelistrikan ? (
    <>
      {activeTitle.replace("Kelistrikan Indonesia", "").trim()}{" "}
      <span className="text-primary block mt-2">Kelistrikan Indonesia</span>
    </>
  ) : (
    activeTitle
  );

  return (
    <section className="relative min-h-[580px] flex items-center justify-center px-5 md:px-10 mt-8">
      {/* Background image with grayscale + gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl mx-5 md:mx-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeBg}
          alt="Industrial facility background"
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(100%)", mixBlendMode: "multiply" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6 py-24">
        <h1 className="font-bold text-[48px] md:text-[64px] leading-[1.1] tracking-tight text-[#131b2e]">
          {displayTitle}
        </h1>
        <div className="inline-block mt-6">
          <p className="text-lg text-[#5c5f61] leading-relaxed max-w-2xl mx-auto backdrop-blur-sm px-6 py-4 rounded-xl bg-white/80 shadow-lg">
            {activeSubtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
