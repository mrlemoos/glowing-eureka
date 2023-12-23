import { AnchorHTMLAttributes, type JSX, type ReactNode } from "react";

import Link, { type LinkProps } from "next/link";

import { cn } from "@root/util/cn.module";

import { Button } from "./button.module";

/**
 * The props for the {@link Link} component from Next.js.
 */
type RememberedNextLinkProps = Omit<LinkProps, "children">;

/**
 * The React-adapted for the HTML anchor element attributes.
 */
type HTMLAnchorElementAttributes = AnchorHTMLAttributes<HTMLAnchorElement>;
/**
 * The picked React-adapted for the HTML anchor element
 * attributes.
 */
type PickedHTMLAnchorElementAttributes = Pick<HTMLAnchorElementAttributes, "target" | "rel">;

/**
 * The props for the {@link Anchor} component.
 */
export interface AnchorProps extends RememberedNextLinkProps, PickedHTMLAnchorElementAttributes {
  /**
   * The {@link ReactNode | custom node element or elements}
   * to render as the content of the component.
   */
  children?: ReactNode;
  /**
   * The class names to apply to the component.
   */
  className?: string;
}

/**
 * The component that renders the {@link Link} component
 * from Next.js as the content of the {@link Button}
 * component.
 *
 * @props {@link AnchorProps}
 */
export function Anchor({ children, className, href, target, rel, ...props }: AnchorProps): JSX.Element {
  return (
    <Button className={cn("h-auto w-auto", className)} asChild={true}>
      <Link {...props} href={href} target={target} rel={rel}>
        {children}
      </Link>
    </Button>
  );
}
