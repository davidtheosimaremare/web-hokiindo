"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export interface HeroSlide {
  id: string;
  image: string | { url?: string };
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

interface HeroSliderProps {
  slides?: HeroSlide[];
}

const defaultSlides: HeroSlide[] = [
  {
    id: "slide-1",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80",
    title: "Driving Engineering Excellence in Automation",
    subtitle: "Authorized Siemens Distributor — Best Growth Distributor 2024 & 2025",
    ctaLabel: "Discover Solutions",
    ctaHref: "/products",
  },
  {
    id: "slide-2",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1600&q=80",
    title: "Solusi Proteksi Industri Berkelas Dunia",
    subtitle: "Siemens ACB, MCCB, MCB — Keandalan tanpa kompromi",
    ctaLabel: "Lihat Produk Siemens",
    ctaHref: "/products/siemens-protection",
  },
  {
    id: "slide-3",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=80",
    title: "Ekosistem Infrastruktur Kelistrikan Lengkap",
    subtitle: "Busbar APS & Lampu Proyek Portable G-Comin",
    ctaLabel: "Jelajahi Ekosistem",
    ctaHref: "/products",
  },
];

export default function HeroSlider({ slides }: HeroSliderProps) {
  const activeSlides = slides && slides.length > 0 ? slides : defaultSlides;
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goToNext();
    else if (isRightSwipe) goToPrev();
  };

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  const goToNext = useCallback(() => {
    setCurrent((c) => (c + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const goToPrev = useCallback(() => {
    setCurrent((c) => (c === 0 ? activeSlides.length - 1 : c - 1));
  }, [activeSlides.length]);

  useEffect(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlides.length, isHovered]);

  const slide = activeSlides[current];

  return (
    <div
      className="relative h-[80vh] md:h-[calc(100vh-116px-64px)] 2xl:h-[760px] min-h-[560px] w-full rounded-b-[64px] md:rounded-b-[120px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
        isolation: "isolate",
      }}
    >
      <section
        className="absolute inset-0 flex items-end overflow-hidden rounded-b-[64px] md:rounded-b-[120px]"
        aria-label="Hero banner"
        style={{
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Images */}
        {activeSlides.map((s, i) => {
          const imgEl = (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={typeof s.image === "object" && s.image ? s.image.url || "" : s.image}
              alt={s.title || "Banner"}
              className="w-full h-full object-cover"
            />
          );

          return (
            <div
              key={s.id || `slide-${i}`}
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                opacity: i === current ? 1 : 0,
                pointerEvents: i === current ? "auto" : "none",
              }}
            >
              {s.ctaHref ? (
                <a
                  href={s.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 block cursor-pointer"
                >
                  {imgEl}
                </a>
              ) : (
                imgEl
              )}
            </div>
          );
        })}

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 hero-overlay transition-opacity duration-700 z-10 pointer-events-none ${
            slide.title || slide.subtitle || slide.ctaLabel ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Subtle radial accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2/3 z-10 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: slide.title || slide.subtitle || slide.ctaLabel ? 1 : 0,
            background:
              "radial-gradient(ellipse at 20% 100%, rgba(188,1,0,0.15) 0%, transparent 60%)",
          }}
        />

        {/* Content */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 md:px-12 pb-16 md:pb-20">
          {(slide.title || (slide.ctaLabel && slide.ctaHref)) && (
            <div key={slide.id} className="animate-fade-in-up max-w-3xl mb-8">
              {slide.title && (
                <h1 className="font-bold text-white mb-6 leading-tight text-[32px] md:text-[48px] lg:text-[52px] tracking-tight max-w-2xl">
                  {slide.title}
                </h1>
              )}
              {slide.ctaLabel && slide.ctaHref && (
                <a
                  href={slide.ctaHref}
                  id={`hero-cta-${slide.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base shadow-xl inline-flex items-center gap-2"
                >
                  {slide.ctaLabel}
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    arrow_forward
                  </span>
                </a>
              )}
            </div>
          )}

          {/* Slide Indicators & Chevrons */}
          <div className="flex items-center justify-between mt-12">
            {/* Dot Indicators */}
            <div className="flex items-center gap-3">
              {activeSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(i); }}
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: i === current ? "48px" : "16px",
                    background: i === current ? "#bc0100" : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>

            {/* Desktop Navigation Chevrons */}
            <div className="hidden md:flex items-center gap-4">
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToPrev(); }}
                aria-label="Previous slide"
                className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToNext(); }}
                aria-label="Next slide"
                className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
