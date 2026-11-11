'use client';

import { useDrive } from '@/components/common/drive';
import { Gear } from '@/components/common/Gear';

// The last gear of the page's machine, half in the field above the control panel.
export const PanelGear = () => {
  const drive = useDrive();
  return (
    <svg aria-hidden="true" className="-mt-14 ml-auto block size-28 md:-mt-28 md:size-56" viewBox="-120 -120 240 240">
      <Gear angle={drive} className="fill-cobalto" cx={0} cy={0} pitch={96} r={82} ratio={1.5} teeth={14} tooth={11}>
        <circle className="fill-girasole" r="38" />
        <rect className="fill-inchiostro" height="16" rx="8" width="96" x="-48" y="-8" />
        <circle className="fill-carta" r="12" />
      </Gear>
    </svg>
  );
};
