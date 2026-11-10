import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "cursor-pointer inline-flex shrink-0 items-center justify-center rounded-full border-2 border-transparent text-base font-semibold whitespace-nowrap transition-colors duration-150 outline-none select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-11 gap-2 px-5',
        icon: 'size-11',
        'icon-sm': 'size-9',
        lg: 'h-14 gap-3 px-8 text-lg',
        sm: 'h-10 gap-2 px-4',
      },
      variant: {
        default: 'border-inchiostro bg-inchiostro text-carta hover:border-cobalto hover:bg-cobalto hover:text-white',
        ghost: 'border-inchiostro text-inchiostro hover:bg-inchiostro hover:text-carta',
        outline: 'border-current bg-transparent hover:bg-inchiostro hover:text-carta hover:border-inchiostro',
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
