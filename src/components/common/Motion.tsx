'use client';

import { motion, MotionProps } from 'framer-motion';
import React, { ElementType, JSX } from 'react';

type CustomMotionProps<Tag extends keyof JSX.IntrinsicElements> = React.PropsWithChildren<
  MotionProps & {
    type?: Tag;
    className?: string | undefined;
  }
>;

export const Motion = <Tag extends keyof JSX.IntrinsicElements>({
  type,
  children,
  className,
  ...props
}: CustomMotionProps<Tag>) => {
  const Component = type ? (motion as { [K in Tag]: ElementType })[type] : motion.div;
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};
