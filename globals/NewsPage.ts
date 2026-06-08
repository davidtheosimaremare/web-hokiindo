import type { GlobalConfig } from 'payload'

export const NewsPage: GlobalConfig = {
  slug: 'news-page',
  label: 'Halaman Berita',
  admin: {
    group: 'Konten Halaman',
    description: 'Atur konten hero dan pengaturan tampilan halaman Berita & Wawasan.',
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
          defaultValue: 'Updates & Insights',
        },
        {
          name: 'title',
          label: 'Judul Utama',
          type: 'text',
          defaultValue: 'Berita & Wawasan Industri',
        },
        {
          name: 'subtitle',
          label: 'Sub-judul / Deskripsi',
          type: 'textarea',
          defaultValue:
            'Temukan artikel terbaru seputar teknologi kelistrikan, automation, dan berita perusahaan PT Hokiindo Raya.',
        },
        {
          name: 'backgroundImage',
          label: 'Gambar Latar Belakang Hero',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Jika kosong, akan menggunakan gambar default Unsplash.',
          },
        },
      ],
    },

    // ── 2. Filter & Tampilan ─────────────────────────────────────────
    {
      name: 'display',
      label: '2. Pengaturan Tampilan Artikel',
      type: 'group',
      fields: [
        {
          name: 'articlesPerPage',
          label: 'Jumlah Artikel per Halaman',
          type: 'number',
          defaultValue: 9,
          min: 3,
          max: 24,
        },
        {
          name: 'showFeatured',
          label: 'Tampilkan Artikel Featured di Atas',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Jika aktif, 1 artikel terbaru akan ditampilkan lebih besar di bagian atas.',
          },
        },
        {
          name: 'showCategoryFilter',
          label: 'Tampilkan Filter Kategori',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },

    // ── 3. CTA Newsletter / Hubungi ──────────────────────────────────
    {
      name: 'cta',
      label: '3. CTA Strip Bawah (Opsional)',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          label: 'Aktifkan CTA Strip',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'title',
          label: 'Judul CTA',
          type: 'text',
          defaultValue: 'Tetap Update dengan Industri',
        },
        {
          name: 'description',
          label: 'Deskripsi CTA',
          type: 'textarea',
          defaultValue:
            'Ikuti perkembangan terbaru teknologi kelistrikan dan automation dari PT Hokiindo Raya.',
        },
        {
          name: 'buttonLabel',
          label: 'Label Tombol',
          type: 'text',
          defaultValue: 'Hubungi Kami',
        },
        {
          name: 'buttonHref',
          label: 'URL Tombol',
          type: 'text',
          defaultValue: '/contact',
        },
      ],
    },
  ],
}
