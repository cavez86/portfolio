import type { CollectionConfig } from 'payload';

import { iconNames } from '@/components/common/Icon';

export const SummaryInfo: CollectionConfig = {
  slug: 'summary-info',
  admin: {
    useAsTitle: 'label',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'icon',
      type: 'select',
      options: iconNames,
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'value',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
};
