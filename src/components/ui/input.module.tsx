import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@root/util/cn.module";

/**
 * The attributes that are available on the
 * {@link HTMLInputElement}.
 */
type HTMLInputElementAttributes = InputHTMLAttributes<HTMLInputElement>;

/**
 * The attributes that are remembered from the
 * {@link HTMLInputElementAttributes}.
 */
type RememberedHTMLInputElementAttributes = Omit<HTMLInputElementAttributes, "children">;

/**
 * The attributes that are available on the {@link Input}
 * component.
 */
export interface InputProps extends RememberedHTMLInputElementAttributes {
  /**
   * @ignore
   */
  children?: never;
}

/**
 * The forwarded reference type of the {@link Input | input}
 * component. This is assigned as the memory address of the
 * {@link HTMLInputElement} component.
 */
export type InputForwardedReferenceType = HTMLInputElement;

/**
 * The {@link HTMLInputElement | input} component which
 * accepts the user interaction and produces a value that
 * can be used in the application.
 *
 * @example
 * ```tsx
 * <Input name="myInput" type="text" />
 * ```
 *
 * @props {@link InputProps}
 * @ref {@link InputForwardedReferenceType}
 */
export const Input = forwardRef<InputForwardedReferenceType, InputProps>(function InputRender(
  { className, type, ...props },
  ref
) {
  return (
    <input
      {...props}
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
    />
  );
});
Input.displayName = "Input";
