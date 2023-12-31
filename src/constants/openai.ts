/**
 * The OpenAI models that can be used for the OpenAI service.
 */
export const OpenAIModelMap = {
  GTP4_1106: "gpt-4-1106-preview",
  GPT_4_Vision: "gpt-4-vision-preview",
  GPT_4: "gpt-4",
  GPT_4_0314: "gpt-4-0314",
  GPT_4_0613: "gpt-4-0613",
  GPT_4_32k: "gpt-4-32k",
  GPT_4_32_0314: "gpt-4-32k-0314",
  GPT_4_32_0613: "gpt-4-32k-0613",
  GPT_3_5_TURBO_1106: "gpt-3.5-turbo-1106",
  GPT_3_5_TURBO: "gpt-3.5-turbo",
  GPT_3_5_16K: "gpt-3.5-turbo-16k",
  GPT_3_5_TURBO_0301: "gpt-3.5-turbo-0301",
  GPT_3_5_TURBO_0631: "gpt-3.5-turbo-0613",
  GPT_3_5_TURBO_16k_0613: "gpt-3.5-turbo-16k-0613",
} as const;

export type OpenAIModel = (typeof OpenAIModelMap)[keyof typeof OpenAIModelMap];
