import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!apiKey) {
  console.error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function main() {
  try {
    console.log("🔍 Fetching Gemini models...\n");

    const models = [];

    for await (const model of ai.models.list()) {
      models.push(model);
    }

    models.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

    console.log(`Found ${models.length} model(s):\n`);

    for (const model of models) {
      console.log(`${model.name}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
