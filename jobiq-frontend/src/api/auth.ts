import { apiClient } from './client';
import { User } from '../store/useAuthStore';

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (email: string, password: string, full_name?: string): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/register', { email, password, full_name });
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put('/users/me', data);
    return response.data;
  },
};
