"use client";

import type { Dispatch } from "react";
import type { WizardState } from "@/lib/types";
import { useGenerateCV } from "@/hooks/useGenerateCV";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { TEMPLATES } from "@/lib/template-registry";

type Action =
  | { type: "PREV_STEP" }
  | { type: "SET_LOADING"; value: boolean }
  | { type: "SET_ERROR"; message: string }
  | { type: "CLEAR_ERROR" };

interface Props {
  state: WizardState;
  dispatch: Dispatch<Action>;
}

export function Step4Generate({ state, dispatch }: Props) {
  const { generate } = useGenerateCV(dispatch);

  function handleGenerate() {
    dispatch({ type: "CLEAR_ERROR" });
    generate(state.linkedinRaw, state.jobPosting, state.templateId);
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Ready to Generate</h2>
      <p className="text-sm text-gray-500 mb-6">
        Claude will tailor your CV to the job posting. This usually takes 15–30 seconds.
      </p>

      {/* Summary of inputs */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3 text-sm">
        <div className="flex gap-2">
          <span className="text-gray-500 w-24 shrink-0">Profile:</span>
          <span className="text-gray-800">{state.linkedinRaw.slice(0, 80)}…</span>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-500 w-24 shrink-0">Job posting:</span>
          <span className="text-gray-800">{state.jobPosting.slice(0, 80)}…</span>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-500 w-24 shrink-0">Template:</span>
          <span className="text-gray-800 font-medium">{TEMPLATES[state.templateId].label}</span>
        </div>
      </div>

      {state.error && (
        <div className="mb-4">
          <ErrorBanner message={state.error} onDismiss={() => dispatch({ type: "CLEAR_ERROR" })} />
        </div>
      )}

      {state.isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => dispatch({ type: "PREV_STEP" })}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={handleGenerate}
            className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-base"
          >
            Generate CV
          </button>
        </div>
      )}
    </div>
  );
}
