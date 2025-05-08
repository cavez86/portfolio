import type { CollectionConfig } from 'payload';

import { iconNames } from '@/components/common/Icon';

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
      localized: true,
    },
    {
      name: 'icon',
      type: 'select',
      options: iconNames,
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
          localized: true,
        },
      ],
    },
  ],
};
