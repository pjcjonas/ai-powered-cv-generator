import { z } from "zod";

export const ContactInfoSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedinUrl: z.string().optional(),
  portfolioUrl: z.string().optional(),
});

export const WorkExperienceSchema = z.object({
  company: z.string(),
  title: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  location: z.string().optional(),
  bullets: z.array(z.string()).min(1).max(6),
});

export const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  graduationYear: z.string().optional(),
  gpa: z.string().optional(),
});

export const SkillGroupSchema = z.object({
  category: z.string(),
  skills: z.array(z.string()).min(1),
});

export const AchievementSchema = z.object({
  title: z.string(),
  issuer: z.string().optional(),
  year: z.string().optional(),
  description: z.string().optional(),
});

export const CVDataSchema = z.object({
  contact: ContactInfoSchema,
  summary: z.string().min(20),
  experience: z.array(WorkExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(SkillGroupSchema),
  achievements: z.array(AchievementSchema).optional(),
});
