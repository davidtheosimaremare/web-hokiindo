import { type NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@/payload.config";

export const dynamic = "force-dynamic";

// Static pages that are always searchable
const STATIC_PAGES = [
  { title: "Beranda", excerpt: "Halaman utama PT Hokiindo Raya", href: "/", type: "Halaman" },
  { title: "Tentang Kami", excerpt: "Profil, visi misi, dan perjalanan perusahaan", href: "/about", type: "Halaman" },
  { title: "Proyek", excerpt: "Daftar proyek unggulan yang pernah kami kerjakan", href: "/projects", type: "Halaman" },
  { title: "Karir", excerpt: "Bergabunglah dengan tim PT Hokiindo Raya", href: "/careers", type: "Halaman" },
  { title: "Berita", excerpt: "Artikel, insight industri, dan update terbaru", href: "/news", type: "Halaman" },
  { title: "Kontak", excerpt: "Hubungi tim kami untuk konsultasi teknis", href: "/contact", type: "Halaman" },
  { title: "Katalog Produk", excerpt: "Lihat seluruh katalog produk Siemens kami", href: "https://shop.hokiindo.co.id", type: "Halaman" },
  // Common product keywords
  { title: "ACB (Air Circuit Breaker)", excerpt: "Pemutus sirkuit udara Siemens untuk distribusi daya", href: "https://shop.hokiindo.co.id", type: "Produk" },
  { title: "MCCB (Moulded Case Circuit Breaker)", excerpt: "Circuit breaker untuk proteksi instalasi industri", href: "https://shop.hokiindo.co.id", type: "Produk" },
  { title: "MCB (Miniature Circuit Breaker)", excerpt: "Proteksi instalasi rumah dan komersial", href: "https://shop.hokiindo.co.id", type: "Produk" },
  { title: "Contactor Siemens", excerpt: "Kontaktor motor industri seri 3RT Siemens", href: "https://shop.hokiindo.co.id", type: "Produk" },
  { title: "VFD / Inverter", excerpt: "Variable Frequency Drive untuk pengendalian motor", href: "https://shop.hokiindo.co.id", type: "Produk" },
  { title: "Soft Starter", excerpt: "Pengasut motor halus Siemens", href: "https://shop.hokiindo.co.id", type: "Produk" },
  { title: "Busbar APS", excerpt: "Sistem distribusi daya kapasitas tinggi", href: "https://shop.hokiindo.co.id", type: "Produk" },
  { title: "Lampu G-Comin", excerpt: "Lampu proyek portable bertenaga tinggi", href: "https://shop.hokiindo.co.id", type: "Produk" },
  { title: "Panel Maker", excerpt: "Layanan panel maker untuk kebutuhan industri", href: "/projects", type: "Layanan" },
  { title: "Kontraktor", excerpt: "Layanan kontraktor instalasi kelistrikan", href: "/projects", type: "Layanan" },
  { title: "Pertambangan", excerpt: "Solusi kelistrikan untuk sektor pertambangan", href: "/projects", type: "Layanan" },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase() || "";

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const payload = await getPayload({ config: configPromise });

    // Search News collection
    const newsResult = await payload.find({
      collection: "news",
      where: {
        and: [
          { status: { equals: "published" } },
          {
            or: [
              { title: { like: q } },
              { excerpt: { like: q } },
              { category: { like: q } },
            ],
          },
        ],
      },
      limit: 5,
      depth: 0,
    });

    // Search Projects collection
    const projectsResult = await payload.find({
      collection: "projects",
      where: {
        or: [
          { title: { like: q } },
          { description: { like: q } },
          { location: { like: q } },
          { category: { like: q } },
        ],
      },
      limit: 5,
      depth: 0,
    });

    // Search Careers collection
    const careersResult = await payload.find({
      collection: "careers",
      where: {
        and: [
          { status: { equals: "open" } },
          {
            or: [
              { title: { like: q } },
              { department: { like: q } },
              { location: { like: q } },
            ],
          },
        ],
      },
      limit: 3,
      depth: 0,
    });

    // Filter static pages
    const matchedStatic = STATIC_PAGES.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    ).slice(0, 5);

    // Build unified result list
    const results = [
      ...matchedStatic.map((p) => ({
        type: p.type,
        title: p.title,
        excerpt: p.excerpt,
        href: p.href,
        icon: p.type === "Produk" ? "inventory_2" : p.type === "Layanan" ? "build" : "web",
      })),
      ...newsResult.docs.map((n: any) => ({
        type: "Berita",
        title: n.title,
        excerpt: n.excerpt || "",
        href: `/news/${n.slug}`,
        icon: "newspaper",
      })),
      ...projectsResult.docs.map((p: any) => ({
        type: "Proyek",
        title: p.title,
        excerpt: p.description || p.location || "",
        href: `/projects`,
        icon: "construction",
      })),
      ...careersResult.docs.map((c: any) => ({
        type: "Karir",
        title: c.title,
        excerpt: `${c.department || ""} · ${c.location || ""}`.trim().replace(/^·\s*/, ""),
        href: `/careers#job-${c.id}`,
        icon: "work",
      })),
    ];

    return NextResponse.json({ results: results.slice(0, 12) });
  } catch (err) {
    console.error("Search API error:", err);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
