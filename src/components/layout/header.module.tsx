import { type HTMLAttributes, type JSX } from "react";

import Link from "next/link";

import { FontSerif } from "@root/styles/fonts.module";
import { cn } from "@root/util/cn.module";

import { UserButton } from "./user-button.module";

/**
 * The React-adapted version of the attributes for the
 * {@link HTMLDivElement}.
 */
type HTMLDivElementAttributes = HTMLAttributes<HTMLDivElement>;

/**
 * The attributes for the {@link HTMLDivElement} expect for
 * the `children` prop.
 */
type RememberedHTMLDivElementAttributes = Omit<HTMLDivElementAttributes, "children">;

export interface HeaderProps extends RememberedHTMLDivElementAttributes {
  /**
   * @ignore
   */
  children?: never;
}

export function Header({ children, className, ...props }: HeaderProps): JSX.Element {
  return (
    <header {...props} className={cn("container sticky top-2", className)}>
      <div className={cn("inline-flex justify-between items-center container p-3")}>
        <Link href="/sign-in" target="_blank">
          <span className={cn(FontSerif.className, "font-semibold")}>Glowing Eureka</span>
        </Link>
        <div />
        <div className="flex justify-center items-center gap-1">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
