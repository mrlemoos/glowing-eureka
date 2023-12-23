import { type JSX } from "react";

import { Markdown } from "@root/components/layout/markdown.module";

export interface BotMessageProps {
  /**
   * The message to be displayed.
   */
  message: string;
  /**
   * The boolean which indicates whether or not the bot
   * bubble is pulsing. This may be used to indicate the
   * loading state of the message or the fact that the bot
   * is 'typing.'
   *
   * @default false
   */
  isPulsing?: boolean;
}

/**
 * The function which renders the bot message component.
 *
 * @props {@link BotMessageProps}
 */
export function BotMessage({ message, isPulsing = false }: BotMessageProps): JSX.Element {
  return (
    <div className="text-left text-foreground my-8 flex flex-col justify-left">
      <div className="flex items-center gap-3">
        <span className="font-semibold ml-3 relative before:absolute before:-left-3 before:top-2 before:w-2 before:h-2 before:bg-emerald-600/70 before:rounded-full before:content-['']">
          Eure
        </span>
        {isPulsing && (
          <div className="flex items-center gap-1">
            <div className="animate-pulse bg-green-500/80 h-2 w-2 rounded-full repeat-infinite" />
            <div className="animate-pulse bg-green-500/80 h-2 w-2 rounded-full repeat-infinite delay-200" />
            <div className="animate-pulse bg-green-500/80 h-2 w-2 rounded-full repeat-infinite delay-500" />
          </div>
        )}
      </div>
      <div className="bg-green-500/5 p-4 rounded-lg">
        <Markdown source={message} />
      </div>
    </div>
  );
}
