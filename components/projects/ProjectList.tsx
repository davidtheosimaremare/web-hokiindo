"use client";

import { useState } from "react";
import Link from "next/link";

export interface Project {
  id: string;
  year: string;
  client: string;
  title: string;
  location: string;
  category: "Panel Maker" | "Kontraktor" | "Pertambangan";
  image: string;
  href: string;
}

interface ProjectListProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    id: "p1",
    year: "2024",
    client: "PT Kaltim Prima Coal",
    title: "Instalasi Panel Tegangan Rendah",
    location: "Kawasan Industri Jababeka, Bekasi",
    category: "Panel Maker",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75",
    href: "/projects/panel-tegangan-rendah",
  },
  {
    id: "p2",
    year: "2023",
    client: "PLN Nusantara Power",
    title: "Sistem Distribusi Daya Pabrik",
    location: "Kawasan Berikat Nusantara, Jakarta",
    category: "Kontraktor",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&q=75",
    href: "/projects/distribusi-daya-pabrik",
  },
  {
    id: "p3",
    year: "2023",
    client: "PT Agung Podomoro Land",
    title: "Infrastruktur Listrik Gedung Komersial",
    location: "Sudirman Central Business District, Jakarta",
    category: "Kontraktor",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=75",
    href: "/projects/listrik-gedung-komersial",
  },
  {
    id: "p4",
    year: "2023",
    client: "PT Krakatau Steel",
    title: "Upgrade Motor Control Center",
    location: "Cilegon, Banten",
    category: "Panel Maker",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=75",
    href: "/projects/motor-control-center",
  },
  {
    id: "p5",
    year: "2022",
    client: "PT Pelindo Infrastruktur",
    title: "Sistem Busbar Pelabuhan Internasional",
    location: "Tanjung Priok, Jakarta Utara",
    category: "Kontraktor",
    image: "https://images.unsplash.com/photo-1621902736256-e5c0b28e70a5?w=400&q=75",
    href: "/projects/busbar-pelabuhan",
  },
  {
    id: "p6",
    year: "2022",
    client: "PT Pertamina EP",
    title: "Proteksi Instalasi Zona Berbahaya",
    location: "Balikpapan, Kalimantan Timur",
    category: "Pertambangan",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=75",
    href: "/projects/proteksi-zona-berbahaya",
  },
];

const categories = ["Semua", "Panel Maker", "Kontraktor", "Pertambangan"] as const;

const categoryIcon: Record<string, string> = {
  "Panel Maker": "developer_board",
  Kontraktor: "engineering",
  Pertambangan: "construction",
};

export default function ProjectList({ projects = defaultProjects }: ProjectListProps) {
  const [active, setActive] = useState<string>("Semua");
  const [visibleCount, setVisibleCount] = useState<number>(9);

  const filtered =
    active === "Semua" ? projects : projects.filter((p) => p.category === active);

  const displayedProjects = filtered.slice(0, visibleCount);

  const handleCategoryChange = (cat: string) => {
    setActive(cat);
    setVisibleCount(9);
  };

  return (
    <section
      id="daftar-proyek"
      className="py-20 md:py-28 px-5 md:px-12 bg-white"
      aria-labelledby="projects-list-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header row + Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 pb-6 mb-8 border-b border-[#ebbbb4]/30">
          <h2
            id="projects-list-heading"
            className="font-bold text-[28px] md:text-[36px] text-[#131b2e]"
          >
            Daftar Proyek Unggulan
          </h2>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  active === cat
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-[#603e39] border-[#ebbbb4]/50 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project list — Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-[2rem] overflow-hidden border border-black/5 flex flex-col group hover:border-[#dae2fd] hover:card-shadow-hover transition-all duration-300 card-shadow"
            >
              {/* Thumbnail */}
              <div className="w-full aspect-[4/3] overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Floating Badge (Year) */}
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {project.year}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Client + Category */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#5c5f61] truncate max-w-[150px]">{project.client}</span>
                  <span className="text-xs text-[#5c5f61]">•</span>
                  <span className="inline-flex items-center gap-1 bg-[#f2f3ff] text-[#603e39] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#dae2fd]">
                    <span className="material-symbols-outlined" style={{ fontSize: "11px" }}>
                      {categoryIcon[project.category] ?? "work"}
                    </span>
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg text-[#131b2e] group-hover:text-primary transition-colors line-clamp-2 mb-3">
                  {project.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-[#5c5f61] mb-6 mt-auto">
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                    location_on
                  </span>
                  <span className="truncate">{project.location}</span>
                </div>

                {/* CTA Button */}
                <Link
                  href={project.href}
                  className="inline-flex items-center justify-center gap-2 bg-[#eaedff] text-[#131b2e] font-semibold text-sm px-5 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-200 w-full"
                >
                  Detail Proyek
                  <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#603e39]">
            <span className="material-symbols-outlined text-[#dae2fd] block mb-3" style={{ fontSize: "48px" }}>
              search_off
            </span>
            Tidak ada proyek dalam kategori ini.
          </div>
        )}

        {/* Load More CTA */}
        {filtered.length > visibleCount && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="border-2 border-primary text-primary font-bold px-8 py-4 rounded-full hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
            >
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
