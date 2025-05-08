import type { CollectionConfig } from 'payload';

export const SoftSkills: CollectionConfig = {
  slug: 'soft-skills',
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
      type: 'text',
      required: true,
    },
  ],
};
