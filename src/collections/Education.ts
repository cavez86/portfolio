import type { CollectionConfig } from 'payload';

export const Education: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'degree',
  },
  fields: [
    {
      localized: true,
      name: 'degree',
      required: true,
      type: 'text',
    },
    {
      name: 'institution',
      required: true,
      type: 'text',
    },
    {
      name: 'period',
      required: true,
      type: 'text',
    },
  ],
  slug: 'education',
};
