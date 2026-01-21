import { ATSResult, SkillGapResult, CareerPath, RoadmapData } from "../types";

// TEMP STUB IMPLEMENTATION so the UI works without real AI calls.

export async function analyzeResume(resumeText: string): Promise<ATSResult> {
  console.warn("analyzeResume: using stub data, not calling Gemini");
  return {
    score: 78,
    keywordMatch: 72,
    formattingIssues: [
      "Use consistent bullet styles.",
      "Align dates to the right."
    ],
    missingKeywords: ["TypeScript", "CI/CD", "Unit Testing"],
    suggestions: [
      "Add measurable impact for each experience (e.g., 'increased performance by 20%').",
      "Include a dedicated skills section with categorized tools."
    ],
    parsedData: {
      skills: ["JavaScript", "React", "Node.js"],
      experience: ["Frontend Developer at Example Corp (2021–Present)."],
      education: ["BSc in Computer Science"]
    }
  };
}

export async function analyzeSkillGap(skills: string[], targetRole: string): Promise<SkillGapResult> {
  console.warn("analyzeSkillGap: using stub data, not calling Gemini");
  return {
    roleFitScore: 63,
    missingSkills: ["Docker", "Kubernetes", "TypeScript"],
    recommendedCertifications: [
      "AWS Certified Cloud Practitioner",
      "Docker Certified Associate"
    ],
    recommendedTools: ["Docker", "Kubernetes", "Jest"],
    recommendedCourses: [
      "Docker for Beginners",
      "Kubernetes Fundamentals",
      "TypeScript Complete Guide"
    ]
  };
}

export async function predictCareerPaths(skills: string[]): Promise<CareerPath[]> {
  console.warn("predictCareerPaths: using stub data, not calling Gemini");
  return [
    {
      title: "Frontend Developer",
      difficulty: "Intermediate",
      industries: ["SaaS", "E‑commerce"],
      requiredSkills: ["React", "TypeScript", "REST APIs"],
      commonCerts: ["Front-End Web Developer Nanodegree"]
    },
    {
      title: "Full Stack Developer",
      difficulty: "Advanced",
      industries: ["Startups", "Consulting"],
      requiredSkills: ["React", "Node.js", "SQL/NoSQL"],
      commonCerts: ["Full-Stack Web Developer Certification"]
    },
    {
      title: "Cloud Developer",
      difficulty: "Advanced",
      industries: ["Cloud", "DevOps"],
      requiredSkills: ["Docker", "CI/CD", "Cloud Provider Basics"],
      commonCerts: ["AWS Cloud Practitioner", "Azure Fundamentals"]
    }
  ];
}

export async function generateRoadmap(careerTitle: string, currentSkills: string[]): Promise<RoadmapData> {
  console.warn("generateRoadmap: using stub data, not calling Gemini");
  return {
    title: `Roadmap to become a ${careerTitle}`,
    overview: `This is an example roadmap for ${careerTitle} based on your current skills: ${currentSkills.join(", ") || "N/A"}.`,
    steps: [
      {
        title: "Foundation",
        description: "Strengthen core programming and problem-solving skills.",
        duration: "1–2 months",
        tools: ["JavaScript", "Git", "VS Code"]
      },
      {
        title: "Core Stack",
        description: "Learn main technologies used in the role.",
        duration: "2–3 months",
        tools: ["React", "Node.js", "REST APIs"]
      },
      {
        title: "Projects & Portfolio",
        description: "Build 2–3 real-world style projects and publish them.",
        duration: "1–2 months",
        tools: ["GitHub", "Netlify", "Vercel"]
      }
    ]
  };
}