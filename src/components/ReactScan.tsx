'use client';

import { scan } from 'react-scan';
// react-scan must be imported before react
import { useEffect } from 'react';

export const ReactScan = () => {
  useEffect(() => {
    scan({
      enabled: true,
    });
  }, []);

  return <></>;
};
