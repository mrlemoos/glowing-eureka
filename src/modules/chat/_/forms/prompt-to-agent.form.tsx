"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type FormEvent as ReactFormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { Cross2Icon } from "@radix-ui/react-icons";
import { useCompletion } from "ai/react";
import { useParams } from "next/navigation";

import { BottomBar } from "@root/components/layout/bottom-bar.module";
import { Tooltip } from "@root/components/ui/tooltip.module";
import { OpenAIModelMap, type OpenAIModel } from "@root/constants/openai";

import { BotMessage } from "../components/bot-message.module";
import { ChatBox } from "../components/chat-box.module";
import { PromptInput } from "../components/prompt-input.module";
import { SubmitPromptButton } from "../components/submit-prompt-button.module";
import { UserMessage } from "../components/user-message.module";

/**
 * The object of how the parameters should be provided to Next.js.
 */
type NextParams = ReturnType<typeof useParams>;

/**
 * The URL parameters used by the chat module.
 */
export interface PromptToAgentFormParams extends NextParams {
  /**
   * The ID of the chat.
   */
  chatId: string;
}

/**
 * The custom React hook that returns the {@link PromptToAgentFormParams | chat module parameters}.
 */
export function usePromptToAgentFormParams(): PromptToAgentFormParams {
  const params = useParams<PromptToAgentFormParams>();

  return params;
}

type __PickedSessionHistoryReducerState = Pick<ChatSessionHistoryReducerState, "messages">;
/**
 *
 */
export interface UseChatCompletionStreamOptions extends __PickedSessionHistoryReducerState {
  /**
   * The ID of the chat.
   */
  chatId: string;
  /**
   * The model to use for the interaction.
   */
  model: OpenAIModel;
}

/**
 * The "prompt to agent form" module's custom React hook that dispatches an HTTP
 * communication with the server-side and returns the completions asynchronously
 * loaded from the API endpoint via streaming. This uses the given {@link chatId}
 * to ID the conversation with the OpenAI API as sessions (as they call it) and
 * the {@link model} to determine which of the available models to use for the
 * interaction.
 *
 * @see https://npmjs.com/package/ai
 * @see https://beta.openai.com/docs/api-reference/create-completion
 * @see https://beta.openai.com/docs/api-reference/retrieve-completion
 * @see {@link OpenAIModelMap}
 * @see {@link OpenAIModel}
 */
export function useChatCompletionStream({ chatId, messages, model }: UseChatCompletionStreamOptions) {
  const callSearchParams = useMemo(
    function () {
      return new URLSearchParams({ model });
    },
    [model]
  );

  /**
   * The completions asynchronously loaded from the API endpoint via streaming.
   *
   * @see {@link useCompletion}
   * @see https://npmjs.com/package/ai
   */
  const completions = useCompletion({
    api: `/api/chats/${chatId}/prompt?${callSearchParams.toString()}`,
    body: {
      history: messages.map(function ({ role, message: content }) {
        return { role, content };
      }),
    },
    id: chatId,
  });

  return completions;
}

export interface ChatSessionHistory {
  /**
   * The message sent by the user.
   */
  role: "assistant" | "user";
  /**
   * The message sent by the AI model.
   */
  message: string;
}

/**
 * The type that shapes the state of the chat session history.
 */
export interface ChatSessionHistoryReducerState {
  messages: ChatSessionHistory[];
}

/**
 * The initial state of the chat session history.
 */
const initialChatSessionHistoryState: ChatSessionHistoryReducerState = {
  messages: [],
} as const;

export type ChatSessionHistoryReducerAction = {
  type: "Append Message";
  payload: ChatSessionHistory;
};

/**
 * The reducer function that handles the chat session history.
 */
export function createChatSessionHistoryReducer(
  state: ChatSessionHistoryReducerState = initialChatSessionHistoryState,
  { type, payload }: ChatSessionHistoryReducerAction
): ChatSessionHistoryReducerState {
  switch (type) {
    case "Append Message": {
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    }
    default:
      return state;
  }
}

/**
 * The custom React hook that handles the form submission and the input change
 * event handlers.
 */
export function usePromptFormHandlers() {
  const [{ messages }, dispatchChatSessionHistoryAction] = useReducer(
    createChatSessionHistoryReducer,
    initialChatSessionHistoryState
  );

  const { chatId } = usePromptToAgentFormParams();

  const {
    handleSubmit: handleSubmitRequestForCompletion,
    completion,
    input,
    handleInputChange,
    isLoading,
    setInput,
    stop: cancel,
  } = useChatCompletionStream({ chatId, messages, model: OpenAIModelMap.GPT_3_5_16K });

  const formElementReference = useRef<HTMLFormElement>(null);

  /**
   * The callback function that handles the {@link ReactFormEvent | event}
   * handler the submission of the form and resets the {@link HTMLInputElement | input}
   * element.
   */
  const handleSubmit = useCallback(
    function onSubmitEventHandler(event: ReactFormEvent<HTMLFormElement>) {
      handleSubmitRequestForCompletion(event);
      dispatchChatSessionHistoryAction({
        type: "Append Message",
        payload: {
          message: input,
          role: "user",
        },
      });
      setInput("");
    },
    [handleSubmitRequestForCompletion, setInput, input]
  );

  /**
   * The callback function that handles the {@link ReactKeyboardEvent | event}
   * handler the submission of the form and resets the {@link HTMLInputElement | input}
   * element.
   */
  const handleKeyDown = useCallback(function onKeyDownEventHandler(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    formElementReference.current?.submit();
  }, []);

  useEffect(
    function () {
      if (!completion || isLoading) {
        return;
      }

      dispatchChatSessionHistoryAction({
        type: "Append Message",
        payload: {
          role: "assistant",
          message: completion,
        },
      });
    },
    [completion, isLoading]
  );

  const isLastMessage = useMemo(
    function () {
      return messages[messages.length - 1]?.message === completion;
    },
    [messages, completion]
  );

  return {
    handleSubmit,
    completion: isLastMessage ? undefined : completion,
    input,
    handleInputChange,
    isLoading,
    formElementReference,
    handleKeyDown,
    cancel,
    messages,
  };
}

/**
 * The component that combines the UI and creates the form for the user's prompt
 * with the input for them to interact with the AI model.
 *
 * To render the chat box, the form utilises the {@link useChatCompletionStream}
 * custom React hook to dispatch an HTTP communication with the server-side and
 * returns the completions asynchronously loaded from the API endpoint via
 * streaming.
 *
 * @see {@link useChatCompletionStream}
 */
export function PromptToAgentForm(): JSX.Element {
  const {
    completion,
    formElementReference,
    handleInputChange,
    handleSubmit,
    input,
    isLoading,
    handleKeyDown,
    messages,
    cancel,
  } = usePromptFormHandlers();

  const isCompletionStreaming = !!completion;

  return (
    <Fragment>
      <ChatBox>
        {messages.map(function ({ role, message }) {
          return (
            <Fragment key={message}>
              {role === "user" && <UserMessage message={message} />}
              {role === "assistant" && <BotMessage message={message} />}
            </Fragment>
          );
        })}
        {!!isCompletionStreaming && <BotMessage message={completion} isPulsing={isLoading} />}
      </ChatBox>
      <form onSubmit={handleSubmit} ref={formElementReference}>
        <BottomBar className="max-w-md md:max-w-lg lg:max-w-4xl shadow-lg border-gray-400 p-2 rounded-lg ring-1 ring-gray-200 dark:ring-gray-800 focus-within:ring-green-500">
          <PromptInput value={input} onChange={handleInputChange} disabled={isLoading} onKeyDown={handleKeyDown} />
          {isLoading ? (
            <div className="h-9 pl-1 py-1 pr-4 inline-flex justify-center gap-3 items-center whitespace-nowrap rounded-md text-sm font-normal transition-all bg-gray-100 text-gray-400">
              <Tooltip content="Stop answering" side="top" sideOffset={8}>
                <button className="bg-rose-100 text-rose-500 rounded-sm p-1 text-lg" type="button" onClick={cancel}>
                  <Cross2Icon height={18} width={18} />
                </button>
              </Tooltip>
              <span className="pointer-events-none select-none">Generating</span>
            </div>
          ) : (
            <SubmitPromptButton />
          )}
        </BottomBar>
      </form>
    </Fragment>
  );
}
