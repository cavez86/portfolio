import type { CollectionConfig } from 'payload';

export const Languages: CollectionConfig = {
  slug: 'languages',
  admin: {
    useAsTitle: 'language', // Using the populated field for the admin title
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'language',
      label: 'Language',
      type: 'text',
      required: true,
      unique: true, // Ensure that each language is unique
    },
    {
      name: 'proficiency',
      label: 'Proficiency',
      type: 'text',
      required: true,
    },
    {
      name: 'level',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
    },
  ],
};
