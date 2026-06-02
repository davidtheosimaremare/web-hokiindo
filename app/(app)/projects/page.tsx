import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@/payload.config";

import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectMap from "@/components/projects/ProjectMap";
import ProjectList from "@/components/projects/ProjectList";
import type { Project } from "@/components/projects/ProjectList";
import type { MapLocation } from "@/components/projects/ProjectMap";

export const metadata: Metadata = {
  title: "Portofolio Proyek | PT Hokiindo Raya",
  description:
    "Portofolio proyek instalasi kelistrikan industri PT Hokiindo Raya — panel tegangan rendah, distribusi daya, busbar, proteksi zona berbahaya di seluruh Indonesia.",
  openGraph: {
    title: "Portofolio Proyek | PT Hokiindo Raya",
    description:
      "Jejak proyek elektrikal kami di Jakarta, Surabaya, Balikpapan, Makassar, dan Medan.",
    type: "website",
    locale: "id_ID",
  },
};

export default async function ProjectsPage() {
  const payload = await getPayload({ config: configPromise });
  
  // Fetch Projects Page configuration
  const pageData = await payload.findGlobal({
    slug: "projects-page",
    depth: 2,
  });

  const { docs: projectDocs } = await payload.find({
    collection: "projects",
    depth: 1,
    limit: 100,
    sort: "-year",
  });

  // Group projects for map pins based on mapX and mapY from DB
  const locationGroups: Record<string, { label: string; count: number; x: string; y: string }> = {};

  projectDocs.forEach((doc) => {
    if (doc.mapX && doc.mapY) {
      let cityLabel = doc.location || "Proyek";
      if (doc.location) {
        const parts = doc.location.split(',').map((p: string) => p.trim());
        if (parts.length > 1) {
          if (parts[parts.length - 1].toLowerCase() === 'indonesia' || parts[parts.length - 1].toLowerCase() === 'id') {
            cityLabel = parts[parts.length - 2];
          } else {
            cityLabel = parts[parts.length - 1];
          }
        }
      }

      const key = `${doc.mapX.trim()}_${doc.mapY.trim()}`;
      if (!locationGroups[key]) {
        locationGroups[key] = {
          label: cityLabel,
          count: 0,
          x: doc.mapX.trim(),
          y: doc.mapY.trim(),
        };
      }
      locationGroups[key].count += 1;
    }
  });

  const projectLocations: MapLocation[] = Object.values(locationGroups).map((loc, idx) => ({
    id: `db-loc-${idx}`,
    label: loc.label,
    count: loc.count,
    x: loc.x,
    y: loc.y,
  }));

  const projectsData: Project[] = projectDocs.map((doc) => {
    const imageUrl =
      typeof doc.featuredImage === "object" && doc.featuredImage !== null && "url" in doc.featuredImage
        ? doc.featuredImage.url || ""
        : "";

    return {
      id: String(doc.id),
      year: doc.year,
      client: doc.client,
      title: doc.title,
      location: doc.location || "",
      category: doc.category as "Panel Maker" | "Kontraktor" | "Pertambangan",
      image: imageUrl,
      href: `/projects/${doc.slug}`,
    };
  });

  return (
    <>
      <main className="flex-grow pt-[116px]">
        {/* 1. Hero */}
        <ProjectsHero heroData={pageData?.hero} />

        {/* 2. Interactive Project Map */}
        <ProjectMap mapData={pageData?.map} projectLocations={projectLocations} />

        {/* 3. Filterable Project List */}
        <ProjectList projects={projectsData.length > 0 ? projectsData : undefined} />
      </main>
    </>
  );
}
