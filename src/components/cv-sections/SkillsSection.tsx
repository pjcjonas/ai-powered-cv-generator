import type { SkillGroup } from "@/lib/types";

interface Props {
  skills: SkillGroup[];
  accentColor?: string;
  compact?: boolean;
}

export function SkillsSection({ skills, accentColor = "gray-900", compact = false }: Props) {
  if (!skills.length) return null;

  return (
    <div className="cv-section mb-5">
      <h2 className={`cv-section-header text-xs font-bold uppercase tracking-widest mb-2 ${compact ? "text-blue-200" : `text-${accentColor}`}`}>
        Skills
      </h2>
      {!compact && <hr className={`border-${accentColor} mb-3`} />}
      <div className="space-y-2">
        {skills.map((group, i) => (
          <div key={i}>
            <span className={`text-xs font-semibold uppercase ${compact ? "text-blue-200" : `text-${accentColor}`}`}>
              {group.category}:{" "}
            </span>
            <span className={`text-sm ${compact ? "text-blue-50" : "text-gray-700"}`}>
              {group.skills.join(", ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
