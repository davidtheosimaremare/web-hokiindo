"use client";

import React, { useState } from "react";

// Rich Text parser for Lexical editor in Payload CMS
function renderRichText(content: any): React.ReactNode {
  if (!content || !content.root || !content.root.children) return null;

  return content.root.children.map((block: any, idx: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={idx} className="mb-3 last:mb-0 leading-relaxed text-xs md:text-sm text-[#603e39]">
            {block.children?.map((child: any, cIdx: number) => renderTextNode(child, cIdx))}
          </p>
        );
      case "heading":
        const Tag = (`h${block.tag || "3"}`) as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        const headingClass =
          block.tag === "h1"
            ? "text-2xl font-bold mt-4 mb-3 text-[#131b2e]"
            : block.tag === "h2"
            ? "text-xl font-bold mt-3 mb-2 text-[#131b2e]"
            : "text-base font-bold mt-2 mb-2 text-[#131b2e]";
        return (
          <Tag key={idx} className={headingClass}>
            {block.children?.map((child: any, cIdx: number) => renderTextNode(child, cIdx))}
          </Tag>
        );
      case "list":
        const ListTag = block.listType === "number" ? "ol" : "ul";
        const listClass =
          block.listType === "number"
            ? "list-decimal pl-5 mb-3 space-y-1.5"
            : "list-disc pl-5 mb-3 space-y-1.5";
        return (
          <ListTag key={idx} className={listClass}>
            {block.children?.map((child: any, cIdx: number) => (
              <li key={cIdx} className="leading-relaxed text-xs md:text-sm text-[#603e39]">
                {child.children?.map((node: any, nIdx: number) => renderTextNode(node, nIdx))}
              </li>
            ))}
          </ListTag>
        );
      default:
        return null;
    }
  });
}

function renderTextNode(node: any, idx: number): React.ReactNode {
  if (node.type !== "text") return null;
  let text: React.ReactNode = node.text;
  if (node.format & 1) text = <strong key={idx}>{text}</strong>;
  if (node.format & 2) text = <em key={idx}>{text}</em>;
  if (node.format & 8) text = <u key={idx}>{text}</u>;
  return <span key={idx}>{text}</span>;
}

function renderJobContent(content: any): React.ReactNode {
  if (!content) return null;
  if (typeof content === "string") {
    return content.split("\n").map((line, i) => (
      <p key={i} className="mb-1.5 last:mb-0 text-xs md:text-sm text-[#603e39] leading-relaxed">
        {line}
      </p>
    ));
  }
  return renderRichText(content);
}

interface JobCardProps {
  job: any;
  contactEmail: string;
}

export default function JobCard({ job, contactEmail }: JobCardProps) {
  const [qualOpen, setQualOpen] = useState(false);

  const hasRequirements = !!job.requirements;
  const hasSkills =
    "skills" in job && (job as any).skills && (job as any).skills.length > 0;

  return (
    <div
      id={`job-${job.id}`}
      className="group relative bg-white rounded-[2rem] border border-[#eaedff] hover:border-primary/20 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(188,1,0,0.08)] overflow-hidden"
    >
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary/40 via-primary to-primary/40 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-7 md:p-9">
        {/* — Header row — */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 mb-6">
          <div className="flex-grow">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {job.department && (
                <span className="px-3 py-0.5 bg-primary/8 text-primary text-[11px] font-bold rounded-full border border-primary/15 uppercase tracking-wide">
                  {job.department}
                </span>
              )}
              <span className="px-3 py-0.5 bg-[#f2f3ff] text-[#5c5f61] text-[11px] font-semibold rounded-full border border-[#e0e3f0]">
                {job.type}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-0.5 bg-[#f2f3ff] text-[#5c5f61] text-[11px] font-semibold rounded-full border border-[#e0e3f0]">
                <span className="material-symbols-outlined" style={{ fontSize: "11px" }}>
                  location_on
                </span>
                {job.location}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-[20px] md:text-[22px] text-[#131b2e] leading-snug">
              {job.title}
            </h3>
          </div>

          {/* CTA — desktop */}
          <a
            href={`mailto:${contactEmail}?subject=Application%20for%20${encodeURIComponent(job.title)}`}
            id={`job-apply-${job.id}`}
            className="hidden md:inline-flex flex-shrink-0 items-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(188,1,0,0.3)] transition-all duration-300 whitespace-nowrap group/btn"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              send
            </span>
            Kirim CV
          </a>
        </div>

        {/* — Divider — */}
        <div className="border-t border-[#f0f2ff] mb-5" />

        {/* — Description — */}
        <div className="pl-4 border-l-2 border-[#dae2fd] mb-5 max-w-3xl">
          {renderJobContent(job.description)}
        </div>

        {/* — Skill chips — */}
        {hasSkills && (
          <div className="flex flex-wrap gap-2 mb-5">
            {(job as any).skills.map((skill: any) => (
              <span
                key={skill.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f8f9ff] text-[#5c5f61] text-[11px] font-semibold rounded-xl border border-[#e8ecff]"
              >
                <span
                  className="material-symbols-outlined text-primary/70"
                  style={{ fontSize: "13px" }}
                >
                  {skill.icon}
                </span>
                {skill.label}
              </span>
            ))}
          </div>
        )}

        {/* — Collapsible Qualifications — */}
        {hasRequirements && (
          <div>
            <button
              type="button"
              onClick={() => setQualOpen((v) => !v)}
              aria-expanded={qualOpen}
              aria-controls={`qual-${job.id}`}
              className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
            >
              <span
                className="w-6 h-6 rounded-full bg-[#f2f3ff] border border-[#dae2fd] flex items-center justify-center transition-transform duration-300"
                style={{ transform: qualOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  expand_more
                </span>
              </span>
              {qualOpen ? "Sembunyikan Kualifikasi" : "Lihat Kualifikasi"}
            </button>

            {/* Animated panel */}
            <div
              id={`qual-${job.id}`}
              style={{
                maxHeight: qualOpen ? "800px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#f8f9ff] to-[#f2f3ff] border border-[#e8ecff] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-full bg-[#eaedff] flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontSize: "15px", fontVariationSettings: "'FILL' 1" }}
                    >
                      checklist
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-[#131b2e] uppercase tracking-widest">
                    Kualifikasi &amp; Persyaratan
                  </h4>
                </div>
                <div className="max-w-3xl">
                  {renderJobContent(job.requirements)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* — CTA mobile — */}
        <a
          href={`mailto:${contactEmail}?subject=Application%20for%20${encodeURIComponent(job.title)}`}
          className="md:hidden mt-6 w-full inline-flex justify-center items-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
            send
          </span>
          Kirim CV
        </a>
      </div>
    </div>
  );
}
