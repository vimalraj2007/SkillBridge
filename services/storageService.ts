
import { UserProfile } from "../types";

const STORAGE_KEY = "skillbridge_user_profile";

const defaultProfile: UserProfile = {
  id: "1",
  fullName: "Demo User",
  email: "demo@skillbridge.ai",
  age: "24",
  country: "United States",
  bio: "Aspiring software engineer with a passion for cloud computing.",
  profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  skills: ["JavaScript", "React", "Node.js"],
  certifications: [],
  courses: [],
  projects: [],
  experience: [],
  exams: []
};

export const storageService = {
  getProfile: (): UserProfile => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultProfile;
  },
  saveProfile: (profile: UserProfile): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  },
  updateProfile: (updates: Partial<UserProfile>): UserProfile => {
    const current = storageService.getProfile();
    const updated = { ...current, ...updates };
    storageService.saveProfile(updated);
    return updated;
  }
};
