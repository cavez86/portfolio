import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border px-5 text-base font-bold whitespace-nowrap select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default:
          'border-primary bg-primary text-primary-foreground hover:bg-foreground hover:border-foreground hover:text-background',
        outline: 'border-foreground/25 text-foreground hover:border-foreground hover:bg-highlight',
      },
    },
  }
);

function Button({ className, variant, ...props }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive className={cn(buttonVariants({ className, variant }))} data-slot="button" {...props} />;
}

export { Button, buttonVariants };
