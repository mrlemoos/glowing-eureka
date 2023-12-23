import { type JSX } from "react";

import { Button } from "@root/components/ui/button.module";

/**
 * The isolated React component that renders the submit
 * prompt button. It is used to trigger a submit event on
 * the chat module form. This component requires a `<form>`
 * element to wrap it in order to work properly with the
 * `type='submit'` attribute passed to the native HTML
 * {@link HTMLButtonElement | button element}.
 */
export function SubmitPromptButton(): JSX.Element {
  return (
    <Button
      type="submit"
      size="md"
      aria-label="Submit"
      variant="ghost"
      className="bg-green-300/50 text-black hover:bg-green-300/70"
    >
      Submit
    </Button>
  );
}
