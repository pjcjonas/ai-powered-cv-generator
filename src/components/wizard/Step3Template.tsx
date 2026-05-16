"use client";

import type { Dispatch } from "react";
import type { TemplateId, WizardState } from "@/lib/types";
import { TEMPLATES } from "@/lib/template-registry";

type Action =
  | { type: "SET_TEMPLATE"; id: TemplateId }
  | { type: "PREV_STEP" }
  | { type: "NEXT_STEP" };

interface Props {
  state: WizardState;
  dispatch: Dispatch<Action>;
}

export function Step3Template({ state, dispatch }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Choose a Template</h2>
      <p className="text-sm text-gray-500 mb-6">You can switch templates after generating too.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {(Object.entries(TEMPLATES) as [TemplateId, typeof TEMPLATES[TemplateId]][]).map(([id, tmpl]) => (
          <button
            key={id}
            onClick={() => dispatch({ type: "SET_TEMPLATE", id })}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              state.templateId === id
                ? `${tmpl.previewAccent} ring-2 ring-blue-500 ring-offset-2`
                : "border-gray-200 hover:border-gray-300"
            } ${tmpl.previewBg}`}
          >
            {/* Mini visual preview */}
            <div className="h-20 mb-3 rounded overflow-hidden border border-gray-200 bg-white flex">
              {id === "modern" ? (
                <>
                  <div className="w-6 bg-blue-700 h-full" />
                  <div className="flex-1 p-1.5 space-y-1">
                    <div className="h-1.5 bg-gray-300 rounded w-3/4" />
                    <div className="h-1 bg-gray-200 rounded w-1/2" />
                    <div className="h-1 bg-gray-200 rounded w-2/3 mt-1" />
                    <div className="h-1 bg-gray-200 rounded w-1/2" />
                  </div>
                </>
              ) : (
                <div className="flex-1 p-2 space-y-1">
                  <div className={`h-2 rounded w-1/2 ${id === "classic" ? "bg-gray-800" : "bg-gray-400"}`} />
                  <div className={`h-px w-full ${id === "classic" ? "bg-gray-800" : "bg-gray-300"} my-1`} />
                  <div className="h-1 bg-gray-200 rounded w-full" />
                  <div className="h-1 bg-gray-200 rounded w-3/4" />
                  <div className="h-1 bg-gray-200 rounded w-5/6 mt-1" />
                </div>
              )}
            </div>
            <p className="font-semibold text-sm text-gray-900">{tmpl.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{tmpl.description}</p>
            {state.templateId === id && (
              <p className="text-xs text-blue-600 font-medium mt-1">Selected</p>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => dispatch({ type: "PREV_STEP" })}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={() => dispatch({ type: "NEXT_STEP" })}
          className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
