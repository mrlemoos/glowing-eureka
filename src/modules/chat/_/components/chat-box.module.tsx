"use client";

import { type JSX, type ReactNode } from "react";

/**
 * The component that renders the chat box with the answer
 * generated by the AI.
 */
export interface ChatBoxProps {
  children: ReactNode;
}

/**
 * The component that renders the chat box with the answer
 * generated by the AI.
 *
 * @props {@link ChatBoxProps}
 */
export function ChatBox({ children }: ChatBoxProps): JSX.Element {
  return <div className="whitespace-pre-wrap my-4">{children}</div>;
}
