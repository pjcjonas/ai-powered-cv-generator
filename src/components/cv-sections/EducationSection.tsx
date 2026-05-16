import type { Education } from "@/lib/types";

interface Props {
  education: Education[];
  accentColor?: string;
  compact?: boolean;
}

export function EducationSection({ education, accentColor = "gray-900", compact = false }: Props) {
  if (!education.length) return null;

  return (
    <div className="cv-section mb-5">
      <h2 className={`cv-section-header text-xs font-bold uppercase tracking-widest mb-2 ${compact ? "text-blue-200" : `text-${accentColor}`}`}>
        Education
      </h2>
      {!compact && <hr className={`border-${accentColor} mb-3`} />}
      <div className="space-y-2">
        {education.map((edu, i) => (
          <div key={i}>
            <div className={`text-sm font-semibold ${compact ? "text-white" : "text-gray-900"}`}>
              {edu.institution}
            </div>
            <div className={`text-sm ${compact ? "text-blue-100" : "text-gray-600"}`}>
              {edu.degree}
              {edu.graduationYear && ` · ${edu.graduationYear}`}
              {edu.gpa && ` · GPA: ${edu.gpa}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
