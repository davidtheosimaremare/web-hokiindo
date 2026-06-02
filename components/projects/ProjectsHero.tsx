// Projects Hero — light bg image opacity 20% + gradient + big heading

interface ProjectsHeroProps {
  heroData?: {
    title?: string;
    titleHighlight?: string;
    description?: string;
    backgroundImage?: string | { url?: string } | null;
  };
}

export default function ProjectsHero({ heroData }: ProjectsHeroProps) {
  const title = heroData?.title || "Membangun Kepercayaan Melalui";
  const titleHighlight = heroData?.titleHighlight || "Proyek Strategis";
  const description =
    heroData?.description ||
    "Dedikasi kami dalam menyediakan solusi kelistrikan terpercaya di seluruh pelosok Indonesia. Menghadirkan teknologi presisi untuk masa depan industri.";

  const bgImg =
    typeof heroData?.backgroundImage === "object" &&
    heroData?.backgroundImage !== null &&
    "url" in heroData.backgroundImage
      ? heroData.backgroundImage.url || ""
      : typeof heroData?.backgroundImage === "string"
      ? heroData.backgroundImage
      : "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80";

  return (
    <section className="relative pt-32 pb-20 px-5 md:px-10 min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgImg}
          alt="Industrial electrical installation"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf8ff] via-[#faf8ff]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <h1 className="font-bold text-[48px] md:text-[64px] leading-[1.1] tracking-tight text-[#131b2e]">
          {title}{" "}
          <span className="text-primary">{titleHighlight}</span>
        </h1>
        <p className="text-lg text-[#603e39] max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
