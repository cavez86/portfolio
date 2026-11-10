import type { SVGProps } from 'react';

// The shape vocabulary of the page: circles, bars, arcs and dots on a 48 unit grid.
const shapes = [
  <circle cx="24" cy="24" key="disc" r="20" />,
  <path d="M4 36a20 20 0 0 1 40 0Z" key="dome" />,
  <rect height="14" key="bar" rx="7" width="44" x="2" y="17" />,
  <path d="M4 44V4a40 40 0 0 1 40 40Z" key="quarter" />,
  <circle cx="24" cy="24" fill="none" key="ring" r="16" strokeWidth="9" />,
  <g key="dots">
    <circle cx="12" cy="12" r="7" />
    <circle cx="36" cy="12" r="7" />
    <circle cx="12" cy="36" r="7" />
    <circle cx="36" cy="36" r="7" />
  </g>,
];

export const Primitive = ({ index, ...props }: { index: number } & SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" fill="currentColor" stroke="currentColor" strokeWidth="0" viewBox="0 0 48 48" {...props}>
    {shapes[index % shapes.length]}
  </svg>
);
