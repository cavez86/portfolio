import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm border border-transparent text-small font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 gap-2 px-4',
        icon: 'size-10',
        'icon-lg': 'size-12',
        'icon-sm': 'size-9',
        'icon-xs': "size-7 [&_svg:not([class*='size-'])]:size-3",
        lg: 'h-12 gap-2 px-6 text-body',
        sm: 'h-9 gap-1.5 px-3',
        xs: "h-7 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
      },
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-[#ffc062]',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/85',
        ghost: 'text-foreground hover:bg-muted aria-expanded:bg-muted',
        link: 'text-primary underline-offset-4 hover:underline',
        outline:
          'border-primary/70 bg-transparent text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground aria-expanded:bg-muted',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-muted',
      },
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive className={cn(buttonVariants({ className, size, variant }))} data-slot="button" {...props} />;
}

export { Button, buttonVariants };
