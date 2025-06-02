import type { GlobalConfig } from 'payload';

export const PersonalInfo: GlobalConfig = {
  slug: 'personal-info',
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
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'availability',
      type: 'text',
      localized: true,
    },
  ],
};
