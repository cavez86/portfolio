import type { CollectionConfig } from 'payload';

export const Experience: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'company',
  },
  fields: [
    {
      name: 'company',
      required: true,
      type: 'text',
    },
    {
      localized: true,
      name: 'location',
      type: 'text',
    },
    {
      name: 'position',
      required: true,
      type: 'text',
    },
    {
      fields: [
        {
          name: 'dateFrom',
          required: true,
          type: 'date',
        },
        {
          name: 'dateTo',
          type: 'date',
        },
      ],
      name: 'period',
      type: 'group',
    },
    {
      fields: [
        {
          localized: true,
          name: 'label',
          required: true,
          type: 'text',
        },
        {
          localized: true,
          name: 'description',
          required: true,
          type: 'textarea',
        },
      ],
      name: 'achievements',
      type: 'array',
    },
  ],
  slug: 'experience',
};
