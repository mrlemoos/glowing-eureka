import { type ReactNode } from "react";

import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";

import { FontSans } from "@root/styles/fonts.module";
import { cn } from "@root/util/cn.module";

import "@root/styles/globals.css";

/**
 * The {@link Metadata | metadata} for the page.
 */
export const metadata: Metadata = {
  title: "Glowing Eureka",
};

/**
 * The {@link RootLayout | root layout} search parameters.
 */
interface RootLayoutSearchParams {
  /**
   * The {@link string | language} of the page.
   */
  lang?: "en" | (string & {});
}

interface RootLayoutProps {
  /**
   * The {@link ReactNode | children} of the layout.
   */
  children: ReactNode;
  /**
   * The {@link RootLayoutSearchParams | search parameters}
   * of the layout.
   */
  searchParams?: RootLayoutSearchParams;
}

/**
 * The root layout of the application.
 *
 * @props {@link RootLayoutProps}
 */
function RootLayout({ children, searchParams = {} }: RootLayoutProps): JSX.Element {
  const lang = searchParams?.lang ?? "en";

  return (
    <ClerkProvider>
      <html lang={lang}>
        <body className={cn(FontSans.className)}>{children}</body>
      </html>
    </ClerkProvider>
  );
}

export default RootLayout;
