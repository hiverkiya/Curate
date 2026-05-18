import { anthropic } from "@ai-sdk/anthropic";
import { generateText, Output } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { firecrawl } from "@/lib/firecrawl";
import { auth } from "@clerk/nextjs/server";

const requestSchema = z.object({
  selectedCode: z.string().min(1),
  fullCode: z.string().optional(),
  instruction: z.string().min(1),
});

const quickEditSchema = z.object({
  editedCode: z
    .string()
    .describe(
      "The edited version of the selected code based on the instruction",
    ),
});

const URL_REGEX = /https?:\/\/[^\s)>\]]+/g;

const MAX_URLS = 3;
const MAX_DOC_CHARS = 3000;
const MAX_FULL_CODE_CHARS = 15000;

const QUICK_EDIT_PROMPT = `You are a code editing assistant. Edit the selected code based on the user's instruction.

<context>
<selected_code>
{selectedCode}
</selected_code>

<full_code_context>
{fullCode}
</full_code_context>
</context>

{documentation}

<instruction>
{instruction}
</instruction>

<instructions>
Return ONLY the edited version of the selected code.
Maintain the same indentation level as the original.
Do not include explanations.
Do not include markdown.
Do not wrap in code fences.
If the instruction is unclear or cannot be applied, return the original code unchanged.
</instructions>`;

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = requestSchema.parse(await request.json());
    const { selectedCode, fullCode, instruction } = body;

    const urls = [...new Set(instruction.match(URL_REGEX) || [])].slice(
      0,
      MAX_URLS,
    );

    let documentationContext = "";

    if (urls.length > 0) {
      const scrapedResults = await Promise.all(
        urls.map(async (url) => {
          try {
            const result = await firecrawl.scrape(url, {
              formats: ["markdown"],
            });

            if (!result.markdown) {
              return null;
            }

            const trimmedMarkdown = result.markdown.slice(0, MAX_DOC_CHARS);

            return `<doc url="${url}">
${trimmedMarkdown}
</doc>`;
          } catch {
            return null;
          }
        }),
      );

      const validResults = scrapedResults.filter(Boolean);

      if (validResults.length > 0) {
        documentationContext = `<documentation>
${validResults.join("\n\n")}
</documentation>`;
      }
    }

    const trimmedFullCode = (fullCode || "").slice(0, MAX_FULL_CODE_CHARS);

    const prompt = QUICK_EDIT_PROMPT.replace("{selectedCode}", selectedCode)
      .replace("{fullCode}", trimmedFullCode)
      .replace("{instruction}", instruction)
      .replace("{documentation}", documentationContext);

    const { output } = await generateText({
      model: anthropic("claude-haiku-4-5-20251001"),
      output: Output.object({ schema: quickEditSchema }),
      prompt,
      maxRetries: 0,
      temperature: 0,
      maxOutputTokens: 1000,
    });

    return NextResponse.json({
      editedCode: output.editedCode,
    });
  } catch (error) {
    console.error("Edit error:", error);

    return NextResponse.json(
      { error: "Failed to generate edited code. Please try again." },
      { status: 500 },
    );
  }
}
