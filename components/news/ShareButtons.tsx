"use client";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {
        // User cancelled or not supported
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleMailShare = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(
      `Saya menemukan artikel menarik dari PT Hokiindo Raya:\n\n${title}\n\n${window.location.href}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold text-[#5c5f61] uppercase tracking-wider">
        Bagikan:
      </span>
      <button
        onClick={handleShare}
        aria-label="Bagikan artikel"
        className="w-10 h-10 rounded-full bg-[#eaedff] flex items-center justify-center text-[#131b2e] hover:bg-primary hover:text-white transition-all duration-200"
      >
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
          share
        </span>
      </button>
      <button
        onClick={handleMailShare}
        aria-label="Bagikan via email"
        className="w-10 h-10 rounded-full bg-[#eaedff] flex items-center justify-center text-[#131b2e] hover:bg-primary hover:text-white transition-all duration-200"
      >
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
          mail
        </span>
      </button>
    </div>
  );
}
