import { NextRequest, NextResponse } from "next/server";
import { generateCV } from "@/lib/claude";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { linkedinText, jobPosting } = body;

    if (!linkedinText || typeof linkedinText !== "string") {
      return NextResponse.json({ success: false, error: "LinkedIn profile text is required" }, { status: 400 });
    }
    if (!jobPosting || typeof jobPosting !== "string") {
      return NextResponse.json({ success: false, error: "Job posting is required" }, { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ success: false, error: "API key not configured" }, { status: 500 });
    }

    const cv = await generateCV(linkedinText, jobPosting);
    return NextResponse.json({ success: true, cv });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to generate CV";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
