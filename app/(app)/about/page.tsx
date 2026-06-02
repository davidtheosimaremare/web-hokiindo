import type { Metadata } from "next";

import AboutHero from "@/components/about/AboutHero";
import AboutTagline from "@/components/about/AboutTagline";
import AboutTimeline from "@/components/about/AboutTimeline";
import VisionMission from "@/components/about/VisionMission";
import ProductEcosystem from "@/components/about/ProductEcosystem";
import { getPayload } from "payload";
import configPromise from "@/payload.config";

export const metadata: Metadata = {
  title: "Tentang Kami | PT Hokiindo Raya",
  description:
    "Mengenal PT Hokiindo Raya — Authorized Distributor Siemens, pemenang Best Growth Distributor 2024 & 2025. Profil perusahaan, visi misi, perjalanan, dan ekosistem produk kami.",
  openGraph: {
    title: "Tentang Kami | PT Hokiindo Raya",
    description:
      "Partner solusi elektrikal terdepan di Indonesia — Authorized Siemens Distributor.",
    type: "website",
    locale: "id_ID",
  },
};

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise });
  const aboutData = await payload.findGlobal({
    slug: "about",
    depth: 2, // Populate image media relations
  });

  const hero = aboutData?.hero || {};
  const tagline = aboutData?.tagline || {};
  const timeline = aboutData?.timeline || {};
  const visionMission = aboutData?.visionMission || {};
  const productEcosystem = aboutData?.productEcosystem || {};

  return (
    <>
      <main className="flex-grow pt-[116px]">
        {/* 1. Hero — grayscale bg + display heading */}
        <AboutHero
          title={hero.title}
          subtitle={hero.subtitle}
          backgroundImage={hero.backgroundImage}
        />

        {/* 2. Tagline glass card */}
        <AboutTagline
          title={tagline.title}
          description={tagline.description}
        />

        {/* 3. Timeline perjalanan perusahaan */}
        <AboutTimeline
          badge={timeline.badge}
          judul={timeline.judul}
          deskripsi={timeline.deskripsi}
          milestones={timeline.milestones}
        />

        {/* 4. Visi & Misi */}
        <VisionMission
          badge={visionMission.badge}
          judul={visionMission.judul}
          visiJudul={visionMission.visiJudul}
          visiDeskripsi={visionMission.visiDeskripsi}
          misiJudul={visionMission.misiJudul}
          misiItems={visionMission.misiItems}
        />

        {/* 5. Solusi Produk — hierarchy ecosystem */}
        <ProductEcosystem
          badge={productEcosystem.badge}
          heading={productEcosystem.judul}
          description={productEcosystem.deskripsi}
          siemensLogo={productEcosystem.siemensLogo}
          siemensBadge={productEcosystem.siemensBadge}
          siemensTitle={productEcosystem.siemensTitle}
          siemensDescription={productEcosystem.siemensDescription}
          siemensImage={productEcosystem.siemensImage}
          gcominLogo={productEcosystem.gcominLogo}
          gcominBadge={productEcosystem.gcominBadge}
          gcominTitle={productEcosystem.gcominTitle}
          gcominDescription={productEcosystem.gcominDescription}
          gcominImage={productEcosystem.gcominImage}
          apsLogo={productEcosystem.apsLogo}
          apsBadge={productEcosystem.apsBadge}
          apsTitle={productEcosystem.apsTitle}
          apsDescription={productEcosystem.apsDescription}
          apsImage={productEcosystem.apsImage}
        />
      </main>
    </>
  );
}
