import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button cursor-pointer inline-flex shrink-0 items-center justify-center gap-2 rounded-sm border border-transparent text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-150 select-none active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 px-4',
        icon: 'size-10',
        'icon-lg': 'size-11',
        'icon-sm': 'size-8',
        'icon-xs': "size-6 [&_svg:not([class*='size-'])]:size-3",
        lg: 'h-12 px-6 text-base',
        sm: 'h-9 px-3',
        xs: "h-6 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
      },
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-notte hover:text-carta hover:border-carta',
        destructive: 'bg-destructive text-carta hover:bg-destructive/90',
        ghost: 'hover:bg-notte hover:text-carta aria-expanded:bg-notte',
        link: 'text-current underline underline-offset-4 decoration-1 hover:decoration-2',
        outline: 'border-carta/60 text-carta hover:border-carta hover:bg-carta hover:text-savoia',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
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
