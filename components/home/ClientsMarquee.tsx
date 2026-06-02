export interface ClientItem {
  id: string;
  name: string;
  logoUrl?: string;
}

// Shape from Payload CMS (dipercayaOleh array)
interface CmsClientItem {
  id?: string;
  namaKlien?: string;
  logo?: { url?: string; alt?: string } | string;
}

interface ClientsMarqueeProps {
  // Accepts either raw CMS data or already-normalized ClientItem[]
  clients?: CmsClientItem[] | ClientItem[];
}

const defaultClients: ClientItem[] = [
  { id: "c1", name: "PLN Persero" },
  { id: "c2", name: "Pertamina" },
  { id: "c3", name: "Freeport Indonesia" },
  { id: "c4", name: "Krakatau Steel" },
  { id: "c5", name: "Indah Kiat" },
  { id: "c6", name: "Semen Indonesia" },
  { id: "c7", name: "Chandra Asri" },
  { id: "c8", name: "Pabrik Gula Rajawali" },
];

/** Normalize whatever Payload returns into a flat ClientItem */
function normalize(raw: CmsClientItem | ClientItem): ClientItem {
  // Already normalized (has logoUrl key)
  if ("logoUrl" in raw) return raw as ClientItem;

  const cms = raw as CmsClientItem;
  const logoUrl =
    typeof cms.logo === "object" && cms.logo ? cms.logo.url ?? undefined : undefined;

  return {
    id: cms.id ?? Math.random().toString(36).slice(2),
    name: cms.namaKlien ?? cms.logo?.toString() ?? "Klien",
    logoUrl,
  };
}

function ClientLogo({ client }: { client: ClientItem }) {
  if (client.logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={client.logoUrl}
        alt={client.name}
        className="h-16 md:h-20 w-auto max-w-[200px] object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
      />
    );
  }
  return (
    <span className="text-2xl font-bold text-[#603e39]/30 whitespace-nowrap px-6 tracking-widest uppercase hover:text-[#603e39]/50 transition-colors">
      {client.name}
    </span>
  );
}

export default function ClientsMarquee({ clients }: ClientsMarqueeProps) {
  const items: ClientItem[] =
    clients && clients.length > 0
      ? (clients as (CmsClientItem | ClientItem)[]).map(normalize)
      : defaultClients;

  return (
    <section
      className="py-10 bg-white border-b border-[#eaedff]"
      aria-label="Klien dan mitra kami"
    >
      <p className="text-center text-xs font-semibold text-[#603e39]/40 tracking-[0.25em] uppercase mb-8">
        Dipercaya oleh
      </p>
      <div className="marquee-wrapper">
        {/* First set */}
        <div className="marquee-content" aria-hidden="false">
          {items.map((c) => (
            <ClientLogo key={c.id} client={c} />
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="marquee-content" aria-hidden="true">
          {items.map((c) => (
            <ClientLogo key={`dup-${c.id}`} client={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
