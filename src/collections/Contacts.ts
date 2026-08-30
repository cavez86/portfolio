import type { CollectionConfig } from 'payload';

import { iconNames } from '@/components/common/Icon';

export const Contacts: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'label',
      required: true,
      type: 'text',
    },
    {
      name: 'url',
      required: true,
      type: 'text',
    },
    {
      name: 'icon',
      options: iconNames,
      type: 'select',
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
  slug: 'contacts',
};
