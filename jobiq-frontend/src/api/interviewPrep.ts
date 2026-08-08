import { apiClient } from './client';

export interface ScrapedQuestion {
  id: number;
  category: "Technical" | "Behavioral" | "System Design" | "HR" | "DSA";
  role: string;
  difficulty: "Easy" | "Medium" | "Hard";
  title: string;
  tips: string;
  keywords: string[];
  ideal_points: string[];
  company: string;
  source_url?: string;
}

export const interviewPrepApi = {
  fetchInterviewBitQuestions: async (): Promise<{ source: string; total: number; questions: ScrapedQuestion[] }> => {
    const response = await apiClient.get('/interview-prep/scrape-interviewbit');
    return response.data;
  },
};
