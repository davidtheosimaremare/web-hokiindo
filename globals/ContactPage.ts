import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Halaman Kontak',
  admin: {
    group: 'Konten Halaman',
    description: 'Atur semua konten yang tampil di halaman Hubungi Kami.',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ── 1. Hero ─────────────────────────────────────────────────────
    {
      name: 'hero',
      label: '1. Hero Section',
      type: 'group',
      fields: [
        {
          name: 'badge',
          label: 'Badge Atas',
          type: 'text',
          defaultValue: 'Siemens Authorized Partner',
        },
        {
          name: 'title',
          label: 'Judul Utama',
          type: 'text',
          defaultValue: 'Hubungi Kami',
        },
        {
          name: 'subtitle',
          label: 'Sub-judul / Deskripsi',
          type: 'textarea',
          defaultValue:
            'Konsultasi teknis, pertanyaan produk, atau dukungan proyek. Tim ahli kami siap memberikan solusi rekayasa presisi untuk kebutuhan industrial Anda.',
        },
        {
          name: 'highlights',
          label: 'Poin Unggulan (ikon + teks)',
          type: 'array',
          maxRows: 4,
          admin: {
            description:
              'Tampil di bawah deskripsi hero. Gunakan nama ikon dari Material Symbols (contoh: schedule, support_agent, language).',
          },
          fields: [
            {
              name: 'icon',
              label: 'Ikon (Material Symbol)',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              label: 'Teks',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // ── 2. Form Penawaran ────────────────────────────────────────────
    {
      name: 'form',
      label: '2. Bagian Form Penawaran',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Judul Form',
          type: 'text',
          defaultValue: 'Minta Penawaran',
        },
        {
          name: 'description',
          label: 'Deskripsi Form',
          type: 'textarea',
          defaultValue:
            'Isi form di bawah ini untuk mendapatkan estimasi harga atau detail produk lebih lanjut. Kami akan merespons dalam 1 x 24 jam kerja.',
        },
      ],
    },

    // ── 3. Kartu Kontak Tambahan ─────────────────────────────────────
    {
      name: 'extraCards',
      label: '3. Kartu Kontak Tambahan',
      type: 'array',
      admin: {
        description:
          'Tambahkan kartu kontak tambahan selain Kantor, Email, dan WhatsApp yang diambil otomatis dari Profil.',
      },
      fields: [
        {
          name: 'icon',
          label: 'Ikon (Material Symbol)',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          label: 'Judul Kartu',
          type: 'text',
          required: true,
        },
        {
          name: 'lines',
          label: 'Teks (pisahkan baris dengan Enter)',
          type: 'textarea',
        },
        {
          name: 'linkLabel',
          label: 'Label Tautan (opsional)',
          type: 'text',
        },
        {
          name: 'linkHref',
          label: 'URL Tautan (opsional)',
          type: 'text',
        },
      ],
    },

    // ── 4. CTA Bawah ────────────────────────────────────────────────
    {
      name: 'cta',
      label: '4. CTA Strip Bawah',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          label: 'Teks Kecil Atas',
          type: 'text',
          defaultValue: 'Butuh Bantuan Segera?',
        },
        {
          name: 'title',
          label: 'Judul Utama',
          type: 'text',
          defaultValue: 'Hubungi Sales Engineer Kami Langsung',
        },
      ],
    },
  ],
}
