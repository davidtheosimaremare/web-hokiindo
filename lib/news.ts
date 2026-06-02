// Mock news data — replace with Payload CMS fetch in Phase 2

export type NewsCategory = "Company News" | "Technical Insight" | "Industry Trends";

// Block types for rich article content
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "blockquote"; text: string; author: string }
  | { type: "italic-paragraph"; text: string };  // paragraph with <em> inline

export interface NewsArticle {
  slug: string;
  category: NewsCategory;
  date: string;        // Display date
  dateISO: string;     // ISO 8601 for <time>
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  content?: ContentBlock[];   // Full article body — optional (only for detail pages)
  author?: string;
}

export const articles: NewsArticle[] = [
  {
    slug: "siemens-growth-partner-award-2024",
    category: "Company News",
    date: "24 Oktober 2024",
    dateISO: "2024-10-24",
    title: "PT Hokiindo Raya Meraih Penghargaan Siemens Partner of the Year",
    excerpt:
      "Dalam acara tahunan Siemens Partner Summit, PT Hokiindo Raya berhasil meraih penghargaan prestisius sebagai Partner of the Year 2024 — bukti nyata komitmen dalam menyediakan solusi kelistrikan industri terbaik.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=85",
    imageAlt: "Penghargaan Siemens Partner of the Year 2024",
    author: "Budi Santoso, Direktur Utama",
    content: [
      {
        type: "paragraph",
        text: "Jakarta, 24 Oktober 2024 – Dalam acara tahunan Siemens Partner Summit yang diselenggarakan di Hotel Mulia Senayan, PT Hokiindo Raya dengan bangga mengumumkan keberhasilannya meraih penghargaan prestisius sebagai \"Partner of the Year 2024\". Penghargaan ini merupakan bukti nyata dari komitmen perusahaan dalam menyediakan solusi kelistrikan industri terbaik di Indonesia.",
      },
      {
        type: "heading",
        text: "Komitmen pada Kualitas dan Inovasi",
      },
      {
        type: "paragraph",
        text: "Sebagai Authorized Partner Siemens, PT Hokiindo Raya terus berupaya menghadirkan teknologi mutakhir untuk sektor industri dan infrastruktur. Kemitraan strategis ini memungkinkan kami untuk mendistribusikan produk-produk berkualitas tinggi yang mendukung efisiensi operasional pelanggan kami.",
      },
      {
        type: "italic-paragraph",
        text: "Fokus kami tahun ini adalah pada implementasi solusi smart grid dan otomatisasi pabrik yang berkelanjutan, sejalan dengan visi pemerintah menuju Industri 4.0.",
      },
      {
        type: "blockquote",
        text: "\"Penghargaan ini adalah hasil kerja keras seluruh tim Hokiindo Raya dan kepercayaan yang diberikan oleh pelanggan kami. Kami akan terus meningkatkan standar layanan kami sebagai mitra kelistrikan terpercaya.\"",
        author: "Budi Santoso, Direktur Utama PT Hokiindo Raya",
      },
      {
        type: "heading",
        text: "Langkah ke Depan",
      },
      {
        type: "paragraph",
        text: "Dengan penghargaan ini, PT Hokiindo Raya semakin termotivasi untuk memperluas jangkauan layanan teknis dan after-sales support. Kami merencanakan pembukaan dua pusat layanan baru di Surabaya dan Medan pada kuartal pertama tahun depan untuk mendekatkan solusi kami kepada industri di wilayah tersebut.",
      },
      {
        type: "paragraph",
        text: "Ekspansi ini merupakan bagian dari roadmap strategis kami untuk memperkuat posisi sebagai mitra elektrikal terpercaya di seluruh wilayah Indonesia, dari Sabang sampai Merauke.",
      },
    ],
  },
  {
    slug: "next-gen-automation-high-rise",
    category: "Technical Insight",
    date: "12 Oktober 2024",
    dateISO: "2024-10-12",
    title: "Implementing Next-Gen Automation Systems in High-Rise Developments",
    excerpt:
      "As urban infrastructure evolves, the demand for intelligent automation in commercial high-rises is surging. Explore how the latest industrial control arrays are seamlessly integrating into modern architectural designs.",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=85",
    imageAlt: "Sistem otomasi high-rise modern",
    author: "Tim Teknis Hokiindo",
    content: [
      {
        type: "paragraph",
        text: "Perkembangan gedung pencakar langit di Indonesia terus meningkat pesat. Di balik setiap struktur beton dan kaca tersebut, sistem kelistrikan dan otomasi yang canggih menjadi tulang punggung operasional — mulai dari sistem HVAC, lift, pencahayaan, hingga keamanan.",
      },
      {
        type: "heading",
        text: "Tantangan Integrasi Sistem",
      },
      {
        type: "paragraph",
        text: "Mengintegrasikan berbagai subsistem dalam satu ekosistem yang terpadu membutuhkan protokol komunikasi yang handal. Siemens menghadirkan solusi Building Automation System (BAS) yang memungkinkan manajemen terpusat melalui satu platform.",
      },
      {
        type: "blockquote",
        text: "\"Dengan Siemens Desigo CC, kami dapat mengintegrasikan seluruh sistem gedung — dari energi, keamanan, hingga pencahayaan — dalam satu interface yang intuitif.\"",
        author: "Ir. Andi Wirawan, Lead Systems Engineer PT Hokiindo Raya",
      },
      {
        type: "heading",
        text: "ROI dan Efisiensi Energi",
      },
      {
        type: "paragraph",
        text: "Implementasi sistem otomasi terpadu terbukti mengurangi konsumsi energi gedung hingga 30% dalam 12 bulan pertama operasional. Penghematan ini secara langsung berdampak pada biaya operasional jangka panjang yang signifikan bagi pemilik gedung.",
      },
    ],
  },
  {
    slug: "industrial-energy-efficiency-strategies",
    category: "Industry Trends",
    date: "28 September 2024",
    dateISO: "2024-09-28",
    title: "Industrial Energy Efficiency: Strategies for Optimizing Operational Costs",
    excerpt:
      "With energy costs fluctuating, upgrading legacy power distribution networks is no longer optional. Discover practical strategies and Siemens technologies that facilities are utilizing.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
    imageAlt: "Efisiensi energi industri",
    author: "Tim Riset & Pengembangan",
    content: [
      {
        type: "paragraph",
        text: "Biaya energi menjadi salah satu komponen terbesar dalam struktur biaya operasional pabrik manufaktur di Indonesia. Data terbaru menunjukkan bahwa industri manufaktur mengkonsumsi lebih dari 35% total energi listrik nasional.",
      },
      {
        type: "heading",
        text: "Strategi Efisiensi Utama",
      },
      {
        type: "paragraph",
        text: "Tiga strategi utama yang terbukti efektif: pertama, pemasangan Variable Frequency Drive (VFD) pada motor-motor industri besar; kedua, implementasi sistem power monitoring real-time; dan ketiga, pengoptimalan faktor daya (power factor correction).",
      },
      {
        type: "italic-paragraph",
        text: "Teknologi Siemens SINAMICS series menawarkan VFD dengan efisiensi hingga 98.5%, menjadikannya pilihan utama untuk industri berskala besar.",
      },
      {
        type: "blockquote",
        text: "\"Setelah implementasi VFD Siemens pada lini produksi kami, konsumsi listrik turun 28% dalam 6 bulan pertama. ROI tercapai lebih cepat dari proyeksi awal.\"",
        author: "Direktur Operasional, PT Krakatau Steel",
      },
    ],
  },
  {
    slug: "expansion-eastern-indonesia-branch",
    category: "Company News",
    date: "15 September 2024",
    dateISO: "2024-09-15",
    title: "Expansion into Eastern Indonesia: New Branch Opening",
    excerpt:
      "To better serve our growing client base in the region, PT Hokiindo Raya is proud to announce the opening of a new regional office and distribution center.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85",
    imageAlt: "Kantor regional baru Indonesia Timur",
    content: [
      {
        type: "paragraph",
        text: "Makassar, 15 September 2024 — PT Hokiindo Raya resmi membuka kantor regional dan pusat distribusi di Makassar, Sulawesi Selatan. Ini merupakan langkah strategis untuk mempercepat pelayanan kepada industri di kawasan Indonesia Timur yang terus berkembang pesat.",
      },
      {
        type: "heading",
        text: "Potensi Pasar Indonesia Timur",
      },
      {
        type: "paragraph",
        text: "Kawasan Indonesia Timur menyimpan potensi industri yang luar biasa — dari sektor pertambangan nikel di Sulawesi, pengolahan hasil laut, hingga pengembangan infrastruktur masif dalam program nasional. Kebutuhan akan produk kelistrikan berkualitas tinggi terus meningkat sejalan dengan pertumbuhan ini.",
      },
    ],
  },
  {
    slug: "smart-breakers-predictive-maintenance",
    category: "Technical Insight",
    date: "2 September 2024",
    dateISO: "2024-09-02",
    title: "The Role of Smart Breakers in Predictive Maintenance",
    excerpt:
      "Downtime is costly. Learn how transitioning to smart circuit breakers allows facility managers to monitor power quality in real-time and predict failures before they happen.",
    image: "https://images.unsplash.com/photo-1621902736256-e5c0b28e70a5?w=1200&q=85",
    imageAlt: "Smart circuit breaker predictive maintenance",
    content: [
      {
        type: "paragraph",
        text: "Downtime industri bukan sekadar masalah teknis — ini adalah masalah bisnis. Studi McKinsey menunjukkan bahwa unplanned downtime merugikan industri manufaktur global hingga USD 50 miliar per tahun.",
      },
      {
        type: "heading",
        text: "Smart Breaker: Lebih dari Sekadar Pemutus Daya",
      },
      {
        type: "paragraph",
        text: "Siemens 3WL dengan ETU (Electronic Trip Unit) terbaru hadir dengan kemampuan komunikasi Modbus dan PROFIBUS, memungkinkan monitoring kondisi real-time. Sensor internal memantau arus, tegangan, temperatur, dan jumlah operasi — data yang krusial untuk predictive maintenance.",
      },
      {
        type: "blockquote",
        text: "\"Dengan smart breaker Siemens terintegrasi ke SCADA kami, kami berhasil mengidentifikasi overload tersembunyi sebelum menyebabkan trip — menghemat potensi kerugian produksi senilai miliaran rupiah.\"",
        author: "Manajer Pemeliharaan, PT Pupuk Indonesia",
      },
    ],
  },
  {
    slug: "sustainability-heavy-industry-standard",
    category: "Industry Trends",
    date: "20 Agustus 2024",
    dateISO: "2024-08-20",
    title: "Sustainability in Heavy Industry: The New Standard",
    excerpt:
      "As government regulations tighten around carbon emissions, heavy manufacturing plants are overhauling their electrical systems to meet new green standards.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=85",
    imageAlt: "Sustainability industri berat",
    content: [
      {
        type: "paragraph",
        text: "Regulasi emisi karbon yang semakin ketat dari pemerintah Indonesia mendorong industri berat untuk melakukan transformasi fundamental pada sistem kelistrikan mereka. Peraturan ini bukan lagi pilihan — ini adalah keharusan untuk tetap beroperasi.",
      },
      {
        type: "heading",
        text: "Green Electrical Systems",
      },
      {
        type: "paragraph",
        text: "Transisi menuju sistem kelistrikan yang lebih hijau mencakup: adopsi motor IE4/IE5 berefisiensi ultra-tinggi, integrasi sistem renewable energy (solar, wind), implementasi smart metering, dan optimasi sistem distribusi untuk minimalisasi losses.",
      },
    ],
  },
  {
    slug: "engineering-scholarship-program-2025",
    category: "Company News",
    date: "5 Agustus 2024",
    dateISO: "2024-08-05",
    title: "Annual Engineering Scholarship Program Opens for 2025",
    excerpt:
      "Investing in the next generation of electrical engineers. PT Hokiindo Raya is now accepting applications for our annual scholarship program.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=85",
    imageAlt: "Program beasiswa teknik 2025",
    content: [
      {
        type: "paragraph",
        text: "PT Hokiindo Raya kembali membuka program beasiswa tahunan untuk mahasiswa Teknik Elektro dan Teknik Industri dari universitas negeri terkemuka di Indonesia. Program ini merupakan wujud nyata komitmen kami dalam investasi sumber daya manusia Indonesia.",
      },
      {
        type: "heading",
        text: "Kriteria dan Benefit",
      },
      {
        type: "paragraph",
        text: "Penerima beasiswa akan mendapatkan: biaya kuliah penuh selama 2 semester, tunjangan bulanan, laptop engineering, dan kesempatan magang langsung di divisi teknis PT Hokiindo Raya dengan mentoring dari engineer berpengalaman.",
      },
    ],
  },
  {
    slug: "harmonics-modern-power-systems",
    category: "Technical Insight",
    date: "22 Juli 2024",
    dateISO: "2024-07-22",
    title: "Understanding Harmonics in Modern Power Systems",
    excerpt:
      "Non-linear loads are causing unprecedented power quality issues in industrial facilities. Our engineering team breaks down the causes and mitigation strategies.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=85",
    imageAlt: "Harmonik sistem tenaga listrik",
    content: [
      {
        type: "paragraph",
        text: "Proliferasi beban non-linear — dari VFD, UPS, hingga charger EV — menciptakan tantangan power quality baru yang serius. Total Harmonic Distortion (THD) yang melebihi standar IEEE 519 dapat menyebabkan panas berlebih, interferensi sinyal kontrol, bahkan kerusakan peralatan prematur.",
      },
      {
        type: "heading",
        text: "Solusi Mitigasi Harmonik",
      },
      {
        type: "paragraph",
        text: "Pendekatan berlapis diperlukan: passive harmonic filter untuk harmonik orde rendah, active harmonic filter (Siemens SINACON HF) untuk respons dinamis, dan pemilihan transformer yang tepat dengan desain K-factor rating.",
      },
    ],
  },
  {
    slug: "ev-charging-infrastructure-commercial",
    category: "Industry Trends",
    date: "8 Juli 2024",
    dateISO: "2024-07-08",
    title: "The Future of EV Charging Infrastructure in Commercial Spaces",
    excerpt:
      "With the rise of electric vehicles, commercial buildings must adapt their power distribution for scalable EV charging fleets.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=85",
    imageAlt: "Infrastruktur EV charging komersial",
    content: [
      {
        type: "paragraph",
        text: "Penetrasi kendaraan listrik di Indonesia diproyeksikan mencapai 2 juta unit pada 2030. Ini bukan sekadar tren otomotif — ini adalah revolusi infrastruktur yang membutuhkan persiapan sistem distribusi daya yang matang di gedung komersial.",
      },
      {
        type: "heading",
        text: "Kapasitas dan Load Management",
      },
      {
        type: "paragraph",
        text: "Sebuah gedung perkantoran dengan 100 charging point DC Fast (50kW) membutuhkan kapasitas tambahan 5MW — setara dengan kebutuhan listrik satu kawasan perumahan kelas menengah. Smart load management menjadi kunci untuk menghindari overload tanpa perlu upgrade trafo yang mahal.",
      },
    ],
  },
  {
    slug: "siemens-3wa-acb-industrial-applications",
    category: "Technical Insight",
    date: "28 Juni 2024",
    dateISO: "2024-06-28",
    title: "Siemens 3WA ACB: Industrial Applications and Best Practices",
    excerpt:
      "The Siemens 3WA air circuit breaker sets new benchmarks in protection technology across cement, steel, and data center industries.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
    imageAlt: "Siemens 3WA ACB aplikasi industri",
    content: [
      {
        type: "paragraph",
        text: "Siemens 3WA Air Circuit Breaker hadir sebagai solusi proteksi arus rendah hingga 6300A dengan kemampuan breaking capacity Icu hingga 150kA. Ini menjadikannya pilihan ideal untuk Main Distribution Board (MDB) di fasilitas industri skala besar.",
      },
      {
        type: "heading",
        text: "Fitur Unggulan ETU (Electronic Trip Unit)",
      },
      {
        type: "paragraph",
        text: "ETU pada 3WA menawarkan proteksi overcurrent (L, S, I), ground fault, dan zone selective interlocking (ZSI) — memungkinkan koordinasi proteksi yang lebih presisi dan meminimalisir area pemadaman saat terjadi gangguan.",
      },
    ],
  },
  {
    slug: "digital-twin-electrical-systems",
    category: "Industry Trends",
    date: "14 Juni 2024",
    dateISO: "2024-06-14",
    title: "Digital Twin Technology Transforming Electrical System Design",
    excerpt:
      "Before a single cable is laid, engineers can now simulate entire power distribution networks digitally, reducing design errors by up to 40%.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=85",
    imageAlt: "Digital twin teknologi sistem kelistrikan",
    content: [
      {
        type: "paragraph",
        text: "Konsep digital twin — replika virtual dari sistem fisik yang diperbarui secara real-time — kini memasuki dunia teknik elektrikal. Engineer dapat mensimulasikan skenario gangguan, menguji setting proteksi, dan mengoptimasi load flow sebelum commissioning aktual.",
      },
      {
        type: "heading",
        text: "Implementasi dengan ETAP dan Siemens",
      },
      {
        type: "paragraph",
        text: "Integrasi antara platform ETAP (software power system analysis) dengan data real-time dari Siemens SICAM PAS menciptakan digital twin yang akurat. Hasilnya: pengurangan commissioning time 35%, nol kesalahan setting proteksi, dan pemahaman operasional yang jauh lebih baik.",
      },
    ],
  },
  {
    slug: "hokiindo-iso-certification-2024",
    category: "Company News",
    date: "1 Juni 2024",
    dateISO: "2024-06-01",
    title: "PT Hokiindo Raya Achieves ISO 9001:2015 Recertification",
    excerpt:
      "Reaffirming our commitment to quality management excellence, PT Hokiindo Raya has successfully completed its ISO 9001:2015 recertification audit.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=85",
    imageAlt: "Sertifikasi ISO 9001:2015 Hokiindo",
    content: [
      {
        type: "paragraph",
        text: "Jakarta, 1 Juni 2024 — PT Hokiindo Raya berhasil mempertahankan sertifikasi ISO 9001:2015 setelah audit surveillance yang ketat oleh lembaga sertifikasi internasional TÜV Rheinland. Tidak ada temuan major non-conformance dalam proses audit ini.",
      },
      {
        type: "heading",
        text: "Sistem Manajemen Mutu Berkelanjutan",
      },
      {
        type: "paragraph",
        text: "Sertifikasi ini mencakup seluruh proses bisnis: pengadaan produk, manajemen gudang, layanan teknis, dan after-sales support. Komitmen terhadap sistem manajemen mutu ini adalah fondasi kepercayaan yang kami bangun bersama setiap pelanggan.",
      },
    ],
  },
];

export const ARTICLES_PER_PAGE = 9;

export function getPaginatedArticles(page: number) {
  const start = (page - 1) * ARTICLES_PER_PAGE;
  const end = start + ARTICLES_PER_PAGE;
  return {
    articles: articles.slice(start, end),
    total: articles.length,
    totalPages: Math.ceil(articles.length / ARTICLES_PER_PAGE),
  };
}

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return articles.map((a) => a.slug);
}

/** Get 3 related articles (excluding current slug, same category preferred) */
export function getRelatedArticles(slug: string, count = 3): NewsArticle[] {
  const current = getArticleBySlug(slug);
  const sameCategory = articles.filter(
    (a) => a.slug !== slug && a.category === current?.category
  );
  const others = articles.filter(
    (a) => a.slug !== slug && a.category !== current?.category
  );
  return [...sameCategory, ...others].slice(0, count);
}
