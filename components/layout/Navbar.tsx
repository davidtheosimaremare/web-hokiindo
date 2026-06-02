"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import TopBar from "./TopBar";
import SearchModal from "../ui/SearchModal";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "https://shop.hokiindo.co.id" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Proyek", href: "/projects" },
  { label: "Karir", href: "/careers" },
  { label: "Berita", href: "/news" },
  { label: "Kontak", href: "/contact" },
];

export default function Navbar({ profile }: { profile?: any }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    // Outer wrapper: fixed, full header (topbar + main nav)
    <header className="fixed top-0 left-0 w-full z-50 bg-white">
      {/* ── Top Bar ── */}
      <TopBar profile={profile} />

      {/* ── Main Nav ── glass effect, sits below topbar */}
      <nav
        className="glass-nav w-full"
        aria-label="Main navigation"
      >
        <div className="flex justify-between items-center w-full h-20 mx-auto px-5 md:px-12 max-w-[1440px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
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

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              const isExternal = link.href.startsWith("http");
              const linkClasses = `font-semibold text-sm tracking-wide py-2 px-3 rounded-full transition-all duration-200 ${
                isActive
                  ? "text-primary border-b-2 border-primary pb-1 rounded-none"
                  : "text-[#131b2e] hover:text-primary hover:bg-primary/5"
              }`;
              
              if (isExternal) {
                return (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClasses}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right: Search + CTA */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#f2f3ff] border border-[#dae2fd] hover:scale-105 transition-all text-primary cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                search
              </span>
            </button>
            <a
              href="https://shop.hokiindo.co.id"
              id="nav-cta-katalog"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex bg-primary text-white font-semibold text-sm tracking-wide px-5 py-2.5 rounded-full hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
            >
              Lihat Katalog
            </a>

            {/* Mobile menu toggle */}
            <button
              aria-label="Toggle mobile menu"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-[#131b2e]"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="material-symbols-outlined">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden glass-nav border-t border-black/5 px-5 py-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith("http");
              const linkClasses = "font-semibold text-sm text-[#131b2e] hover:text-primary py-2 px-4 rounded-xl hover:bg-primary/5 transition-all";
              
              if (isExternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className={linkClasses}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={linkClasses}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="https://shop.hokiindo.co.id"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 bg-primary text-white text-sm font-semibold px-5 py-3 rounded-full text-center hover:bg-primary/90 transition-colors"
            >
              Lihat Katalog
            </a>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
