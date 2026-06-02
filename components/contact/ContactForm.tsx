"use client";

import { useState, useRef } from "react";

const products = [
  "Siemens ACB",
  "Siemens MCCB",
  "Siemens MCB",
  "Siemens Contactor",
  "APS Busbar",
  "Siemens VFD",
  "Panel Maker Services",
  "Lainnya",
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [formState, setFormState] = useState<FormState>("idle");
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggle = (product: string) => {
    setSelected((prev) =>
      prev.includes(product) ? prev.filter((p) => p !== product) : [...prev, product]
    );
  };

  const handleFile = (file: File | null) => {
    if (!file) return;
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];
    if (!allowedTypes.includes(file.type)) return;
    if (file.size > 5 * 1024 * 1024) return; // 5MB
    setUploadedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("success");
  };

  if (formState === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <span
            className="material-symbols-outlined text-green-600"
            style={{ fontSize: "40px", fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
        <h3 className="font-bold text-2xl text-[#131b2e]">Penawaran Terkirim!</h3>
        <p className="text-[#603e39] text-base max-w-sm leading-relaxed">
          Terima kasih telah menghubungi kami. Tim kami akan merespons dalam{" "}
          <strong>1 x 24 jam kerja</strong>.
        </p>
        <button
          onClick={() => {
            setFormState("idle");
            setSelected([]);
            setUploadedFile(null);
          }}
          className="btn-outline mt-2"
        >
          Kirim Pesan Lagi
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {/* Name + Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
            Nama Lengkap <span className="text-primary">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            required
            placeholder="Masukkan nama lengkap"
            className="input-field"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
            Perusahaan <span className="text-primary">*</span>
          </label>
          <input
            id="company"
            type="text"
            required
            placeholder="Nama perusahaan Anda"
            className="input-field"
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
            Email <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="email@perusahaan.com"
            className="input-field"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
            WhatsApp / Telepon
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+62 8xx xxxx xxxx"
            className="input-field"
          />
        </div>
      </div>

      {/* Product checkboxes */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
          Produk Diminati <span className="text-[#603e39] font-normal normal-case tracking-normal">(Pilih satu atau lebih)</span>
        </span>
        <div className="flex flex-wrap gap-2.5">
          {products.map((p) => {
            const checked = selected.includes(p);
            return (
              <button
                key={p}
                type="button"
                onClick={() => toggle(p)}
                aria-pressed={checked}
                className={`px-4 py-2 rounded-full border font-semibold text-sm transition-all duration-200 ${
                  checked
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white text-[#5c5f61] border-[#ebbbb4] hover:border-primary hover:text-primary"
                }`}
              >
                {checked && (
                  <span
                    className="material-symbols-outlined mr-1"
                    style={{ fontSize: "14px", fontVariationSettings: "'FILL' 1", verticalAlign: "text-bottom" }}
                  >
                    check
                  </span>
                )}
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Details */}
      <div className="flex flex-col gap-2">
        <label htmlFor="details" className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
          Detail Kebutuhan / Project Details
        </label>
        <textarea
          id="details"
          rows={5}
          placeholder="Jelaskan spesifikasi, kuantitas, atau detail proyek Anda..."
          className="input-field resize-y min-h-[120px]"
        />
      </div>

      {/* File upload */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
          Upload PO / Dokumen Pendukung{" "}
          <span className="text-[#603e39] font-normal normal-case tracking-normal">(Opsional)</span>
        </span>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files[0] ?? null);
          }}
          className={`border-2 border-dashed rounded-[1.5rem] bg-[#f2f3ff]/60 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
            dragOver ? "border-primary bg-primary/5 scale-[1.01]" : "border-[#dae2fd] hover:border-primary/60 hover:bg-[#eaedff]/40"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,image/*"
            className="sr-only"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
          {uploadedFile ? (
            <>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-3">
                <span
                  className="material-symbols-outlined text-green-600"
                  style={{ fontSize: "24px", fontVariationSettings: "'FILL' 1" }}
                >
                  insert_drive_file
                </span>
              </div>
              <p className="font-semibold text-sm text-[#131b2e] mb-1">{uploadedFile.name}</p>
              <p className="text-xs text-[#603e39]">
                {(uploadedFile.size / 1024).toFixed(0)} KB ·{" "}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                  className="text-primary underline"
                >
                  Hapus
                </button>
              </p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-[#eaedff] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#603e39]" style={{ fontSize: "24px" }}>
                  upload_file
                </span>
              </div>
              <p className="font-semibold text-sm text-[#131b2e] mb-1">Klik atau drag &amp; drop file di sini</p>
              <p className="text-xs text-[#603e39]">PDF, DOCX, atau Gambar — Maks. 5MB</p>
            </>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4 border-t border-[#ebbbb4]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#603e39]">
          Data Anda aman dan tidak akan disebarkan kepada pihak ketiga.
        </p>
        <button
          type="submit"
          disabled={formState === "submitting"}
          id="contact-submit-btn"
          className="btn-primary flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {formState === "submitting" ? (
            <>
              <span
                className="material-symbols-outlined animate-spin"
                style={{ fontSize: "18px" }}
              >
                progress_activity
              </span>
              Mengirim...
            </>
          ) : (
            <>
              Submit Penawaran
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                send
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
