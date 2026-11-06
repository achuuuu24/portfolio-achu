export type TemplateId = 'tech' | 'minimal' | 'creative' | 'executive' | 'academic';

export type PaletteId =
  | 'cyan'      // Tech Neon Cyan
  | 'violet'    // Cyber Violet & Fuchsia
  | 'emerald'   // Modern Green & Teal
  | 'amber'     // Creative Sunset Gold
  | 'indigo'    // Royal Indigo Executive
  | 'coral'     // Warm Coral & Peach
  | 'editorial' // Editorial Warm Sand & Charcoal
  | 'slate';    // Sleek Monochromatic Slate

export type FontPairingId = 'modern' | 'editorial' | 'tech' | 'creative' | 'clean';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 0-100
  category?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  year: string;
  description?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  achievements?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badgeUrl?: string;
  verifyUrl?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  behance?: string;
  dribbble?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
}

export type SectionId =
  | 'hero'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'education'
  | 'certifications'
  | 'contact';

export interface SectionConfig {
  id: SectionId;
  label: string;
  enabled: boolean;
}

export interface ThemeConfig {
  template: TemplateId;
  palette: PaletteId;
  fontPairing: FontPairingId;
  mode: 'dark' | 'light';
  aiRecommendationReason?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  contact: ContactInfo;
  skills: SkillItem[];
  tools: string[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  hobbies: string[];
  socialLinks: SocialLinks;
  careerGoals: string;
  sections: SectionConfig[];
  theme: ThemeConfig;
  lastUpdated?: string;
}

export interface QuestionStepConfig {
  id: number;
  key: string;
  question: string;
  subtext: string;
  aiMessage: string;
  placeholder?: string;
  inputType: 'text' | 'textarea' | 'image' | 'tags' | 'education' | 'experience' | 'projects' | 'certifications' | 'socials' | 'contact';
  isOptional: boolean;
  suggestions?: string[];
  aiFeedbackAfter?: (val: any) => string;
}

