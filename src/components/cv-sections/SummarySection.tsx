interface Props {
  summary: string;
  accentColor?: string;
  sidebarMode?: boolean;
}

export function SummarySection({ summary, accentColor = "gray-900", sidebarMode = false }: Props) {
  return (
    <div className="cv-section mb-5">
      <h2 className={`cv-section-header text-xs font-bold uppercase tracking-widest mb-2 ${sidebarMode ? "text-blue-200" : `text-${accentColor}`}`}>
        Professional Summary
      </h2>
      {!sidebarMode && <hr className={`border-${accentColor} mb-3`} />}
      <p className={`text-sm leading-relaxed ${sidebarMode ? "text-blue-50" : "text-gray-700"}`}>
        {summary}
      </p>
    </div>
  );
}
