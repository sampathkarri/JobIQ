import { apiClient } from './client';

export interface Resume {
  id: number;
  user_id: number;
  title: string;
  file_url?: string | null;
  raw_text?: string | null;
  parsed_data?: Record<string, any> | null;
  skills?: string[] | null;
  experience_summary?: string | null;
  education_summary?: string | null;
  projects?: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface ResumeListResponse {
  items: Resume[];
}

export interface ResumeCreate {
  title: string;
  raw_text?: string;
  file_url?: string;
}

export const resumesApi = {
  getResumes: async (): Promise<ResumeListResponse> => {
    const response = await apiClient.get('/resumes/');
    return response.data;
  },

  getResumeById: async (id: number): Promise<Resume> => {
    const response = await apiClient.get(`/resumes/${id}`);
    return response.data;
  },

  createResume: async (data: ResumeCreate): Promise<Resume> => {
    const response = await apiClient.post('/resumes/', data);
    return response.data;
  },

  deleteResume: async (id: number): Promise<{ detail: string }> => {
    const response = await apiClient.delete(`/resumes/${id}`);
    return response.data;
  },
};
