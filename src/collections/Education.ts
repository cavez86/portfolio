import type { CollectionConfig } from 'payload';

export const Education: CollectionConfig = {
  slug: 'education',
  admin: {
    useAsTitle: 'degree',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'degree',
      type: 'text',
      required: true,
    },
    {
      name: 'institution',
      type: 'text',
      required: true,
    },
    {
      name: 'period',
      type: 'text',
      required: true,
    },
  ],
};
