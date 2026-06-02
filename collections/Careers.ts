import type { CollectionConfig } from 'payload'

export const Careers: CollectionConfig = {
  slug: 'careers',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'department', 'type', 'status'],
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
      name: 'department',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Full Time', value: 'Full Time' },
        { label: 'Part Time', value: 'Part Time' },
        { label: 'Contract', value: 'Contract' },
        { label: 'Internship', value: 'Internship' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Tangerang',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'open',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'requirements',
      type: 'richText',
      required: true,
    },
  ],
}
