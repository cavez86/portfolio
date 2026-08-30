import type { CollectionConfig } from 'payload';

import { iconNames } from '@/components/common/Icon';

export const SummaryInfo: CollectionConfig = {
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'icon',
      options: iconNames,
      type: 'select',
    },
    {
      localized: true,
      name: 'label',
      required: true,
      type: 'text',
    },
    {
      localized: true,
      name: 'value',
      required: true,
      type: 'text',
    },
  ],
  slug: 'summary-info',
};
