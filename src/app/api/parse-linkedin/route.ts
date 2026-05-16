export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/parse-pdf";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const method = formData.get("method") as string;

      if (method === "pdf") {
        const file = formData.get("file") as File | null;
        if (!file) {
          return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const rawText = await extractTextFromPDF(buffer);
        if (!rawText || rawText.trim().length < 100) {
          return NextResponse.json({ success: false, error: "Could not extract text from PDF" }, { status: 400 });
        }
        return NextResponse.json({ success: true, rawText });
      }
    }

    const body = await request.json();
    const { method, text } = body;

    if (method === "text") {
      if (!text || typeof text !== "string" || text.trim().length < 100) {
        return NextResponse.json(
          { success: false, error: "Please provide at least a few sentences of profile text" },
          { status: 400 }
        );
      }
      return NextResponse.json({ success: true, rawText: text.trim() });
    }

    return NextResponse.json({ success: false, error: "Invalid method" }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to parse LinkedIn profile";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
