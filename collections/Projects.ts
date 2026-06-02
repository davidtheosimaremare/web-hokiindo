import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'year', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'client',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Panel Maker', value: 'Panel Maker' },
        { label: 'Kontraktor', value: 'Kontraktor' },
        { label: 'Pertambangan', value: 'Pertambangan' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Selesai', value: 'Selesai' },
        { label: 'Sedang Berjalan', value: 'Sedang Berjalan' },
      ],
      defaultValue: 'Selesai',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'mapX',
      label: 'Posisi X (%) di Peta',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Koordinat horizontal pin peta (contoh: 34%)',
      },
    },
    {
      name: 'mapY',
      label: 'Posisi Y (%) di Peta',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Koordinat vertikal pin peta (contoh: 62%)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'challenges',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: {
            description: 'Nama ikon dari Google Material Symbols (contoh: bolt, shield, timer, hub, electric_meter, apartment, emergency)',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'specs',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
