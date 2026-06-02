"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const LANGS = [
  { code: "id", label: "🇮🇩 Indonesia" },
  { code: "en", label: "🇬🇧 English" },
  { code: "zh-CN", label: "🇨🇳 中文" },
];

function getActiveLang(): string {
  if (typeof document === "undefined") return "id";
  const match = document.cookie.match(/googtrans=\/id\/([^;]+)/);
  return match ? match[1] : "id";
}

export default function TopBar({ profile }: { profile?: any }) {
  const [activeLang, setActiveLang] = useState("id");

  useEffect(() => {
    setActiveLang(getActiveLang());
  }, []);

  const changeLang = (code: string) => {
    if (code === "id") {
      document.cookie =
        "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie = `googtrans=; path=/; domain=.${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    } else {
      document.cookie = `googtrans=/id/${code}; path=/`;
      document.cookie = `googtrans=/id/${code}; path=/; domain=.${window.location.hostname}`;
    }
    setActiveLang(code);
    window.location.reload();
  };

  const phoneHref = profile?.nomorTelepon ? `tel:${profile.nomorTelepon.replace(/[^0-9+]/g, '')}` : "tel:+62215551234";
  const emailHref = profile?.email ? `mailto:${profile.email}` : "mailto:sales@hokiindoraya.co.id";

  return (
    <>
      {/* Google Translate scripts */}
      <Script id="google-translate-init" strategy="afterInteractive">{`
        function googleTranslateElementInit() {
          new google.translate.TranslateElement({
            pageLanguage: 'id',
            includedLanguages: 'en,zh-CN',
            autoDisplay: false,
          }, 'google_translate_element');
        }
      `}</Script>
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      {/* ── Top Bar ── */}
      <div className="w-full bg-white border-b border-[#ebbbb4]/30 text-[#5c5f61] text-xs font-semibold z-[60] relative">
        <div className="max-w-[1440px] mx-auto px-5 md:px-12 h-9 flex items-center justify-between gap-4">

          {/* Left: Phone + Email */}
          <div className="flex items-center gap-5">
            <a
              href={phoneHref}
              className="hidden sm:flex items-center gap-1.5 hover:text-primary transition-colors duration-200"
            >
              <span className="material-symbols-outlined text-primary" style={{ fontSize: "13px" }}>
                phone
              </span>
              {profile?.nomorTelepon || "+62 21 555-1234"}
            </a>
            <a
              href={emailHref}
              className="flex items-center gap-1.5 hover:text-primary transition-colors duration-200"
            >
              <span className="material-symbols-outlined text-primary" style={{ fontSize: "13px" }}>
                mail
              </span>
              <span className="hidden md:inline">{profile?.email || "sales@hokiindoraya.co.id"}</span>
              <span className="md:hidden">Email Kami</span>
            </a>
          </div>

          {/* Right: Language dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={activeLang}
              onChange={(e) => changeLang(e.target.value)}
              aria-label="Pilih bahasa"
              className="text-xs font-semibold text-[#131b2e] bg-transparent border-none outline-none cursor-pointer hover:text-primary transition-colors duration-200 appearance-none pr-1"
            >
              {LANGS.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined text-[#5c5f61]" style={{ fontSize: "13px" }}>
              expand_more
            </span>
          </div>

        </div>
      </div>
    </>
  );
}
