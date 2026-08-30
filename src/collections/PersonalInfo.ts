import type { GlobalConfig } from 'payload';

export const PersonalInfo: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      required: true,
      type: 'text',
    },
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      localized: true,
      name: 'description',
      type: 'richText',
    },
    {
      localized: true,
      name: 'availability',
      type: 'text',
    },
  ],
  slug: 'personal-info',
};
