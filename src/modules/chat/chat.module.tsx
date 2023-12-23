"use client";

import { type JSX } from "react";

import { PromptToAgentForm } from "./_/forms/prompt-to-agent.form";

/**
 * The component that renders the chat module.
 */
export function ChatModule(): JSX.Element {
  return (
    <div className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-4xl py-24 flex flex-col stretch">
      <PromptToAgentForm />
    </div>
  );
}
