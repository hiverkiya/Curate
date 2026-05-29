import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
export const MODELS = {
  autocomplete: [
    google("gemini-2.5-flash"),
    google("gemini-2.5-flash-lite"),
    openai("gpt-5-mini"),
    anthropic("claude-haiku-4-5-20251001"),
  ],

  quickEdit: anthropic("claude-sonnet-4-6"),

  codeGeneration: anthropic("claude-sonnet-4-6"),

  chat: openai("gpt-5-mini"),

  titleGeneration: openai("gpt-5-mini"),

  premiumReasoning: anthropic("claude-opus-4-7"),
};
