import { type JSX } from "react";

import { Markdown } from "@root/components/layout/markdown.module";

export interface UserMessageProps {
  /**
   * The message inputted by the user to be rendered.
   */
  message: string;
}

/**
 * The component responsible for rendering the user message
 * with certain styles.
 *
 * @props {@link UserMessageProps}
 */
export function UserMessage({ message }: UserMessageProps): JSX.Element {
  return (
    <div className="text-right text-foreground my-8 flex flex-col justify-right">
      <span className="font-semibold mr-3">You</span>
      <div className="bg-gray-500/5 p-4 rounded-lg">
        <Markdown source={message} />
      </div>
    </div>
  );
}
