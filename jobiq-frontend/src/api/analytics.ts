import { apiClient } from './client';

export interface MarketAnalytics {
  total_opportunities: number;
  top_skills: Array<{ skill: string; count: number }>;
  salary_stats: {
    avg_min: number;
    avg_max: number;
    median_min: number;
    median_max: number;
  };
  type_breakdown: Array<{ type: string; count: number }>;
  remote_ratio: number;
  top_companies: Array<{ company: string; count: number }>;
}

export interface PersonalAnalytics {
  total_applications: number;
  status_breakdown: Array<{ status: string; count: number }>;
  total_matches: number;
  avg_match_score: number;
  total_saved: number;
  funnel: {
    interested: number;
    applied: number;
    interviewing: number;
    offered: number;
    rejected: number;
    withdrawn: number;
  };
}

export const analyticsApi = {
  getMarketAnalytics: async (): Promise<MarketAnalytics> => {
    const response = await apiClient.get('/analytics/market');
    return response.data;
  },

  getPersonalAnalytics: async (): Promise<PersonalAnalytics> => {
    const response = await apiClient.get('/analytics/personal');
    return response.data;
  },
};
