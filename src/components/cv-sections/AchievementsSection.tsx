import type { Achievement } from "@/lib/types";

interface Props {
  achievements?: Achievement[];
  accentColor?: string;
  compact?: boolean;
}

export function AchievementsSection({ achievements, accentColor = "gray-900", compact = false }: Props) {
  if (!achievements?.length) return null;

  return (
    <div className="cv-section mb-5">
      <h2 className={`cv-section-header text-xs font-bold uppercase tracking-widest mb-2 ${compact ? "text-blue-200" : `text-${accentColor}`}`}>
        Certifications & Awards
      </h2>
      {!compact && <hr className={`border-${accentColor} mb-3`} />}
      <div className="space-y-1">
        {achievements.map((a, i) => (
          <div key={i}>
            <span className={`text-sm font-semibold ${compact ? "text-white" : "text-gray-900"}`}>
              {a.title}
            </span>
            {(a.issuer || a.year) && (
              <span className={`text-sm ${compact ? "text-blue-100" : "text-gray-600"}`}>
                {" "}· {[a.issuer, a.year].filter(Boolean).join(", ")}
              </span>
            )}
            {a.description && (
              <p className={`text-xs mt-0.5 ${compact ? "text-blue-100" : "text-gray-500"}`}>
                {a.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
