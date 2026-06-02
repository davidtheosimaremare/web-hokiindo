// Mock data store for projects — replace with Payload CMS fetch in Phase 2

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface Challenge {
  icon: string;
  title: string;
  description: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  client: string;
  year: string;
  location: string;
  category: "Panel Maker" | "Kontraktor" | "Pertambangan";
  status: "Selesai" | "Berlangsung" | "Perencanaan";
  heroImage: string;
  description: string[];
  challenges: Challenge[];
  specs: TechnicalSpec[];
  gallery: { src: string; alt: string }[];
}

export const projects: ProjectDetail[] = [
  {
    slug: "panel-tegangan-rendah",
    title: "Instalasi Panel Tegangan Rendah - PT Kaltim Prima",
    client: "PT Kaltim Prima",
    year: "2024",
    location: "Kawasan Industri Jababeka, Bekasi",
    category: "Panel Maker",
    status: "Selesai",
    heroImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85",
    description: [
      "Proyek instalasi Panel Tegangan Rendah (Low Voltage Switchgear) untuk PT Kaltim Prima dirancang untuk memenuhi kebutuhan distribusi daya yang stabil dan aman di lingkungan industri berat. Kompleksitas proyek ini menuntut tingkat presisi tinggi dalam perancangan dan eksekusi, mengingat kondisi operasional klien yang beroperasi secara terus-menerus (24/7).",
      "PT Hokiindo Raya, sebagai mitra terpercaya, mengimplementasikan solusi terintegrasi menggunakan komponen kelas dunia dari Siemens. Fokus utama adalah pada keandalan sistem (reliability), efisiensi ruang panel, dan kemudahan perawatan (maintainability) untuk meminimalisir waktu henti (downtime) di masa depan.",
    ],
    challenges: [
      {
        icon: "bolt",
        title: "Manajemen Beban Tinggi",
        description:
          "Penggunaan Siemens 3WL ACB untuk menangani arus hubung singkat yang tinggi dengan sistem proteksi cerdas ETU yang dapat dikonfigurasi.",
      },
      {
        icon: "shield",
        title: "Ketahanan Lingkungan Industri",
        description:
          "Desain panel kustom dengan rating IP54 yang tahan terhadap debu dan kelembaban operasional pabrik.",
      },
      {
        icon: "timer",
        title: "Zero Downtime Installation",
        description:
          "Instalasi dilakukan secara bertahap tanpa menghentikan operasi produksi, dengan koordinasi ketat bersama tim engineering klien.",
      },
    ],
    specs: [
      { label: "Komponen Utama", value: "Siemens 3WL Air Circuit Breakers (ACB)" },
      {
        label: "Distribusi Sekunder",
        value: "Siemens 3VA Molded Case Circuit Breakers (MCCB)",
      },
      { label: "Sistem Busbar", value: "Tembaga Murni 99.9%, Kapasitas 4000A" },
      { label: "Monitoring", value: "PAC3220 Power Quality Meter" },
      { label: "Rating IP", value: "IP54 (Debu & Kelembaban)" },
      { label: "Tegangan Nominal", value: "400V AC / 50Hz" },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        alt: "Panel tegangan rendah close-up",
      },
      {
        src: "https://images.unsplash.com/photo-1621902736256-e5c0b28e70a5?w=800&q=80",
        alt: "Instalasi busbar sistem",
      },
      {
        src: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80",
        alt: "Pemeriksaan teknis engineer",
      },
    ],
  },
  {
    slug: "distribusi-daya-pabrik",
    title: "Sistem Distribusi Daya Pabrik - PLN Nusantara Power",
    client: "PLN Nusantara Power",
    year: "2023",
    location: "Kawasan Berikat Nusantara, Jakarta",
    category: "Kontraktor",
    status: "Selesai",
    heroImage:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1600&q=85",
    description: [
      "Proyek distribusi daya untuk PLN Nusantara Power mencakup pemasangan sistem distribusi utama yang menghubungkan gardu induk dengan sub-stasiun di seluruh kawasan industri.",
      "Implementasi menggunakan solusi busbar Siemens yang terintegrasi dengan sistem SCADA untuk monitoring real-time konsumsi dan kualitas daya.",
    ],
    challenges: [
      {
        icon: "hub",
        title: "Integrasi Sistem SCADA",
        description:
          "Koneksi seamless antara hardware Siemens dengan platform SCADA eksisting PLN menggunakan protokol IEC 61850.",
      },
      {
        icon: "electric_meter",
        title: "Power Quality Management",
        description:
          "Implementasi harmonic filter aktif untuk menjaga THD di bawah 5% sesuai standar IEEE 519.",
      },
    ],
    specs: [
      { label: "Kapasitas Sistem", value: "20 MVA" },
      { label: "Tegangan Distribusi", value: "20kV / 400V" },
      { label: "Proteksi Utama", value: "Siemens 7SR Relay Protection" },
      { label: "Monitoring", value: "SICAM A8000 RTU + SCADA" },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80",
        alt: "Switchgear utama",
      },
      {
        src: "https://images.unsplash.com/photo-1621902736256-e5c0b28e70a5?w=800&q=80",
        alt: "Control room panel",
      },
      {
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
        alt: "Monitoring station",
      },
    ],
  },
  {
    slug: "listrik-gedung-komersial",
    title: "Infrastruktur Listrik Gedung Komersial - PT Agung Podomoro",
    client: "PT Agung Podomoro Land",
    year: "2023",
    location: "Sudirman Central Business District, Jakarta",
    category: "Kontraktor",
    status: "Selesai",
    heroImage:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=85",
    description: [
      "Proyek infrastruktur listrik untuk gedung komersial kelas A di kawasan Sudirman CBD mencakup instalasi sistem distribusi daya dari trafo hingga panel lantai untuk 42 lantai.",
      "Desain mengutamakan redundansi dengan dual-feeder system dan emergency power yang dapat otomatis beralih dalam waktu kurang dari 15 detik.",
    ],
    challenges: [
      {
        icon: "apartment",
        title: "Koordinasi Multi-Kontraktor",
        description:
          "Sinkronisasi pekerjaan elektrikal dengan 12 kontraktor M&E lain dalam jadwal konstruksi yang ketat.",
      },
      {
        icon: "emergency",
        title: "Sistem Emergency Power",
        description:
          "Implementasi ATS (Automatic Transfer Switch) Siemens 3WL dengan waktu switching < 15 detik untuk kelangsungan layanan kritis.",
      },
    ],
    specs: [
      { label: "Cakupan", value: "42 Lantai, 85.000 m²" },
      { label: "Kapasitas Utama", value: "2 × 2500 kVA Transformer" },
      { label: "Panel Lantai", value: "42 unit Siemens ALPHA 8HP" },
      { label: "Emergency", value: "ATS 3WL + 2 × 1500 kVA Genset" },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
        alt: "Main distribution board",
      },
      {
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        alt: "Floor panel installation",
      },
      {
        src: "https://images.unsplash.com/photo-1576267423048-15c0040fec78?w=800&q=80",
        alt: "Building electrical room",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
