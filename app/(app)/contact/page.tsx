import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { getPayload } from "payload";
import configPromise from "@/payload.config";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hubungi Kami | PT Hokiindo Raya",
  description:
    "Konsultasi teknis, permintaan penawaran, atau pertanyaan produk Siemens — tim ahli PT Hokiindo Raya siap membantu Anda.",
  openGraph: {
    title: "Hubungi Kami | PT Hokiindo Raya",
    description: "Dapatkan solusi rekayasa presisi untuk kebutuhan industrial Anda.",
    type: "website",
    locale: "id_ID",
  },
};

export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise });

  // Fetch profile (address, email, phone) + page global
  const [profile, pageData] = await Promise.all([
    payload.findGlobal({ slug: "profile" }),
    payload.findGlobal({ slug: "contact-page", depth: 1 }),
  ]);

  // ── Hero copy ──────────────────────────────────────────────────────
  const heroBadge   = pageData?.hero?.badge    || "Siemens Authorized Partner";
  const heroTitle   = pageData?.hero?.title    || "Hubungi Kami";
  const heroSub     = pageData?.hero?.subtitle ||
    "Konsultasi teknis, pertanyaan produk, atau dukungan proyek. Tim ahli kami siap memberikan solusi rekayasa presisi untuk kebutuhan industrial Anda.";
  const heroHighlights =
    pageData?.hero?.highlights && pageData.hero.highlights.length > 0
      ? pageData.hero.highlights
      : [
          { icon: "schedule",       label: "Respon < 24 jam" },
          { icon: "support_agent",  label: "Dukungan Teknis Berdedikasi" },
          { icon: "language",       label: "Layanan Seluruh Indonesia" },
        ];

  // ── Form copy ──────────────────────────────────────────────────────
  const formTitle = pageData?.form?.title       || "Minta Penawaran";
  const formDesc  = pageData?.form?.description ||
    "Isi form di bawah ini untuk mendapatkan estimasi harga atau detail produk lebih lanjut. Kami akan merespons dalam 1 x 24 jam kerja.";

  // ── CTA copy ───────────────────────────────────────────────────────
  const ctaEyebrow = pageData?.cta?.eyebrow || "Butuh Bantuan Segera?";
  const ctaTitle   = pageData?.cta?.title   || "Hubungi Sales Engineer Kami Langsung";

  // ── Contact cards (from Profile + extraCards) ──────────────────────
  const contactEmail = profile?.email       || "info@hokiindo.co.id";
  const contactWa    = profile?.nomorHp     || "";
  const contactPhone = profile?.nomorTelepon || "";
  const alamat       = profile?.alamat      || "Gedung Hokiindo Tower Lt. 8\nJl. Jend. Sudirman Kav. 12-14\nJakarta Pusat, 10220\nIndonesia";
  const mapHtml      = profile?.embedPeta   || `<iframe
    title="Lokasi PT Hokiindo Raya"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.419!2d106.8228!3d-6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNyJTIDEwNsKwNDknMjIuMSJF!5e0!3m2!1sid!2sid!4v1700000000000"
    width="100%" height="100%" style="border:0;" allowFullScreen loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"></iframe>`;

  const coreCards = [
    {
      icon: "location_on",
      title: "Kantor Pusat",
      lines: [alamat],
      links: [],
    },
    {
      icon: "mail",
      title: "Email Profesional",
      lines: [],
      links: [{ label: contactEmail, href: `mailto:${contactEmail}` }],
    },
    ...(contactWa || contactPhone
      ? [{
          icon: "chat",
          title: "WhatsApp / Telepon",
          lines: [],
          links: [
            ...(contactWa    ? [{ label: `${contactWa} (Sales)`, href: `https://wa.me/${contactWa.replace(/[^0-9]/g, "")}` }] : []),
            ...(contactPhone ? [{ label: `${contactPhone} (Office)`, href: `tel:${contactPhone.replace(/[^0-9+]/g, "")}` }]   : []),
          ],
        }]
      : []),
  ];

  const extraCards = (pageData?.extraCards || []).map((c: any) => ({
    icon: c.icon,
    title: c.title,
    lines: c.lines ? [c.lines] : [],
    links: c.linkHref ? [{ label: c.linkLabel || c.linkHref, href: c.linkHref }] : [],
  }));

  const allCards = [...coreCards, ...extraCards];

  return (
    <>
      <main className="flex-grow pt-[116px]">

        {/* ===== HERO ===== */}
        <section className="relative w-full px-5 md:px-12 py-20 md:py-28 flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(188,1,0,0.06) 0%, transparent 70%), #f2f3ff",
            }}
          />
          {/* Dot pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, #131b2e 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 max-w-[1440px] mx-auto w-full text-center flex flex-col items-center gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#ebbbb4]/40 shadow-sm">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontSize: "16px", fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
                {heroBadge}
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-bold text-[48px] md:text-[64px] leading-[1.05] tracking-tight text-[#131b2e]">
              {heroTitle}
            </h1>

            {/* Sub */}
            <p className="text-lg text-[#603e39] max-w-2xl leading-relaxed">
              {heroSub}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-2">
              {heroHighlights.map((s: any) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 text-sm text-[#603e39] font-semibold bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-[#dae2fd] shadow-sm"
                >
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontSize: "16px" }}
                  >
                    {s.icon}
                  </span>
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SPLIT LAYOUT: Cards + Form ===== */}
        <section className="w-full max-w-[1440px] mx-auto px-5 md:px-12 pb-20 md:pb-28">
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* LEFT: Contact Cards + Map */}
            <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col gap-5">
              {allCards.map((card) => (
                <div
                  key={card.title}
                  className="group bg-white rounded-[2rem] p-7 border border-[#e8ecff] hover:border-primary/20 hover:shadow-[0_8px_32px_rgba(188,1,0,0.07)] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-[#f2f3ff] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#eaedff] transition-colors duration-300">
                      <span
                        className="material-symbols-outlined text-primary"
                        style={{ fontSize: "20px", fontVariationSettings: "'FILL' 1" }}
                      >
                        {card.icon}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-[15px] text-[#131b2e] mb-2">{card.title}</h3>
                      {card.lines.length > 0 && (
                        <p className="text-[#603e39] text-sm leading-7 whitespace-pre-line">
                          {card.lines.join("\n")}
                        </p>
                      )}
                      {card.links.map((link: any) => (
                        <a
                          key={link.href}
                          href={link.href}
                          className="block text-[#603e39] text-sm hover:text-primary transition-colors font-semibold mb-1"
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Map */}
              <div
                className="rounded-[2rem] overflow-hidden border border-[#e8ecff] aspect-[4/3] relative [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:grayscale hover:[&>iframe]:grayscale-0 [&>iframe]:transition-all [&>iframe]:duration-500 shadow-sm"
                dangerouslySetInnerHTML={{ __html: mapHtml }}
              />
            </div>

            {/* RIGHT: Quote Form */}
            <div className="flex-1 bg-white rounded-[2rem] p-8 md:p-10 border border-[#e8ecff] shadow-sm">
              {/* Form header */}
              <div className="mb-8 pb-6 border-b border-[#f0f2ff]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2f3ff] text-primary text-xs font-bold mb-4 border border-[#dae2fd]">
                  <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>
                    request_quote
                  </span>
                  Formulir Permintaan
                </div>
                <h2 className="font-bold text-[26px] md:text-[32px] text-[#131b2e] mb-2">
                  {formTitle}
                </h2>
                <p className="text-[#603e39] text-sm leading-relaxed">
                  {formDesc}
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>

        {/* ===== BOTTOM CTA STRIP ===== */}
        <section className="relative bg-[#0d1120] py-16 px-5 md:px-12 overflow-hidden">
          {/* Decorative */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 15% 50%, rgba(188,1,0,0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 50%, rgba(99,102,241,0.08) 0%, transparent 55%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
                {ctaEyebrow}
              </p>
              <h2 className="font-bold text-[22px] md:text-[30px] text-white leading-tight">
                {ctaTitle}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              {contactWa && (
                <a
                  href={`https://wa.me/${contactWa.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-wa-cta"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3.5 rounded-full hover:shadow-[0_0_24px_rgba(37,211,102,0.4)] hover:scale-[1.02] transition-all duration-300"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>chat</span>
                  Chat WhatsApp
                </a>
              )}
              <a
                href={`mailto:${contactEmail}`}
                id="contact-email-cta"
                className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3.5 rounded-full border border-white/20 hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>mail</span>
                Kirim Email
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
