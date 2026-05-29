#!/usr/bin/env node

import OpenAI from "openai";

const API_KEY = process.env.OPENAI_API_KEY || process.argv[2];

if (!API_KEY) {
  console.error("❌ No API key found.");
  console.error(
    "   Set OPENAI_API_KEY or pass it as the first argument.\n",
  );
  process.exit(1);
}

const client = new OpenAI({
  apiKey: API_KEY,
});

function col(str, width) {
  return String(str).padEnd(width);
}

function classifyModel(id) {
  const lower = id.toLowerCase();

  if (lower.includes("gpt")) return "GPT";
  if (lower.includes("embedding")) return "Embedding";
  if (lower.includes("tts")) return "TTS";
  if (lower.includes("whisper")) return "Speech";
  if (lower.includes("dall")) return "Image";
  if (lower.includes("omni")) return "Omni";
  if (lower.includes("moderation")) return "Moderation";

  return "Other";
}

async function main() {
  console.log("\n🔍 Fetching models from OpenAI API...\n");

  const response = await client.models.list();

  const models = response.data.sort((a, b) =>
    a.id.localeCompare(b.id),
  );

  const W = {
    id: 45,
    created: 14,
    category: 15,
  };

  const header =
    col("Model ID", W.id) +
    col("Created", W.created) +
    "Category";

  const divider = "─".repeat(header.length);

  console.log(`Found ${models.length} model(s) accessible with your key:\n`);
  console.log(header);
  console.log(divider);

  for (const model of models) {
    const created = model.created
      ? new Date(model.created * 1000).toISOString().slice(0, 10)
      : "—";

    console.log(
      col(model.id, W.id) +
        col(created, W.created) +
        classifyModel(model.id),
    );
  }

  console.log(divider);

  console.log("\nTip:");
  console.log(
    "Models returned here are accessible to your API key, but some may still",
  );
  console.log(
    "have separate usage tiers, permissions, or billing requirements.\n",
  );
}

main().catch((err) => {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
});
