import type { CVData } from "@/lib/types";
import { CVTemplateBase } from "./CVTemplateBase";

export function ClassicTemplate({ cv }: { cv: CVData }) {
  return (
    <CVTemplateBase
      cv={cv}
      layout="single-column"
      accentColor="gray-900"
      fontFamily="font-serif"
    />
  );
}
