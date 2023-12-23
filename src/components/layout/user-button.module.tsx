import { type JSX } from "react";

import { UserButton as ClerkUserButton } from "@clerk/nextjs";

import { FontSans } from "@root/styles/fonts.module";

const variables = {
  fontFamily: FontSans.style.fontFamily,
  fontFamilyButtons: FontSans.style.fontFamily,
} as const;

/**
 * The button that allows the user to log in or log out.
 */
export function UserButton(): JSX.Element {
  return <ClerkUserButton appearance={{ variables }} />;
}
