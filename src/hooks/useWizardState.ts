"use client";

import { useReducer } from "react";
import type { WizardState, LinkedInMethod, TemplateId } from "@/lib/types";

type Action =
  | { type: "SET_METHOD"; method: LinkedInMethod }
  | { type: "SET_LINKEDIN_INPUT"; value: string }
  | { type: "SET_LINKEDIN_FILE"; file: File | null }
  | { type: "SET_LINKEDIN_RAW"; text: string }
  | { type: "SET_JOB_POSTING"; value: string }
  | { type: "SET_TEMPLATE"; id: TemplateId }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_LOADING"; value: boolean }
  | { type: "SET_ERROR"; message: string }
  | { type: "CLEAR_ERROR" };

const initial: WizardState = {
  step: 1,
  linkedinMethod: "text",
  linkedinInput: "",
  linkedinFile: null,
  linkedinRaw: "",
  jobPosting: "",
  templateId: "modern",
  generatedCV: null,
  isLoading: false,
  error: null,
};

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case "SET_METHOD":
      return { ...state, linkedinMethod: action.method, error: null };
    case "SET_LINKEDIN_INPUT":
      return { ...state, linkedinInput: action.value };
    case "SET_LINKEDIN_FILE":
      return { ...state, linkedinFile: action.file };
    case "SET_LINKEDIN_RAW":
      return { ...state, linkedinRaw: action.text, step: 2, error: null };
    case "SET_JOB_POSTING":
      return { ...state, jobPosting: action.value };
    case "SET_TEMPLATE":
      return { ...state, templateId: action.id };
    case "NEXT_STEP":
      return { ...state, step: Math.min(state.step + 1, 4) as WizardState["step"] };
    case "PREV_STEP":
      return { ...state, step: Math.max(state.step - 1, 1) as WizardState["step"], error: null };
    case "SET_LOADING":
      return { ...state, isLoading: action.value };
    case "SET_ERROR":
      return { ...state, error: action.message, isLoading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

export function useWizardState() {
  const [state, dispatch] = useReducer(reducer, initial);
  return { state, dispatch };
}
