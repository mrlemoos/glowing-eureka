import { type HTMLAttributes, type JSX, type ReactNode } from "react";

import { cn } from "@root/util/cn.module";

/**
 * The React-adapted HTML element attributes for the
 * {@link HTMLAttributes | `<div>`}.
 */
type HTMLDivElementAttributes = HTMLAttributes<HTMLDivElement>;

/**
 * The props for the {@link BottomBar} component.
 */
interface BottomBarProps extends HTMLDivElementAttributes {
  /**
   * The children that will be rendered inside the afloat
   * bottom bar.
   */
  children: ReactNode;
}

/**
 * The component that renders the bottom bar styled to
 * appear afloat.
 *
 * @props {@link BottomBarProps}
 */
export function BottomBar({ children, className }: BottomBarProps): JSX.Element {
  return (
    <div className={cn("flex justify-center gap-2 p-3 fixed w-full bottom-0 rounded mb-8 animate-in", className)}>
      {children}
    </div>
  );
}
