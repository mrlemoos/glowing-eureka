import { type HTMLAttributes, type JSX } from "react";

import { cn } from "@root/util/cn.module";

type HTMLDivElementAttributes = HTMLAttributes<HTMLDivElement>;

/**
 * The props for the {@link Loading} component.
 */
export interface LoadingProps extends HTMLDivElementAttributes {
  /**
   * @ignore
   */
  children?: never;
}

/**
 * The component that renders a loading animation.
 *
 * @props {@link LoadingProps}
 */
export function Loading({ children, className, ...props }: LoadingProps): JSX.Element {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center gap-1 [&>div]:animate-pulse [&>div]:bg-sky-500 [&>div]:h-1 [&>div]:w-1 [&>div]:rounded-full",
        className
      )}
    >
      <div />
      <div />
      <div />
    </div>
  );
}
