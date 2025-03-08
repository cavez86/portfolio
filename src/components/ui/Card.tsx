import type { HTMLAttributes, RefObject } from 'react';

import { cn } from '@/lib/utils';

const Card = ({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  ref?: RefObject<HTMLDivElement>;
}) => (
  <div
    ref={ref}
    className={cn(
      'bg-card text-card-foreground rounded-xl border shadow',
      'hover:bg-accent/50 transition duration-500 hover:scale-101 hover:shadow-lg hover:backdrop-blur-xs hover:backdrop-grayscale',
      className
    )}
    {...props}
  />
);
Card.displayName = 'Card';

const CardHeader = ({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  ref?: RefObject<HTMLDivElement>;
}) => <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
CardHeader.displayName = 'CardHeader';

const CardTitle = ({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  ref?: RefObject<HTMLDivElement>;
}) => (
  <div
    ref={ref}
    className={cn('text-card-foreground leading-none font-semibold tracking-tight', className)}
    {...props}
  />
);
CardTitle.displayName = 'CardTitle';

const CardDescription = ({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  ref?: RefObject<HTMLDivElement>;
}) => <div ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />;
CardDescription.displayName = 'CardDescription';

const CardContent = ({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  ref?: RefObject<HTMLDivElement>;
}) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />;
CardContent.displayName = 'CardContent';

const CardFooter = ({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  ref?: RefObject<HTMLDivElement>;
}) => <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />;
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
