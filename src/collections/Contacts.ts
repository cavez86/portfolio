import type { CollectionConfig } from 'payload';

import { iconNames } from '@/components/common/Icon';

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'label',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'select',
      options: iconNames,
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
};
