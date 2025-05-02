import { headers } from 'next/headers';
import { headerName } from './settings';

export const getLocale = async () => {
  const headerList = await headers();
  return headerList.get(headerName);
};
