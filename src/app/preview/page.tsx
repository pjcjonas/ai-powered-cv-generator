"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CVDataSchema } from "@/lib/schema";
import type { CVData, TemplateId } from "@/lib/types";
import { TEMPLATES } from "@/lib/template-registry";
import { PrintButton } from "@/components/ui/PrintButton";

export default function PreviewPage() {
  const router = useRouter();
  const [cvData, setCVData] = useState<CVData | null>(null);
  const [templateId, setTemplateId] = useState<TemplateId>("classic");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem("cv_data");
    const tmpl = sessionStorage.getItem("cv_template") as TemplateId | null;
    if (!raw) {
      router.push("/");
      return;
    }
    try {
      const parsed = CVDataSchema.parse(JSON.parse(raw));
      setCVData(parsed);
      if (tmpl) setTemplateId(tmpl);
    } catch {
      router.push("/");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!cvData) return null;

  const Template = TEMPLATES[templateId].component;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Screen-only chrome */}
      <div className="print:hidden sticky top-0 z-10 bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← Edit
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-medium text-gray-700">Template:</span>
          <div className="flex gap-2">
            {(Object.keys(TEMPLATES) as TemplateId[]).map((id) => (
              <button
                key={id}
                onClick={() => setTemplateId(id)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  templateId === id
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                }`}
              >
                {TEMPLATES[id].label}
              </button>
            ))}
          </div>
        </div>
        <PrintButton />
      </div>

      {/* CV preview */}
      <div className="py-8 px-4">
        <Template cv={cvData} />
      </div>
    </div>
  );
}
