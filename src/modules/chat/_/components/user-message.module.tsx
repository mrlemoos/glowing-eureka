import { type JSX } from "react";

export interface UserMessageProps {
  message: string;
}

export function UserMessage({ message }: UserMessageProps): JSX.Element {
  return (
    <div className="text-right text-foreground my-8 flex flex-col justify-right">
      <span className="font-semibold mr-3 relative after:absolute after:-right-3 after:top-2 after:w-2 after:h-2 after:bg-sky-600/70 after:rounded-full after:content-['']">
        You
      </span>
      <span className="bg-gray-500/5 p-4 rounded-lg">{message}</span>
    </div>
  );
}
