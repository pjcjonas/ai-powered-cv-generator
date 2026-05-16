import type { WorkExperience } from "@/lib/types";

interface Props {
  experience: WorkExperience[];
  accentColor?: string;
}

export function ExperienceSection({ experience, accentColor = "gray-900" }: Props) {
  if (!experience.length) return null;

  return (
    <div className="cv-section mb-5">
      <h2 className={`cv-section-header text-xs font-bold uppercase tracking-widest mb-2 text-${accentColor}`}>
        Experience
      </h2>
      <hr className={`border-${accentColor} mb-3`} />
      <div className="space-y-4">
        {experience.map((job, i) => (
          <div key={i} className="cv-experience-item">
            <div className="flex justify-between items-baseline flex-wrap gap-x-2">
              <span className="font-semibold text-sm text-gray-900">{job.title}</span>
              <span className="text-xs text-gray-500">
                {job.startDate} – {job.endDate ?? "Present"}
              </span>
            </div>
            <div className="flex justify-between items-baseline flex-wrap gap-x-2 mb-1">
              <span className={`text-sm font-medium text-${accentColor}`}>{job.company}</span>
              {job.location && <span className="text-xs text-gray-400">{job.location}</span>}
            </div>
            <ul className="list-disc list-outside ml-4 space-y-1">
              {job.bullets.map((b, j) => (
                <li key={j} className="text-sm text-gray-700 leading-snug">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
