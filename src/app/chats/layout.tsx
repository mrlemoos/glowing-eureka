import { Fragment, type JSX, type ReactNode } from "react";

import { Header } from "@root/components/layout/header.module";

interface ChatsLayoutProps {
  children: ReactNode;
}

export default function ChatsLayout({ children }: ChatsLayoutProps): JSX.Element {
  return (
    <Fragment>
      <Header />

      {children}
    </Fragment>
  );
}
