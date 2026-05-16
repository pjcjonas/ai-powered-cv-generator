export type TemplateId = "classic" | "modern" | "minimal";

export interface ContactInfo {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export interface WorkExperience {
  company: string;
  title: string;
  startDate: string;
  endDate: string | null;
  location?: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  graduationYear?: string;
  gpa?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  issuer?: string;
  year?: string;
  description?: string;
}

export interface CVData {
  contact: ContactInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: SkillGroup[];
  achievements?: Achievement[];
}

export type LinkedInMethod = "text" | "pdf";

export interface WizardState {
  step: 1 | 2 | 3 | 4;
  linkedinMethod: LinkedInMethod;
  linkedinInput: string;
  linkedinFile: File | null;
  linkedinRaw: string;
  jobPosting: string;
  templateId: TemplateId;
  generatedCV: CVData | null;
  isLoading: boolean;
  error: string | null;
}
