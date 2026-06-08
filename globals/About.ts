import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'Halaman Tentang Kami',
  admin: {
    group: 'Konten Halaman',
  },
  access: {
    read: () => true, // Public access
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
          label: 'Judul Utama',
          type: 'text',
          required: true,
          defaultValue: 'Membangun Masa Depan Kelistrikan Indonesia',
        },
        {
          name: 'subtitle',
          label: 'Deskripsi Singkat',
          type: 'textarea',
          defaultValue: 'Menghubungkan inovasi global dengan kebutuhan industri lokal melalui presisi dan dedikasi tanpa kompromi.',
        },
        {
          name: 'backgroundImage',
          label: 'Gambar Latar Belakang (Hero)',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    // 2. Tagline Section
    {
      name: 'tagline',
      label: 'Tagline Section',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Tagline Utama',
          type: 'text',
          required: true,
          defaultValue: 'Sustainable Solutions, Built on Trust.',
        },
        {
          name: 'description',
          label: 'Keterangan Tagline',
          type: 'textarea',
          defaultValue: 'Setiap produk yang kami hadirkan adalah wujud komitmen terhadap kualitas, keandalan, dan kepercayaan mitra industri Indonesia.',
        },
      ],
    },
    // 3. Timeline Section
    {
      name: 'timeline',
      label: 'Timeline Perjalanan',
      type: 'group',
      fields: [
        {
          name: 'badge',
          label: 'Badge / Label Atas',
          type: 'text',
          defaultValue: 'Milestone Perusahaan',
        },
        {
          name: 'judul',
          label: 'Judul Utama',
          type: 'text',
          defaultValue: 'Perjalanan Kami',
        },
        {
          name: 'deskripsi',
          label: 'Deskripsi Singkat',
          type: 'textarea',
          defaultValue: 'Langkah demi langkah menuju keunggulan dan kepercayaan industri.',
        },
        {
          name: 'milestones',
          label: 'Daftar Milestone',
          type: 'array',
          fields: [
            {
              name: 'year',
              label: 'Tahun',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              label: 'Judul Milestone',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Deskripsi Detail',
              type: 'textarea',
              required: true,
            },
            {
              name: 'icon',
              label: 'Icon ID (Material Symbol, misal: verified, hub, trending_up)',
              type: 'text',
              defaultValue: 'verified',
            },
          ],
        },
      ],
    },
    // 4. Visi & Misi Section
    {
      name: 'visionMission',
      label: 'Visi & Misi',
      type: 'group',
      fields: [
        {
          name: 'badge',
          label: 'Badge / Label Atas',
          type: 'text',
          defaultValue: 'Visi & Misi',
        },
        {
          name: 'judul',
          label: 'Judul Utama',
          type: 'text',
          defaultValue: 'Arah & Tujuan Kami',
        },
        // Visi
        {
          name: 'visiJudul',
          label: 'Judul Visi',
          type: 'text',
          defaultValue: 'Visi Kami',
        },
        {
          name: 'visiDeskripsi',
          label: 'Deskripsi Visi',
          type: 'textarea',
          defaultValue: 'Menjadi partner solusi elektrikal terdepan di Indonesia yang mengutamakan kualitas, keandalan, dan inovasi berkelanjutan.',
        },
        // Misi
        {
          name: 'misiJudul',
          label: 'Judul Misi',
          type: 'text',
          defaultValue: 'Misi Kami',
        },
        {
          name: 'misiItems',
          label: 'Poin-poin Misi',
          type: 'array',
          fields: [
            {
              name: 'text',
              label: 'Pernyataan Misi',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    // 5. Product Ecosystem Section
    {
      name: 'productEcosystem',
      label: 'Ekosistem Produk',
      type: 'group',
      fields: [
        {
          name: 'badge',
          label: 'Badge / Label Atas',
          type: 'text',
          defaultValue: 'Ekosistem Produk',
        },
        {
          name: 'judul',
          label: 'Judul Utama',
          type: 'text',
          defaultValue: 'Solusi Produk Kami',
        },
        {
          name: 'deskripsi',
          label: 'Deskripsi Singkat',
          type: 'textarea',
          defaultValue: 'Kami menghadirkan teknologi mutakhir untuk mendukung efisiensi dan keamanan infrastruktur industri Anda.',
        },
        // Siemens Level
        {
          name: 'siemensLogo',
          label: 'Siemens - Logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'siemensBadge',
          label: 'Siemens - Badge',
          type: 'text',
          defaultValue: 'Primary Partner',
        },
        {
          name: 'siemensTitle',
          label: 'Siemens - Judul',
          type: 'text',
          defaultValue: 'Authorized Siemens Solutions',
        },
        {
          name: 'siemensDescription',
          label: 'Siemens - Deskripsi',
          type: 'textarea',
          defaultValue: 'Menyediakan rangkaian lengkap perangkat otomasi dan distribusi tenaga listrik Siemens dengan dukungan teknis bersertifikasi untuk keandalan maksimal operasional Anda.',
        },
        {
          name: 'siemensImage',
          label: 'Siemens - Gambar',
          type: 'upload',
          relationTo: 'media',
        },
        // G-Comin
        {
          name: 'gcominLogo',
          label: 'G-Comin - Logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'gcominBadge',
          label: 'G-Comin - Badge',
          type: 'text',
          defaultValue: 'G-COMIN',
        },
        {
          name: 'gcominTitle',
          label: 'G-Comin - Judul',
          type: 'text',
          defaultValue: 'Lampu Proyek Portable',
        },
        {
          name: 'gcominDescription',
          label: 'G-Comin - Deskripsi',
          type: 'textarea',
          defaultValue: 'Solusi pencahayaan industrial yang tangguh dan mudah dipindahkan, dirancang khusus untuk area kerja ekstrem dengan daya tahan tinggi.',
        },
        {
          name: 'gcominImage',
          label: 'G-Comin - Gambar',
          type: 'upload',
          relationTo: 'media',
        },
        // APS
        {
          name: 'apsLogo',
          label: 'APS - Logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'apsBadge',
          label: 'APS - Badge',
          type: 'text',
          defaultValue: 'APS',
        },
        {
          name: 'apsTitle',
          label: 'APS - Judul',
          type: 'text',
          defaultValue: 'Busbar APS',
        },
        {
          name: 'apsDescription',
          label: 'APS - Deskripsi',
          type: 'textarea',
          defaultValue: 'Sistem distribusi tenaga listrik busway yang efisien dan fleksibel, meminimalkan penggunaan kabel serta memberikan kemudahan dalam pemeliharaan.',
        },
        {
          name: 'apsImage',
          label: 'APS - Gambar',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
