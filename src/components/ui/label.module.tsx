"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";

import { Root as PrimitiveRoot } from "@radix-ui/react-label";

import { cn } from "@root/util/cn.module";

/**
 * The forwarded reference type of the {@link Label | label}
 * component. This is assigned as the memory address of the
 * {@link PrimitiveRoot} component.
 */
export type LabelForwardedReferenceType = ElementRef<typeof PrimitiveRoot>;

/**
 * The props of the {@link Label} component.
 */
export type LabelProps = ComponentPropsWithoutRef<typeof PrimitiveRoot>;

/**
 * A {@link HTMLLabelElement | label} is a text that
 * describes the purpose of an input. It is used to make the
 * input more accessible. It is also used to make the input
 * more usable by allowing the user to click on the label to
 * focus the input - The default behaviour of the input is
 * to focus when clicked, but this is not the case for all
 * inputs.
 *
 * @example
 * ```tsx
 * <Label htmlFor="input">Label</Label>
 * <Input name="input" />
 * ```
 *
 * @ref {@link LabelForwardedReferenceType}
 * @props {@link LabelProps}
 */
export const Label = forwardRef<LabelForwardedReferenceType, LabelProps>(function LabelRender(
  { className, children, ...props },
  ref
) {
  return (
    <PrimitiveRoot
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {children}
    </PrimitiveRoot>
  );
});

Label.displayName = "Label";
