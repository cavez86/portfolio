import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap text-sm font-medium font-mono transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive uppercase tracking-wider",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 hover:shadow-[0_0_10px_var(--color-primary)]',
        destructive:
          'bg-destructive text-white border-2 border-destructive hover:bg-destructive/90 hover:shadow-[0_0_10px_var(--color-destructive)] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border-2 border-primary bg-transparent text-primary hover:bg-primary/10 hover:shadow-[0_0_8px_var(--color-primary)]',
        secondary: 'bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-secondary/80',
        ghost: 'hover:bg-primary/20 hover:text-primary border-2 border-transparent hover:border-primary/50',
        link: 'text-primary underline-offset-4 hover:underline hover:text-accent',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
