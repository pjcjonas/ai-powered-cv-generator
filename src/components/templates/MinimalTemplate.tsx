import type { CVData } from "@/lib/types";
import { CVTemplateBase } from "./CVTemplateBase";

export function MinimalTemplate({ cv }: { cv: CVData }) {
  return (
    <CVTemplateBase
      cv={cv}
      layout="single-column"
      accentColor="gray-400"
      fontFamily="font-sans"
    />
  );
}
