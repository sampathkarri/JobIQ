import { apiClient } from './client';

export interface CustomJob {
  id: number;
  user_id: number;
  title: string;
  company: string;
  location?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency: string;
  description?: string | null;
  required_skills: string[];
  source_url: string;
  source_name?: string | null;
  posted_at?: string | null;
  application_deadline?: string | null;
  status: string;
  notes?: string | null;
  interview_dates: string[];
  salary_offered?: number | null;
  rejected_reason?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomJobParseResponse {
  title: string;
  company: string;
  location?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency: string;
  description?: string | null;
  required_skills: string[];
  source_name?: string | null;
  source_url: string;
}

export interface CustomJobCreatePayload {
  title: string;
  company: string;
  location?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  salary_currency?: string;
  description?: string | null;
  required_skills?: string[];
  source_url: string;
  source_name?: string | null;
  status?: string;
  notes?: string | null;
  interview_dates?: string[];
  salary_offered?: number | null;
  rejected_reason?: string | null;
}

export interface CustomJobListResponse {
  items: CustomJob[];
  total: number;
}

export const customJobsApi = {
  parseLink: async (url: string): Promise<CustomJobParseResponse> => {
    const response = await apiClient.post('/custom-jobs/from-link', { url });
    return response.data;
  },

  createCustomJob: async (data: CustomJobCreatePayload): Promise<CustomJob> => {
    const response = await apiClient.post('/custom-jobs/manual', data);
    return response.data;
  },

  getCustomJobs: async (status?: string): Promise<CustomJobListResponse> => {
    const response = await apiClient.get('/custom-jobs/', { params: { status } });
    return response.data;
  },

  getCustomJobById: async (id: number): Promise<CustomJob> => {
    const response = await apiClient.get(`/custom-jobs/${id}`);
    return response.data;
  },

  updateCustomJob: async (id: number, data: Partial<CustomJobCreatePayload>): Promise<CustomJob> => {
    const response = await apiClient.put(`/custom-jobs/${id}`, data);
    return response.data;
  },

  deleteCustomJob: async (id: number): Promise<{ message: string; id: number }> => {
    const response = await apiClient.delete(`/custom-jobs/${id}`);
    return response.data;
  },
};
