
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  age?: string;
  country?: string;
  bio: string;
  profileImage?: string;
  skills: string[];
  certifications: Certification[];
  courses: Course[];
  projects: Project[];
  experience: Experience[];
  exams: Exam[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  year: string;
  fileUrl?: string;
}

export interface Course {
  id: string;
  name: string;
  platform: string;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Exam {
  id: string;
  name: string;
  score: string;
  date: string;
}

export interface ATSResult {
  score: number;
  keywordMatch: number;
  formattingIssues: string[];
  missingKeywords: string[];
  suggestions: string[];
  parsedData: {
    skills: string[];
    experience: string[];
    education: string[];
  };
}

export interface SkillGapResult {
  roleFitScore: number;
  missingSkills: string[];
  recommendedCertifications: string[];
  recommendedTools: string[];
  recommendedCourses: string[];
}

export interface CareerPath {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  industries: string[];
  requiredSkills: string[];
  commonCerts: string[];
}

export interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
  tools: string[];
}

export interface RoadmapData {
  title: string;
  overview: string;
  steps: RoadmapStep[];
}

export interface AnalysisState {
  ats?: ATSResult;
  skillGap?: SkillGapResult;
  careerPaths?: CareerPath[];
  hasResume: boolean;
  loading: boolean;
  error?: string;
}
