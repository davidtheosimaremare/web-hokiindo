import Link from "next/link";

const services = [
  {
    id: "konsultasi",
    icon: "support_agent",
    title: "Konsultasi Produk",
    description:
      "Tim insinyur berpengalaman kami membantu Anda memilih produk yang paling tepat sesuai spesifikasi teknis dan kebutuhan anggaran proyek Anda.",
  },
  {
    id: "installing",
    icon: "construction",
    title: "Installing",
    description:
      "Layanan instalasi profesional dengan standar keselamatan ketat, memastikan setiap produk terpasang dengan benar dan optimal sesuai kondisi lapangan.",
  },
  {
    id: "commissioning",
    icon: "settings_suggest",
    title: "Commissioning",
    description:
      "Pengujian sistem menyeluruh setelah instalasi untuk memverifikasi performa dan keandalan setiap komponen sebelum diserahterimakan.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-[#131b2e] px-5 md:px-12 relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(188,1,0,0.12) 0%, transparent 60%), radial-gradient(ellipse at 10% 80%, rgba(0,100,110,0.1) 0%, transparent 50%)",
        }}
      />
      <div className="absolute inset-0 dot-grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div className="lg:w-2/5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/70 font-semibold text-sm mb-6 border border-white/10">
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                handshake
              </span>
              Layanan End-to-End
            </div>
            <h2
              id="services-heading"
              className="font-bold text-[36px] md:text-[48px] leading-tight text-white mb-6"
            >
              Lebih dari Sekadar Distributor
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Hokiindo hadir sebagai mitra teknis jangka panjang Anda — dari pemilihan produk yang tepat, instalasi profesional, hingga komisioning sistem yang tervalidasi.
            </p>
            <Link
              href="/contact"
              id="services-cta-contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm tracking-wide px-6 py-3.5 rounded-full hover:scale-[1.02] hover:shadow-xl transition-all duration-200"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                send
              </span>
              Diskusikan Kebutuhan Anda
            </Link>
          </div>

          {/* Right: Service Cards */}
          <div className="lg:w-3/5 flex flex-col gap-5 w-full">
            {services.map((service, i) => (
              <div
                key={service.id}
                className="flex items-start gap-5 p-6 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontSize: "24px" }}
                  >
                    {service.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <span
                  className="material-symbols-outlined text-white/20 group-hover:text-white/40 transition-colors ml-auto flex-shrink-0"
                  style={{ fontSize: "20px" }}
                >
                  arrow_forward_ios
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
