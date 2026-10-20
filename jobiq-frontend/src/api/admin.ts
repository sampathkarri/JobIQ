import { apiClient } from './client';

export const adminApi = {
  triggerScrape: async (source?: string): Promise<{ message: string; result?: any }> => {
    const response = await apiClient.post('/admin/scrape', null, {
      params: source ? { source } : undefined,
    });
    return response.data;
  },
  triggerDeduplicate: async (): Promise<{ message: string; duplicates_removed: number }> => {
    const response = await apiClient.post('/admin/deduplicate');
    return response.data;
  },
  getStats: async (): Promise<{ total_opportunities: number; by_source: Record<string, number> }> => {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },
};
