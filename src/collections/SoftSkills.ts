import type { CollectionConfig } from 'payload';

import { iconNames } from '@/components/common/Icon';

export const SoftSkills: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      localized: true,
      name: 'name',
      required: true,
      type: 'text',
    },
    {
      name: 'icon',
      options: iconNames,
      type: 'select',
    },
    {
      fields: [
        {
          label: 'Skill',
          localized: true,
          name: 'skill',
          required: true,
          type: 'text',
        },
      ],
      name: 'skills',
      type: 'array',
    },
  ],
  slug: 'soft-skills',
};
