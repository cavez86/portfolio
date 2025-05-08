import type { CollectionConfig } from 'payload';

export const Skills: CollectionConfig = {
  slug: 'skills',
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
      name: 'icon',
      type: 'text', // Assuming icon names are stored as text
    },
    {
      name: 'skills',
      type: 'array',
      fields: [
        {
          name: 'skill',
          label: 'Skill',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
