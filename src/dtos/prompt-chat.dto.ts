import zod from "zod";

import { OpenAIModel, OpenAIModelMap } from "@root/constants/openai";

/**
 * The accepted models for the prompt chat endpoint. This is
 * used for validation, and is converted to a string array.
 */
const __ACCEPTED_MODELS = Object.values(OpenAIModelMap) as readonly OpenAIModel[];

/**
 * The schema for the request body of the prompt chat
 * endpoint.
 */
export const PromptChatSchema = zod.object({
  model: zod.enum(__ACCEPTED_MODELS as [string], {
    invalid_type_error: `Provided model is not supported. Please use one of the following: ${__ACCEPTED_MODELS.join(
      ", "
    )}`,
    required_error: "Please provide a model type.",
    description: "The model to use for the chat.",
  }),
  message: zod.string(),
});

/**
 * The type of the request body of the prompt chat endpoint.
 *
 * @see {@link PromptChatSchema}
 * @see {@link zod.infer}
 */
export type PromptChatDataTransferObject = zod.infer<typeof PromptChatSchema>;

/**
 * This function parses the given {@link element} to the
 * {@link PromptChatModel} type via the {@link PromptChatSchema}.
 */
export function parsePromptChat(element: unknown) {
  return PromptChatSchema.parse(element);
}
