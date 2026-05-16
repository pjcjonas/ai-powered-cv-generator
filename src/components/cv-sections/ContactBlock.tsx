import type { ContactInfo } from "@/lib/types";

interface Props {
  contact: ContactInfo;
  accentColor?: string;
  layout?: "single-column" | "two-column";
}

export function ContactBlock({ contact, accentColor = "gray-900", layout = "single-column" }: Props) {
  const isTwoCol = layout === "two-column";

  return (
    <div className={isTwoCol ? "" : `border-b-2 border-${accentColor} pb-4 mb-6`}>
      <h1 className={`font-bold leading-tight ${isTwoCol ? "text-2xl text-white mb-1" : "text-4xl text-gray-900 mb-2"}`}>
        {contact.fullName}
      </h1>
      <div className={`flex flex-wrap gap-x-4 gap-y-1 text-sm ${isTwoCol ? "text-blue-100" : "text-gray-600"}`}>
        {contact.email && <span>{contact.email}</span>}
        {contact.phone && <span>{contact.phone}</span>}
        {contact.location && <span>{contact.location}</span>}
        {contact.linkedinUrl && (
          <a href={contact.linkedinUrl} className={`underline ${isTwoCol ? "text-blue-200" : `text-${accentColor}`}`}>
            LinkedIn
          </a>
        )}
        {contact.portfolioUrl && (
          <a href={contact.portfolioUrl} className={`underline ${isTwoCol ? "text-blue-200" : `text-${accentColor}`}`}>
            Portfolio
          </a>
        )}
      </div>
    </div>
  );
}
