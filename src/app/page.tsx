"use client";

import { useWizardState } from "@/hooks/useWizardState";
import { StepIndicator } from "@/components/wizard/StepIndicator";
import { Step1LinkedIn } from "@/components/wizard/Step1LinkedIn";
import { Step2JobPosting } from "@/components/wizard/Step2JobPosting";
import { Step3Template } from "@/components/wizard/Step3Template";
import { Step4Generate } from "@/components/wizard/Step4Generate";

export default function HomePage() {
  const { state, dispatch } = useWizardState();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">CV</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">CV Generator</h1>
            <p className="text-xs text-gray-400">AI-powered · Tailored to every job</p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          <StepIndicator current={state.step} />

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {state.step === 1 && <Step1LinkedIn state={state} dispatch={dispatch} />}
            {state.step === 2 && <Step2JobPosting state={state} dispatch={dispatch} />}
            {state.step === 3 && <Step3Template state={state} dispatch={dispatch} />}
            {state.step === 4 && <Step4Generate state={state} dispatch={dispatch} />}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-gray-400">
        Powered by Claude AI · Your data is never stored
      </footer>
    </div>
  );
}
