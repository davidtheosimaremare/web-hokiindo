interface AboutTaglineProps {
  title?: string;
  description?: string;
}

export default function AboutTagline({
  title,
  description,
}: AboutTaglineProps) {
  const activeTitle = title || "Sustainable Solutions, Built on Trust.";
  const activeDescription =
    description ||
    "Setiap produk yang kami hadirkan adalah wujud komitmen terhadap kualitas, keandalan, dan kepercayaan mitra industri Indonesia.";

  // Split title if it contains "Built on Trust." to keep the styled block
  const hasTrust = activeTitle.includes("Built on Trust.");
  const displayTitle = hasTrust ? (
    <>
      {activeTitle.replace("Built on Trust.", "").trim()}
      <br />
      <span className="text-primary">Built on Trust.</span>
    </>
  ) : (
    activeTitle
  );

  return (
    <section className="py-20 px-5 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] p-10 md:p-14 text-center bg-white/80 border border-white/50 backdrop-blur-lg card-shadow">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

          <h2 className="relative z-10 font-bold text-[32px] md:text-[44px] leading-tight text-[#131b2e]">
            {displayTitle}
          </h2>
          <p className="relative z-10 mt-6 text-lg text-[#5c5f61] max-w-xl mx-auto leading-relaxed">
            {activeDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
