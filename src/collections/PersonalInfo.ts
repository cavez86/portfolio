import type { CollectionConfig } from 'payload';

export const PersonalInfo: CollectionConfig = {
  slug: 'personal-info',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'contacts',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text', // Assuming icon names are stored as text
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'summaryInfo',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'text', // Assuming icon names are stored as text
        },
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
  ],
};
