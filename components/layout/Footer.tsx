import Link from "next/link";

const productLinks = [
  { label: "Siemens Protection", href: "/products/siemens-protection" },
  { label: "Siemens Control Products", href: "/products/siemens-control" },
  { label: "Busbar APS", href: "/products/busbar-aps" },
  { label: "Lampu Proyek Portable", href: "/products/g-comin" },
];

const companyLinks = [
  { label: "Tentang Kami", href: "/about" },
  { label: "Proyek & Portofolio", href: "/projects" },
  { label: "Karir", href: "/careers" },
  { label: "Berita & Artikel", href: "/news" },
];

export default function Footer({ profile }: { profile?: any }) {
  const social = profile?.sosialMedia || {};

  return (
    <footer className="w-full border-t border-black/5 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Column 1: Company Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 w-fit">
              {profile?.logo?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.logo.url} alt={profile.namaPerusahaan || "Logo"} className="h-7 md:h-8 w-auto object-contain" />
              ) : (
                <>
                  <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-sm leading-none">HR</span>
                  </div>
                  <span className="font-bold text-xl text-primary tracking-tight">
                    {profile?.namaPerusahaan || "PT Hokiindo Raya"}
                  </span>
                </>
              )}
            </Link>

            <p className="text-[#603e39] text-sm leading-relaxed max-w-xs whitespace-pre-line">
              {profile?.deskripsiPerusahaan || "Penyedia solusi engineering presisi dan distributor resmi perangkat otomasi industri terkemuka di Indonesia."}
            </p>

            <div className="flex flex-col gap-3 text-sm text-[#603e39]">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: "20px", marginTop: "1px" }}>
                  location_on
                </span>
                <span className="whitespace-pre-line">
                  {profile?.alamat || "Jl. Industri Raya No. 45, Kawasan Industri Jababeka, Cikarang, Bekasi 17530"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: "20px" }}>
                  mail
                </span>
                <a href={`mailto:${profile?.email || "info@hokiindo.co.id"}`} className="hover:text-primary transition-colors">
                  {profile?.email || "info@hokiindo.co.id"}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: "20px" }}>
                  phone_android
                </span>
                <a href={profile?.nomorHp ? `https://wa.me/${profile.nomorHp.replace(/[^0-9]/g, '')}` : "tel:+6281234567890"} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {profile?.nomorHp || "+62 812-3456-7890"}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-1">
              {social?.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#dae2fd] text-primary hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              )}
              {social?.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#dae2fd] text-primary hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                  </svg>
                </a>
              )}
              {social?.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#dae2fd] text-primary hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7h-2.54v-2.9h2.54v-2.21c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                  </svg>
                </a>
              )}
              {social?.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#dae2fd] text-primary hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <span className="font-bold text-sm">X</span>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Produk Kami */}
          <div className="flex flex-col gap-5">
            <h4 className="font-bold text-lg text-[#131b2e]">Produk Kami</h4>
            <ul className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#603e39] hover:text-primary transition-colors flex items-center gap-2 text-sm"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                      chevron_right
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-bold text-lg text-[#131b2e] mt-4">Perusahaan</h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#603e39] hover:text-primary transition-colors flex items-center gap-2 text-sm"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                      chevron_right
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hubungi Kami + Siemens Badge */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-lg text-[#131b2e]">Hubungi Kami</h4>
            <p className="text-sm text-[#603e39] leading-relaxed">
              Butuh konsultasi teknis atau informasi produk? Tim kami siap membantu Anda menemukan solusi terbaik.
            </p>

            <Link
              href="/contact"
              id="footer-cta-contact"
              className="btn-primary w-fit"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                send
              </span>
              Kirim Pesan
            </Link>

            {/* Siemens Authorized Partner Badge */}
            {profile?.badgeCertificates && profile.badgeCertificates.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-2">
                {profile.badgeCertificates.map((cert: any, i: number) => {
                  const certImageSrc =
                    typeof cert.image === "object" && cert.image
                      ? cert.image.url || ""
                      : cert.image;
                  if (!certImageSrc) return null;
                  return (
                    <div key={i} className="inline-block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={certImageSrc}
                        alt={cert.title || "Sertifikat"}
                        className="h-16 w-auto object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-4 inline-flex items-center gap-4 px-5 py-4 bg-white border border-[#dae2fd] rounded-2xl card-shadow w-fit">
                <div className="w-12 h-12 bg-[#00646e] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-white"
                    style={{ fontSize: "24px" }}
                  >
                    verified_user
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#603e39] uppercase tracking-widest">
                    Siemens
                  </span>
                  <span className="text-sm font-bold text-[#00646e]">
                    Authorized Partner
                  </span>
                  <span className="text-xs text-[#603e39] mt-0.5">
                    Best Growth Distributor 2024 & 2025
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#603e39]">
          <p>© {new Date().getFullYear()} PT Hokiindo Raya. Semua hak dilindungi.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
