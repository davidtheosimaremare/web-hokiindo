import { GlobalConfig } from 'payload'

export const CareersPage: GlobalConfig = {
  slug: 'careers-page',
  label: 'Halaman Karir',
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
          name: 'badge',
          label: 'Badge Atas',
          type: 'text',
          defaultValue: 'Bergabung Bersama Kami',
          required: true,
        },
        {
          name: 'title',
          label: 'Judul Utama',
          type: 'text',
          defaultValue: 'Bertumbuh Bersama PT Hokiindo Raya',
          required: true,
        },
        {
          name: 'description',
          label: 'Deskripsi Hero',
          type: 'textarea',
          defaultValue: 'Kami mencari talenta terbaik untuk bergabung dalam tim yang dinamis, inovatif, dan berdedikasi tinggi. Temukan potensi maksimal Anda bersama kami dalam lingkungan kerja yang mengedepankan kolaborasi dan keunggulan.',
          required: true,
        },
        {
          name: 'backgroundImage',
          label: 'Gambar Latar Belakang (Hero)',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    // 2. Budaya & Nilai Kami
    {
      name: 'culture',
      label: 'Budaya & Nilai Kami (DNA)',
      type: 'group',
      fields: [
        {
          name: 'badge',
          label: 'Badge Atas',
          type: 'text',
          defaultValue: 'DNA Perusahaan',
          required: true,
        },
        {
          name: 'title',
          label: 'Judul Utama',
          type: 'text',
          defaultValue: 'Budaya & Nilai Kami',
          required: true,
        },
        {
          name: 'description',
          label: 'Deskripsi',
          type: 'textarea',
          defaultValue: 'Kami percaya bahwa inovasi lahir dari kebebasan berekspresi dan dedikasi pada proses. Nilai-nilai ini menjadi panduan kami dalam setiap langkah.',
          required: true,
        },
        {
          name: 'values',
          label: 'Nilai-Nilai DNA',
          type: 'array',
          fields: [
            {
              name: 'icon',
              label: 'Nama Ikon Material Symbol (contoh: lightbulb, precision_manufacturing, trending_up)',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              label: 'Judul Nilai',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Deskripsi',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },

    // 4. Lowongan Kerja (Heading)
    {
      name: 'jobsHeading',
      label: 'Bagian Lowongan Kerja',
      type: 'group',
      fields: [
        {
          name: 'badge',
          label: 'Badge Atas',
          type: 'text',
          defaultValue: 'Lowongan Kerja',
          required: true,
        },
        {
          name: 'title',
          label: 'Judul Utama',
          type: 'text',
          defaultValue: 'Posisi yang Tersedia',
          required: true,
        },
        {
          name: 'description',
          label: 'Deskripsi',
          type: 'textarea',
          defaultValue: 'Jelajahi peluang karir dan temukan peran yang sesuai dengan passion Anda.',
          required: true,
        },
      ],
    },
    // 5. CTA Bottom
    {
      name: 'cta',
      label: 'Bagian CTA Bawah',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Judul Utama',
          type: 'text',
          defaultValue: 'Siap Mengambil Langkah Berikutnya?',
          required: true,
        },
        {
          name: 'description',
          label: 'Deskripsi',
          type: 'textarea',
          defaultValue: 'Bergabunglah dengan tim yang berkomitmen menghadirkan teknologi terbaik untuk industri Indonesia.',
          required: true,
        },
      ],
    },
  ],
}
