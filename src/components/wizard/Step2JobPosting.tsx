"use client";

import type { Dispatch } from "react";
import type { WizardState } from "@/lib/types";
import { ErrorBanner } from "@/components/ui/ErrorBanner";

type Action =
  | { type: "SET_JOB_POSTING"; value: string }
  | { type: "PREV_STEP" }
  | { type: "NEXT_STEP" }
  | { type: "SET_ERROR"; message: string }
  | { type: "CLEAR_ERROR" };

interface Props {
  state: WizardState;
  dispatch: Dispatch<Action>;
}

export function Step2JobPosting({ state, dispatch }: Props) {
  function handleContinue() {
    if (state.jobPosting.trim().length < 100) {
      dispatch({ type: "SET_ERROR", message: "Please paste the full job description (at least a few sentences)." });
      return;
    }
    dispatch({ type: "CLEAR_ERROR" });
    dispatch({ type: "NEXT_STEP" });
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Job Posting</h2>
      <p className="text-sm text-gray-500 mb-6">
        Paste the full job description. The more detail you provide, the better the CV will be tailored.
      </p>

      {state.error && (
        <div className="mb-4">
          <ErrorBanner message={state.error} onDismiss={() => dispatch({ type: "CLEAR_ERROR" })} />
        </div>
      )}

      <textarea
        value={state.jobPosting}
        onChange={(e) => dispatch({ type: "SET_JOB_POSTING", value: e.target.value })}
        placeholder="Paste the full job description here — including responsibilities, requirements, and any skills listed..."
        rows={12}
        className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => dispatch({ type: "PREV_STEP" })}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
