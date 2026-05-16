"use client";

import { useState } from "react";
import type { Dispatch } from "react";
import type { LinkedInMethod, WizardState } from "@/lib/types";
import { FileDropzone } from "@/components/ui/FileDropzone";
import { ErrorBanner } from "@/components/ui/ErrorBanner";

type Action =
  | { type: "SET_METHOD"; method: LinkedInMethod }
  | { type: "SET_LINKEDIN_INPUT"; value: string }
  | { type: "SET_LINKEDIN_FILE"; file: File | null }
  | { type: "SET_LINKEDIN_RAW"; text: string }
  | { type: "SET_LOADING"; value: boolean }
  | { type: "SET_ERROR"; message: string }
  | { type: "CLEAR_ERROR" };

interface Props {
  state: WizardState;
  dispatch: Dispatch<Action>;
}

const TABS: { id: LinkedInMethod; label: string }[] = [
  { id: "text", label: "Paste Text" },
  { id: "pdf", label: "Upload PDF" },
];

export function Step1LinkedIn({ state, dispatch }: Props) {
  const [localLoading, setLocalLoading] = useState(false);

  async function handleContinue() {
    dispatch({ type: "CLEAR_ERROR" });
    setLocalLoading(true);

    try {
      if (state.linkedinMethod === "text") {
        if (state.linkedinInput.trim().length < 100) {
          dispatch({ type: "SET_ERROR", message: "Please paste more of your profile text (at least a few sentences)." });
          return;
        }
        const res = await fetch("/api/parse-linkedin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ method: "text", text: state.linkedinInput }),
        });
        const data = await res.json();
        if (data.success) {
          dispatch({ type: "SET_LINKEDIN_RAW", text: data.rawText });
        } else {
          dispatch({ type: "SET_ERROR", message: data.error ?? "Failed to process profile text" });
        }
      } else if (state.linkedinMethod === "pdf") {
        if (!state.linkedinFile) {
          dispatch({ type: "SET_ERROR", message: "Please upload a PDF file." });
          return;
        }
        const formData = new FormData();
        formData.append("method", "pdf");
        formData.append("file", state.linkedinFile);
        const res = await fetch("/api/parse-linkedin", { method: "POST", body: formData });
        const data = await res.json();
        if (data.success) {
          dispatch({ type: "SET_LINKEDIN_RAW", text: data.rawText });
        } else {
          dispatch({ type: "SET_ERROR", message: data.error ?? "Failed to parse PDF" });
        }
      }
    } finally {
      setLocalLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Your LinkedIn Profile</h2>
      <p className="text-sm text-gray-500 mb-6">Provide your LinkedIn profile using any of the methods below.</p>

      {state.error && (
        <div className="mb-4">
          <ErrorBanner message={state.error} onDismiss={() => dispatch({ type: "CLEAR_ERROR" })} />
        </div>
      )}

      {/* Tab selector */}
      <div className="flex border-b border-gray-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => dispatch({ type: "SET_METHOD", method: tab.id })}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              state.linkedinMethod === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {state.linkedinMethod === "text" && (
        <textarea
          value={state.linkedinInput}
          onChange={(e) => dispatch({ type: "SET_LINKEDIN_INPUT", value: e.target.value })}
          placeholder="Open your LinkedIn profile, select all text (Ctrl+A), copy, and paste here..."
          rows={10}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {state.linkedinMethod === "pdf" && (
        <FileDropzone
          file={state.linkedinFile}
          onFile={(f) => dispatch({ type: "SET_LINKEDIN_FILE", file: f })}
        />
      )}

      <button
        onClick={handleContinue}
        disabled={localLoading}
        className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {localLoading ? "Processing..." : "Continue →"}
      </button>
    </div>
  );
}
