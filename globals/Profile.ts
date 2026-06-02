import { GlobalConfig } from 'payload'

export const Profile: GlobalConfig = {
  slug: 'profile',
  label: 'Profil Perusahaan',
  admin: {
    group: 'Pengaturan',
  },
  access: {
    read: () => true, // Publik bisa membaca data ini via API
  },
  fields: [
    {
      name: 'namaPerusahaan',
      label: 'Nama Perusahaan',
      type: 'text',
      required: true,
      defaultValue: 'PT Hokiindo Raya',
    },
    {
      name: 'deskripsiPerusahaan',
      label: 'Deskripsi Singkat Perusahaan',
      type: 'textarea',
    },
    {
      name: 'tentang',
      label: 'Tentang Perusahaan (Detail)',
      type: 'richText',
    },
    {
      name: 'logo',
      label: 'Logo Hokiindo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'companyProfilePdf',
      label: 'Company Profile (PDF)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload file PDF Company Profile di sini',
      },
    },
    {
      name: 'favicon',
      label: 'Favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          label: 'Email',
          type: 'email',
        },
        {
          name: 'nomorTelepon',
          label: 'Nomor Telepon (Kantor)',
          type: 'text',
        },
        {
          name: 'nomorHp',
          label: 'Nomor HP / WhatsApp',
          type: 'text',
        },
      ],
    },
    {
      name: 'alamat',
      label: 'Alamat Lengkap',
      type: 'textarea',
    },
    {
      name: 'embedPeta',
      label: 'Embed Kode Peta (Google Maps iframe)',
      type: 'textarea',
      admin: {
        description: 'Masukkan kode <iframe> dari Google Maps di sini',
      },
    },
    {
      name: 'sosialMedia',
      label: 'Sosial Media',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          label: 'LinkedIn URL',
          type: 'text',
        },
        {
          name: 'instagram',
          label: 'Instagram URL',
          type: 'text',
        },
        {
          name: 'facebook',
          label: 'Facebook URL',
          type: 'text',
        },
        {
          name: 'twitter',
          label: 'Twitter / X URL',
          type: 'text',
        },
      ],
    },
    {
      name: 'badgeCertificates',
      label: 'Badge & Sertifikat',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'Gambar Sertifikat / Badge',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          label: 'Judul Sertifikat',
          type: 'text',
        },
      ],
    },
  ],
}
