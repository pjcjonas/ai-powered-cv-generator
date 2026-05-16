"use client";

import { useRouter } from "next/navigation";
import type { Dispatch } from "react";
import type { CVData } from "@/lib/types";

type Action =
  | { type: "SET_LOADING"; value: boolean }
  | { type: "SET_ERROR"; message: string };

export function useGenerateCV(dispatch: Dispatch<Action>) {
  const router = useRouter();

  async function generate(linkedinText: string, jobPosting: string, templateId: string) {
    dispatch({ type: "SET_LOADING", value: true });

    try {
      const res = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedinText, jobPosting }),
      });

      const data = await res.json();

      if (!data.success) {
        dispatch({ type: "SET_ERROR", message: data.error ?? "Failed to generate CV" });
        return;
      }

      const cv: CVData = data.cv;
      sessionStorage.setItem("cv_data", JSON.stringify(cv));
      sessionStorage.setItem("cv_template", templateId);
      router.push("/preview");
    } catch {
      dispatch({ type: "SET_ERROR", message: "Network error — please try again" });
    }
  }

  return { generate };
}
