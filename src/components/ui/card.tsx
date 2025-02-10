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
      'text-card-foreground hover:bg-accent/50 rounded-xl border bg-transparent shadow-sm backdrop-blur-xs backdrop-grayscale transition',
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
}) => <div ref={ref} className={cn('leading-none font-semibold tracking-tight', className)} {...props} />;
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
