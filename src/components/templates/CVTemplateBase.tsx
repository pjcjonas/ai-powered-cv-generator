import type { CVData } from "@/lib/types";
import { ContactBlock } from "@/components/cv-sections/ContactBlock";
import { SummarySection } from "@/components/cv-sections/SummarySection";
import { ExperienceSection } from "@/components/cv-sections/ExperienceSection";
import { EducationSection } from "@/components/cv-sections/EducationSection";
import { SkillsSection } from "@/components/cv-sections/SkillsSection";
import { AchievementsSection } from "@/components/cv-sections/AchievementsSection";

interface Props {
  cv: CVData;
  layout: "single-column" | "two-column";
  accentColor?: string;
  fontFamily?: string;
}

export function CVTemplateBase({ cv, layout, accentColor = "gray-900", fontFamily = "font-sans" }: Props) {
  if (layout === "two-column") {
    return (
      <div id="cv-print-root" className={`cv-page ${fontFamily} bg-white`}>
        <div className="flex min-h-full">
          {/* Sidebar */}
          <div className="w-52 shrink-0 bg-blue-700 p-6 print:bg-blue-700 print:text-white" style={{ printColorAdjust: "exact", WebkitPrintColorAdjust: "exact" }}>
            <ContactBlock contact={cv.contact} accentColor={accentColor} layout="two-column" />
            <div className="mt-6">
              <SkillsSection skills={cv.skills} accentColor={accentColor} compact />
              <EducationSection education={cv.education} accentColor={accentColor} compact />
              <AchievementsSection achievements={cv.achievements} accentColor={accentColor} compact />
            </div>
          </div>
          {/* Main content */}
          <div className="flex-1 p-8">
            <SummarySection summary={cv.summary} accentColor="blue-700" />
            <ExperienceSection experience={cv.experience} accentColor="blue-700" />
          </div>
        </div>
      </div>
    );
  }

  // Single column
  return (
    <div id="cv-print-root" className={`cv-page ${fontFamily} bg-white p-10`}>
      <ContactBlock contact={cv.contact} accentColor={accentColor} layout="single-column" />
      <SummarySection summary={cv.summary} accentColor={accentColor} />
      <ExperienceSection experience={cv.experience} accentColor={accentColor} />
      <EducationSection education={cv.education} accentColor={accentColor} />
      <SkillsSection skills={cv.skills} accentColor={accentColor} />
      <AchievementsSection achievements={cv.achievements} accentColor={accentColor} />
    </div>
  );
}
