"use client";

import { Children, forwardRef, useEffect, type ButtonHTMLAttributes, type ReactNode } from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { Icon } from "@root/components/icon.module";
import { cn } from "@root/util/cn.module";
import { getChildTextContent, isReactElement, isReactElementOfType } from "@root/util/react-util.module";

/**
 * The exception that is thrown when the {@link Button}
 * component fails to assert the accessibility of the
 * component.
 */
export class ButtonAccessibilityAssertionException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ButtonAccessibilityAssertionError";
  }
}

/**
 * The effect that is used to assert that the {@link Button}
 * component accessibility.
 */
export function useButtonAccessibilityAssertionEffect(
  children: ReactNode,
  ariaLabel?: string,
  ariaLabelledBy?: string
) {
  useEffect(
    function () {
      if (!children) {
        return;
      }

      const childrenArray = Children.toArray(children);

      if (
        // Check if the props "aria-label" or
        // "aria-labelledby" are defined.
        !(ariaLabel || ariaLabelledBy) &&
        // Check if the Button component has an Icon
        // component as a child.
        childrenArray.find(function (child) {
          isReactElementOfType(child, Icon);
        })
      ) {
        throw new ButtonAccessibilityAssertionException(
          `The Button component must not have an Icon component as a child. See ${Icon.displayName} usage in the Button component.`
        );
      }

      const childrenMap = childrenArray.map(function (child) {
        if (isReactElement(child)) {
          const textContent = getChildTextContent(child);

          if (textContent) {
            return textContent;
          }
        }
      });

      if (!(childrenMap || ariaLabel || ariaLabelledBy)) {
        throw new ButtonAccessibilityAssertionException(
          "The Button component must have at least string child. If not, provide an 'aria-label' or 'aria-labelledby' prop."
        );
      }
    },
    [ariaLabel, ariaLabelledBy, children]
  );
}

/**
 * The variations of the button component applied to the
 * {@link Button} component.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * The reference type of the value which is forwarded to the
 * {@link Button} component's root element, *i.e.*, the {@link HTMLButtonElement | `<button>`}
 * element, or {@link ButtonProps.children | children} prop
 * if the {@link ButtonProps.asChild | `asChild`} prop is
 * `true`.
 */
export type ButtonForwardedReferenceType = HTMLButtonElement;

/**
 * The React-adapted HTML button element attributes.
 */
type HTMLButtonElementAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * The props orientated by the {@link buttonVariants | button variations}.
 *
 * @see {@link buttonVariants}
 * @see {@link VariantProps}
 */
type ButtonVariationProps = VariantProps<typeof buttonVariants>;

/**
 * The props of the {@link Button} component.
 */
export interface ButtonProps extends HTMLButtonElementAttributes, ButtonVariationProps {
  /**
   * Boolean value indicating whether or not the {@link children}
   * prop should be get props that are injected into what
   * would be the {@link Button} component root element.
   * This is useful for when the {@link Button} component is
   * used as a child of another component, *e.g.*, using
   * button styles for a Next.js' `Link` component.
   *
   * @default false
   */
  asChild?: boolean;
}

/**
 * The button component that is used to render actions in
 * the application. The component is based on the HTML
 * button element and can be used as a regular HTML button
 * element.
 *
 * @example
 * ```tsx
 * import { type JSX } from "react";
 *
 * import { Button } from "@root/components/ui/button.module";
 *
 * function MyComponent(): JSX.Element {
 *   return (
 *     <Button variant="outline" size="sm">Click me</Button>
 *   );
 * }
 * ```
 *
 * It is also possible to forward the ref to the button
 * element by providing the `ref` prop to the component, an
 * example of which is shown below:
 *
 * ```tsx
 * import { type JSX } from "react";
 *
 * import { Button } from "@root/components/ui/button.module";
 *
 * function MyComponent(): JSX.Element {
 *   const buttonRef = useRef<HTMLButtonElement>(null);
 *
 *   return (
 *     <Button ref={buttonRef} variant="outline" size="sm">
 *       Click me
 *     </Button>
 *   );
 * }
 * ```
 *
 * To render the styles of the button, but applying to a
 * different root element, the `asChild` prop can be defined
 * as `true`, so all the props and styles are inherited by
 * the immediate native HTML child element, an example of
 * which is shown below:
 *
 * @example
 * ```tsx
 *
 * import { type JSX } from "react";
 *
 * import Link from "next/link";
 *
 * import { Button } from "@root/components/ui/button.module";
 *
 * function MyComponent(): JSX.Element {
 *   return (
 *     <Button asChild={true} variant="link" size="sm">
 *       <Link href="https://example.com">Click me</Link>
 *     </Button>
 *   );
 * }
 * ```
 *
 * @props {@link ButtonProps}
 * @ref {@link ButtonForwardedReferenceType}
 */
export const Button = forwardRef<ButtonForwardedReferenceType, ButtonProps>(function ButtonRender(
  {
    className,
    variant,
    size,
    asChild = false,
    children,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ...props
  },
  ref
) {
  const ButtonRootElement = (asChild ? Slot : "button") as "button";

  useButtonAccessibilityAssertionEffect(children, ariaLabel, ariaLabelledBy);

  return (
    <ButtonRootElement
      {...props}
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </ButtonRootElement>
  );
});
Button.displayName = "Button";
