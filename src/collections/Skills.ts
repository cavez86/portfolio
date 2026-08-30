import type { CollectionConfig } from 'payload';

import { iconNames } from '@/components/common/Icon';

export const Skills: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
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
          name: 'skill',
          required: true,
          type: 'text',
        },
      ],
      name: 'skills',
      type: 'array',
    },
  ],
  slug: 'skills',
};
