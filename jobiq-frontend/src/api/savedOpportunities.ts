import { apiClient } from './client';
import { Opportunity } from './opportunities';

export interface SavedOpportunity {
  id: number;
  user_id: number;
  opportunity_id: number;
  saved_at: string;
  opportunity?: Opportunity | null;
}

export interface SavedOpportunityListResponse {
  items: SavedOpportunity[];
}

export const savedOpportunitiesApi = {
  getSavedOpportunities: async (): Promise<SavedOpportunityListResponse> => {
    const response = await apiClient.get('/saved-opportunities/');
    return response.data;
  },

  saveOpportunity: async (opportunity_id: number): Promise<SavedOpportunity> => {
    const response = await apiClient.post('/saved-opportunities/', { opportunity_id });
    return response.data;
  },

  unsaveOpportunity: async (opportunity_id: number): Promise<{ detail: string }> => {
    const response = await apiClient.delete(`/saved-opportunities/${opportunity_id}`);
    return response.data;
  },
};
