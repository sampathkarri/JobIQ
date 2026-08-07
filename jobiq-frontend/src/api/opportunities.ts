import { apiClient } from './client';

export interface Opportunity {
  id: number;
  type: string;
  title: string;
  company: string;
  location?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  stipend?: number | null;
  prize_pool?: number | null;
  duration_weeks?: number | null;
  description?: string | null;
  required_skills?: string[] | null;
  job_level?: string | null;
  employment_type?: string | null;
  remote: boolean;
  application_deadline?: string | null;
  source?: string | null;
  source_url?: string | null;
  source_job_id?: string | null;
  posted_at?: string | null;
  company_logo_url?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OpportunityListResponse {
  items: Opportunity[];
  total: number;
  page: number;
  per_page: number;
}

export interface OpportunitySearchParams {
  q?: string;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  type?: string;
  job_level?: string;
  employment_type?: string;
  remote?: boolean;
  skills?: string;
  page?: number;
  per_page?: number;
}

export const opportunitiesApi = {
  getOpportunities: async (params?: OpportunitySearchParams): Promise<OpportunityListResponse> => {
    const response = await apiClient.get('/opportunities/', { params });
    return response.data;
  },

  getOpportunityById: async (id: number): Promise<Opportunity> => {
    const response = await apiClient.get(`/opportunities/${id}`);
    return response.data;
  },

  createOpportunity: async (data: Partial<Opportunity>): Promise<Opportunity> => {
    const response = await apiClient.post('/opportunities/', data);
    return response.data;
  },

  triggerScrape: async (): Promise<{ message: string; task_id?: string; result?: any }> => {
    const response = await apiClient.post('/admin/scrape');
    return response.data;
  },
};
