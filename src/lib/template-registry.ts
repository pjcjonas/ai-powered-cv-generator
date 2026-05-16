import type { ComponentType } from "react";
import type { CVData, TemplateId } from "./types";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";

interface TemplateEntry {
  label: string;
  description: string;
  component: ComponentType<{ cv: CVData }>;
  previewBg: string;
  previewAccent: string;
}

export const TEMPLATES: Record<TemplateId, TemplateEntry> = {
  classic: {
    label: "Classic",
    description: "Traditional serif layout with clean section dividers",
    component: ClassicTemplate,
    previewBg: "bg-gray-50",
    previewAccent: "border-gray-900",
  },
  modern: {
    label: "Modern",
    description: "Two-column layout with a bold accent sidebar",
    component: ModernTemplate,
    previewBg: "bg-blue-50",
    previewAccent: "border-blue-700",
  },
  minimal: {
    label: "Minimal",
    description: "Spacious content-first design with generous whitespace",
    component: MinimalTemplate,
    previewBg: "bg-white",
    previewAccent: "border-gray-300",
  },
};
