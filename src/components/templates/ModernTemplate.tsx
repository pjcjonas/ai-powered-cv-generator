import type { CVData } from "@/lib/types";
import { CVTemplateBase } from "./CVTemplateBase";

export function ModernTemplate({ cv }: { cv: CVData }) {
  return (
    <CVTemplateBase
      cv={cv}
      layout="two-column"
      accentColor="blue-700"
      fontFamily="font-sans"
    />
  );
}
