import type { CollectionConfig } from 'payload';

export const Languages: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'language', // Using the populated field for the admin title
  },
  fields: [
    {
      label: 'Language',
      localized: true,
      name: 'language',
      required: true,
      type: 'text',
      unique: true, // Ensure that each language is unique
    },
    {
      label: 'Proficiency',
      localized: true,
      name: 'proficiency',
      required: true,
      type: 'text',
    },
    {
      max: 100,
      min: 0,
      name: 'level',
      required: true,
      type: 'number',
    },
  ],
  slug: 'languages',
};
