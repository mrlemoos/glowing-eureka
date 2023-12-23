import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@root/util/cn.module";

/**
 * The `<textarea>` element's forwarded reference type.
 */
export type TextareaForwardedReferenceType = HTMLTextAreaElement;

/**
 * The type of the HTML textarea element's attributes.
 */
type HTMLTextAreaElementAttributes = TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * The type of the HTML textarea element's attributes that
 * are remembered from the {@link HTMLTextAreaElementAttributes}.
 */
type RememberedHTMLTextAreaElementAttributes = Omit<HTMLTextAreaElementAttributes, "children">;

/**
 * The props for the {@link Textarea} component.
 */
export interface TextareaProps extends RememberedHTMLTextAreaElementAttributes {
  /**
   * @ignore
   */
  children?: never;
}

/**
 * The component that renders the textarea element.
 *
 * @props {@link TextareaProps}
 * @ref {@link TextareaForwardedReferenceType}
 */
export const Textarea = forwardRef<TextareaForwardedReferenceType, TextareaProps>(function TextareaRender(
  { className, ...props },
  ref
) {
  return (
    <textarea
      className={cn(
        "flex min-h-[40px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
