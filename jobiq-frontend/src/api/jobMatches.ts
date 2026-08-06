import { apiClient } from './client';

export interface JobMatch {
  id: number;
  user_id: number;
  opportunity_id: number;
  match_score: number;
  matching_skills?: string[] | null;
  missing_skills?: string[] | null;
  match_reason?: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobMatchListResponse {
  items: JobMatch[];
}

export const jobMatchesApi = {
  getJobMatches: async (min_score: number = 0): Promise<JobMatchListResponse> => {
    const response = await apiClient.get('/job-matches/', { params: { min_score } });
    return response.data;
  },

  getTopMatches: async (): Promise<JobMatchListResponse> => {
    const response = await apiClient.get('/job-matches/top');
    return response.data;
  },
};
