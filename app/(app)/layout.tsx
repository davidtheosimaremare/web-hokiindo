import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { getPayload } from "payload";
import configPromise from "@/payload.config";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise });
  const profile = await payload.findGlobal({
    slug: "profile",
    depth: 1, // Populate favicon media object
  });

  return {
    title: `${profile?.namaPerusahaan || "PT Hokiindo Raya"} | Authorized Siemens Distributor Indonesia`,
    description:
      profile?.deskripsiPerusahaan ||
      "PT Hokiindo Raya — Distributor resmi Siemens & perangkat elektrikal industri terpercaya di Indonesia. Pemenang Best Growth Distributor 2024 & 2025.",
    keywords:
      "Hokiindo Raya, Siemens distributor Indonesia, ACB, MCCB, MCB, RCBO, Busbar APS, Lampu Proyek Portable, G-Comin, otomasi industri",
    icons: profile?.favicon?.url ? { icon: profile.favicon.url } : undefined,
    openGraph: {
      title: `${profile?.namaPerusahaan || "PT Hokiindo Raya"} | Authorized Siemens Distributor Indonesia`,
      description:
        profile?.deskripsiPerusahaan ||
        "Distributor resmi Siemens & ekosistem produk elektrikal industri — Pemenang Best Growth Distributor 2024 & 2025.",
      type: "website",
      locale: "id_ID",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = await getPayload({ config: configPromise });
  const profile = await payload.findGlobal({
    slug: "profile",
    depth: 1, // depth 1 to populate media relations like logo
  });

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Google Fonts — Plus Jakarta Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols Outlined */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col frontend-body" suppressHydrationWarning>
        <Navbar profile={profile} />
        {children}
        <Footer profile={profile} />
        <FloatingWhatsApp phoneNumber={profile?.nomorHp} />
      </body>
    </html>
  );
}
