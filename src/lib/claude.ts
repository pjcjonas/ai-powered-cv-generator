import OpenAI from "openai";
import { z } from "zod";
import { CVDataSchema } from "./schema";
import type { CVData } from "./types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o";

const SYSTEM_PROMPT = `You are an expert CV writer and career coach. You extract structured information from LinkedIn profiles and rewrite it to be highly targeted to a specific job posting.

Guidelines:
- Emphasize skills and experience that match the job posting language
- Rewrite bullet points to mirror terminology from the job description
- Write a professional summary that directly addresses the role requirements
- Quantify achievements where the source data supports it
- Keep all factual data accurate — never invent facts not present in the source profile
- Prioritize the most relevant experience for this specific role`;

export async function generateCV(
  linkedinText: string,
  jobPosting: string
): Promise<CVData> {
  const userPrompt = `## LinkedIn Profile (source material)
${linkedinText}

## Target Job Posting
${jobPosting}

Extract and rewrite this person's CV to be optimally targeted for the above job posting. Return the structured data using the extract_cv_data tool.`;

  const inputSchema = z.toJSONSchema(CVDataSchema);

  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "extract_cv_data",
          description: "Extract and structure the tailored CV data",
          parameters: inputSchema as Record<string, unknown>,
        },
      },
    ],
    tool_choice: { type: "function", function: { name: "extract_cv_data" } },
  });

  const toolCall = response.choices[0]?.message?.tool_calls?.[0];
  if (!toolCall || toolCall.type !== "function") {
    throw new Error("Model did not return tool call output");
  }

  const parsed = JSON.parse(toolCall.function.arguments);
  return CVDataSchema.parse(parsed);
}
