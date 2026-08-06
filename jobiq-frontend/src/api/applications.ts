import { apiClient } from './client';

export interface Application {
  id: number;
  user_id: number;
  opportunity_id: number;
  status: 'interested' | 'applied' | 'interviewing' | 'offered' | 'rejected' | 'withdrawn';
  applied_date?: string | null;
  notes?: string | null;
  interview_dates?: string[] | null;
  salary_offered?: number | null;
  rejected_reason?: string | null;
  source_application_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicationListResponse {
  items: Application[];
  total: number;
}

export interface ApplicationCreate {
  opportunity_id: number;
  status?: string;
  notes?: string;
}

export interface ApplicationUpdate {
  status?: string;
  notes?: string;
  interview_dates?: string[];
  salary_offered?: number;
  rejected_reason?: string;
  source_application_url?: string;
}

export const applicationsApi = {
  getApplications: async (status?: string): Promise<ApplicationListResponse> => {
    const response = await apiClient.get('/applications/', { params: { status } });
    return response.data;
  },

  getApplicationById: async (id: number): Promise<Application> => {
    const response = await apiClient.get(`/applications/${id}`);
    return response.data;
  },

  createApplication: async (data: ApplicationCreate): Promise<Application> => {
    const response = await apiClient.post('/applications/', data);
    return response.data;
  },

  updateApplication: async (id: number, data: ApplicationUpdate): Promise<Application> => {
    const response = await apiClient.put(`/applications/${id}`, data);
    return response.data;
  },

  deleteApplication: async (id: number): Promise<{ detail: string }> => {
    const response = await apiClient.delete(`/applications/${id}`);
    return response.data;
  },
};
