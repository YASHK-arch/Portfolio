import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold uppercase tracking-wider",
    "border-2 border-foreground",
    "shadow-brutal",
    "ring-offset-background transition-all duration-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    /* press-down on hover */
    "hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none",
    "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground border-destructive",
        outline:     "bg-background text-foreground",
        secondary:   "bg-accent text-accent-foreground border-foreground",
        ghost:       "border-transparent shadow-none hover:translate-x-0 hover:translate-y-0 hover:bg-secondary",
        link:        "border-transparent shadow-none hover:translate-x-0 hover:translate-y-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm:      "h-8 px-3 text-xs",
        lg:      "h-12 px-8 text-base",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children?: ReactNode;
}

const addClassNameRecursively = (
  children: ReactNode,
  className: string
): ReactNode => {
  const foo = (child: ReactNode) => {
    if (!isValidElement(child)) return child;

    const childProps = child.props as Record<string, unknown>;
    return cloneElement(child, {
      className: `${(childProps.className as string) || ""} ${className}`.trim(),
      children: addClassNameRecursively(childProps.children as ReactNode, className),
    } as Record<string, unknown>);
  };
  return Children.map(children, foo);
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "cursor-can-hover"
        )}
        ref={ref}
        {...props}
      >
        {/* add pointer-events-none to every child recursively */}
        {addClassNameRecursively(children, "pointer-events-none")}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
