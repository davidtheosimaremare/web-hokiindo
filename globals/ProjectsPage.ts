import type { GlobalConfig } from 'payload'

export const ProjectsPage: GlobalConfig = {
  slug: 'projects-page',
  label: 'Halaman Proyek',
  admin: {
    group: 'Konten Halaman',
  },
  access: {
    read: () => true,
  },
  fields: [
    // 1. Hero Section
    {
      name: 'hero',
      label: 'Hero Section',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Judul Utama (Sebelum Teks Highlight)',
          type: 'text',
          required: true,
          defaultValue: 'Membangun Kepercayaan Melalui',
        },
        {
          name: 'titleHighlight',
          label: 'Teks Highlight (Warna Merah)',
          type: 'text',
          required: true,
          defaultValue: 'Proyek Strategis',
        },
        {
          name: 'description',
          label: 'Deskripsi Hero',
          type: 'textarea',
          defaultValue: 'Dedikasi kami dalam menyediakan solusi kelistrikan terpercaya di seluruh pelosok Indonesia. Menghadirkan teknologi presisi untuk masa depan industri.',
        },
        {
          name: 'backgroundImage',
          label: 'Gambar Latar Belakang (Hero)',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    // 2. Map Section
    {
      name: 'map',
      label: 'Peta Sebaran Proyek',
      type: 'group',
      fields: [
        {
          name: 'badge',
          label: 'Badge Atas',
          type: 'text',
          defaultValue: 'Sebaran Proyek Nasional',
        },
        {
          name: 'title',
          label: 'Judul Peta',
          type: 'text',
          defaultValue: 'Jejak Proyek Kami',
        },
        {
          name: 'description',
          label: 'Deskripsi Peta',
          type: 'textarea',
          defaultValue: 'Jaringan distribusi dan instalasi yang menjangkau pusat-pusat industri nasional.',
        },
        // Stats
        {
          name: 'stats',
          label: 'Statistik Ringkas',
          type: 'array',
          fields: [
            {
              name: 'value',
              label: 'Nilai (Contoh: 100+)',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              label: 'Label Statistik (Contoh: Total Proyek)',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
