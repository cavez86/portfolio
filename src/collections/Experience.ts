import type { CollectionConfig } from 'payload';

export const Experience: CollectionConfig = {
  slug: 'experience',
  admin: {
    useAsTitle: 'company',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
    },
    {
      name: 'period',
      type: 'group',
      fields: [
        {
          name: 'dateFrom',
          type: 'date',
          required: true,
        },
        {
          name: 'dateTo',
          type: 'date',
        },
      ],
    },
    {
      name: 'achievements',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
      ],
    },
  ],
};
