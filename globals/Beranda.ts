import type { GlobalConfig } from 'payload'

export const Beranda: GlobalConfig = {
  slug: 'beranda',
  label: 'Halaman Beranda',
  admin: {
    group: 'Konten Halaman',
  },
  access: {
    read: () => true, // Public access
  },
  fields: [
    // 1. Home Slider
    {
      name: 'heroSlider',
      label: 'Home Slider (Hero)',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          label: 'Gambar Slider',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          label: 'Judul Slider',
          type: 'text',
        },
        {
          name: 'subtitle',
          label: 'Sub-judul (Deskripsi Singkat)',
          type: 'text',
        },
        {
          name: 'ctaLabel',
          label: 'Label Tombol CTA',
          type: 'text',
        },
        {
          name: 'ctaHref',
          label: 'Link / URL Tombol CTA',
          type: 'text',
        },
      ],
    },
    // 2. Dipercaya Oleh (Client Logos Marquee)
    {
      name: 'dipercayaOleh',
      label: 'Dipercaya Oleh (Logo Klien)',
      type: 'array',
      admin: {
        description: 'Tambahkan logo klien/mitra yang tampil di marquee berputar. Tidak ada batas jumlah.',
      },
      fields: [
        {
          name: 'logo',
          label: 'Logo Klien',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'namaKlien',
          label: 'Nama Klien (opsional, untuk alt text)',
          type: 'text',
        },
      ],
    },
    // 3. Perjalanan Kita (Journey / Awards)
    {
      name: 'perjalananKita',
      label: 'Perjalanan Kita (Awards)',
      type: 'group',
      fields: [
        {
          name: 'badge',
          label: 'Badge / Label Atas',
          type: 'text',
          defaultValue: 'Penghargaan & Pencapaian',
        },
        {
          name: 'judul',
          label: 'Judul Utama',
          type: 'text',
          defaultValue: 'Perjalanan Keunggulan Kami',
        },
        {
          name: 'deskripsi',
          label: 'Deskripsi Singkat',
          type: 'textarea',
          defaultValue: 'Menelusuri jejak inovasi, dedikasi, dan kepemimpinan kami dalam menyediakan solusi kelistrikan dan otomasi industri terdepan di Indonesia.',
        },
        {
          name: 'achievements',
          label: 'Daftar Penghargaan / Achievement',
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
              label: 'Judul Achievement',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Deskripsi Achievement',
              type: 'textarea',
              required: true,
            },
            {
              name: 'image',
              label: 'Foto / Gambar',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'isComingSoon',
              label: 'Coming Soon / Segera Hadir',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'detail',
              label: 'Detail Achievement (Selengkapnya)',
              type: 'richText',
            },
          ],
        },
      ],
    },
    // 3. Solusi & Produk Siemens
    {
      name: 'solusiSiemens',
      label: 'Solusi & Produk Siemens',
      type: 'group',
      fields: [
        // Proteksi Sub-section
        {
          name: 'proteksiHeading',
          label: 'Proteksi - Judul Utama',
          type: 'text',
          defaultValue: 'Solusi Proteksi Siemens',
        },
        {
          name: 'proteksiDescription',
          label: 'Proteksi - Deskripsi',
          type: 'textarea',
          defaultValue: 'Menghadirkan keandalan tinggi dan teknik modern untuk memastikan keamanan maksimal pada infrastruktur industri Anda. Produk Siemens dirancang untuk efisiensi dan performa tanpa kompromi.',
        },
        {
          name: 'proteksiHeroImage',
          type: 'upload',
          relationTo: 'media',
          admin: { hidden: true },
        },
        {
          name: 'proteksiHeroVideo',
          label: 'Proteksi - Video Utama',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'proteksiProducts',
          label: 'Proteksi - Daftar Produk',
          type: 'array',
          fields: [
            {
              name: 'name',
              label: 'Nama Produk',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Deskripsi Produk',
              type: 'textarea',
              required: true,
            },
            {
              name: 'image',
              label: 'Gambar Produk',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'link',
              label: 'Link Produk (Opsional)',
              type: 'text',
            },
          ],
        },
        {
          name: 'proteksiCatalogLink',
          label: 'Proteksi - Link Katalog',
          type: 'text',
          defaultValue: '/products/siemens-protection',
        },
        {
          name: 'proteksiContactLink',
          label: 'Proteksi - Link Kontak',
          type: 'text',
          defaultValue: '/contact',
        },
        {
          name: 'proteksiViewAllLink',
          label: 'Proteksi - Link Lihat Semua Produk',
          type: 'text',
          defaultValue: '/products/siemens-protection',
        },
        {
          name: 'proteksiViewAllCount',
          label: 'Proteksi - Jumlah Item Lihat Semua',
          type: 'text',
          defaultValue: '500+',
        },
        // Kontrol Sub-section
        {
          name: 'kontrolHeading',
          label: 'Kontrol - Judul Utama',
          type: 'text',
          defaultValue: 'Solusi Kontrol Siemens',
        },
        {
          name: 'kontrolDescription',
          label: 'Kontrol - Deskripsi',
          type: 'textarea',
          defaultValue: 'Rangkaian produk kontrol motor dan sistem Siemens yang menghadirkan presisi, efisiensi energi, dan fleksibilitas operasional untuk berbagai kebutuhan industri modern.',
        },
        {
          name: 'kontrolHeroImage',
          label: 'Kontrol - Gambar Utama',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'kontrolProducts',
          label: 'Kontrol - Daftar Produk',
          type: 'array',
          fields: [
            {
              name: 'name',
              label: 'Nama Produk',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Deskripsi Produk',
              type: 'textarea',
              required: true,
            },
            {
              name: 'image',
              label: 'Gambar Produk',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'link',
              label: 'Link Produk (Opsional)',
              type: 'text',
            },
          ],
        },
        {
          name: 'kontrolCatalogLink',
          label: 'Kontrol - Link Katalog',
          type: 'text',
          defaultValue: '/products/siemens-control',
        },
        {
          name: 'kontrolContactLink',
          label: 'Kontrol - Link Kontak',
          type: 'text',
          defaultValue: '/contact',
        },
        {
          name: 'kontrolViewAllLink',
          label: 'Kontrol - Link Lihat Semua Produk',
          type: 'text',
          defaultValue: '/products/siemens-control',
        },
        {
          name: 'kontrolViewAllCount',
          label: 'Kontrol - Jumlah Item Lihat Semua',
          type: 'text',
          defaultValue: '300+',
        },
      ],
    },
    // 4. Support Ecosystem (APS & G-Comin)
    {
      name: 'supportEcosystem',
      label: 'Ecosystem Support (APS & G-Comin)',
      type: 'group',
      fields: [
        {
          name: 'badge',
          label: 'Ecosystem - Badge Atas',
          type: 'text',
          defaultValue: 'Ekosistem Produk Pendukung',
        },
        {
          name: 'heading',
          label: 'Ecosystem - Judul Utama',
          type: 'text',
          defaultValue: 'Ekosistem Pendukung Industri',
        },
        {
          name: 'description',
          label: 'Ecosystem - Deskripsi',
          type: 'textarea',
          defaultValue: 'Hokiindo menyediakan solusi produk tambahan untuk melengkapi infrastruktur kelistrikan Anda dengan standar kualitas global.',
        },
        // Busbar APS Sub-section
        {
          name: 'busbarHeading',
          label: 'Busbar APS - Judul Sub-section',
          type: 'text',
          defaultValue: 'Busbar APS',
        },
        {
          name: 'busbarDescription',
          label: 'Busbar APS - Deskripsi',
          type: 'textarea',
          defaultValue: 'Solusi distribusi daya berkapasitas tinggi yang dirancang dengan teknik presisi. Sistem Busbar APS menawarkan efisiensi ruang maksimal, instalasi cepat, dan kemudahan maintenance jangka panjang.',
        },
        {
          name: 'busbarHeroImage',
          label: 'Busbar APS - Gambar Utama',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'busbarProducts',
          label: 'Busbar APS - Daftar Produk',
          type: 'array',
          fields: [
            {
              name: 'name',
              label: 'Nama Produk',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Deskripsi Produk',
              type: 'textarea',
              required: true,
            },
            {
              name: 'image',
              label: 'Gambar Produk (Opsional)',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'link',
              label: 'Link Produk (Opsional)',
              type: 'text',
            },
          ],
        },
        // G-Comin Sub-section
        {
          name: 'lightHeading',
          label: 'Lampu G-Comin - Judul Sub-section',
          type: 'text',
          defaultValue: 'Lampu Proyek Portable G-Comin',
        },
        {
          name: 'lightDescription',
          label: 'Lampu G-Comin - Deskripsi',
          type: 'textarea',
          defaultValue: 'Pencahayaan portabel dengan daya tahan ekstrem untuk lingkungan kerja yang menantang. Menghadirkan intensitas cahaya tinggi dengan efisiensi energi optimal.',
        },
        {
          name: 'lightHeroImage',
          label: 'Lampu G-Comin - Gambar Utama',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'lightProducts',
          label: 'Lampu G-Comin - Daftar Produk',
          type: 'array',
          fields: [
            {
              name: 'name',
              label: 'Nama Produk',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Deskripsi Produk',
              type: 'textarea',
              required: true,
            },
            {
              name: 'image',
              label: 'Gambar Produk (Opsional)',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'link',
              label: 'Link Produk (Opsional)',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
