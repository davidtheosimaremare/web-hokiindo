
import HeroSlider from "@/components/home/HeroSlider";
import ClientsMarquee from "@/components/home/ClientsMarquee";
import AwardsSection from "@/components/home/AwardsSection";
import SiemensSection from "@/components/home/SiemensSection";
import ControlSection from "@/components/home/ControlSection";
import EcosystemSection from "@/components/home/EcosystemSection";
import ServicesSection from "@/components/home/ServicesSection";
import NewsSection from "@/components/home/NewsSection";
import { getPayload } from "payload";
import configPromise from "@/payload.config";

export const dynamic = 'force-dynamic';

/**
 * Home Page — PT Hokiindo Raya
 *
 * Fetches homepage sections configuration from Payload CMS (Global slug: "beranda").
 * Cascades configured data down to the individual section components.
 */
export default async function HomePage() {
  const env = process.env as any;
  const originalEnv = env.NODE_ENV;
  env.NODE_ENV = 'development';
  const payload = await getPayload({ config: configPromise });
  env.NODE_ENV = originalEnv;

  const beranda = await payload.findGlobal({
    slug: "beranda",
    depth: 2, // Populate image rels for hero, products, etc.
  });
  const profile = await payload.findGlobal({
    slug: "profile",
    depth: 1,
  });

  const heroSlider = beranda?.heroSlider;
  const dipercayaOleh = beranda?.dipercayaOleh;
  const perjalananKita = beranda?.perjalananKita;
  const solusiSiemens = beranda?.solusiSiemens;
  const supportEcosystem = beranda?.supportEcosystem;

  const companyProfilePdf = profile?.companyProfilePdf;
  const companyProfilePdfUrl =
    typeof companyProfilePdf === "object" && companyProfilePdf
      ? companyProfilePdf.url || undefined
      : undefined;

  return (
    <>
      <main className="flex-grow pt-[116px]">
        {/* 1. Hero Slider */}
        <div className="bg-white w-full">
          <HeroSlider slides={heroSlider} />
        </div>

        {/* 2. Clients / Partners Marquee */}
        <ClientsMarquee clients={dipercayaOleh} />

        {/* 3. Awards & Achievements */}
        <AwardsSection
          badge={perjalananKita?.badge}
          judul={perjalananKita?.judul}
          deskripsi={perjalananKita?.deskripsi}
          awards={perjalananKita?.achievements}
          companyProfilePdfUrl={companyProfilePdfUrl}
        />

        {/* 4. Siemens Products Overview */}
        <SiemensSection
          heading={solusiSiemens?.proteksiHeading}
          description={solusiSiemens?.proteksiDescription}
          heroVideo={solusiSiemens?.proteksiHeroVideo}
          catalogLink={solusiSiemens?.proteksiCatalogLink}
          contactLink={solusiSiemens?.proteksiContactLink}
          products={solusiSiemens?.proteksiProducts}
        />

        {/* 5. Siemens Control Products */}
        <ControlSection
          heading={solusiSiemens?.kontrolHeading}
          description={solusiSiemens?.kontrolDescription}
          heroImage={solusiSiemens?.kontrolHeroImage}
          products={solusiSiemens?.kontrolProducts}
        />

        {/* 6. Ecosystem Support (Busbar APS + Lampu Proyek) */}
        <EcosystemSection
          badge={supportEcosystem?.badge}
          heading={supportEcosystem?.heading}
          description={supportEcosystem?.description}
          busbarHeading={supportEcosystem?.busbarHeading}
          busbarDescription={supportEcosystem?.busbarDescription}
          busbarHeroImage={supportEcosystem?.busbarHeroImage}
          busbars={supportEcosystem?.busbarProducts}
          lightHeading={supportEcosystem?.lightHeading}
          lightDescription={supportEcosystem?.lightDescription}
          lightHeroImage={supportEcosystem?.lightHeroImage}
          lights={supportEcosystem?.lightProducts}
        />

        {/* 7. Services (Soft-sell: Konsultasi, Installing, Commissioning) */}
        <ServicesSection />

        {/* 8. News & Articles */}
        <NewsSection />
      </main>
    </>
  );
}
