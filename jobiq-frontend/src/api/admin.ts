import { apiClient } from './client';

export interface ScraperStats {
  total_opportunities: number;
  by_source: Record<string, number>;
}

export const adminApi = {
  triggerScrape: async (source?: string): Promise<{ message: string; task_id?: string; result?: any }> => {
    const response = await apiClient.post('/admin/scrape', null, { params: { source } });
    return response.data;
  },

  triggerDeduplicate: async (): Promise<{ message: string; task_id?: string; duplicates_removed?: number }> => {
    const response = await apiClient.post('/admin/deduplicate');
    return response.data;
  },

  getStats: async (): Promise<ScraperStats> => {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },
};
