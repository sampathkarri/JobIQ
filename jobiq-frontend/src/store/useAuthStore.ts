import { create } from 'zustand';

export interface User {
  id: number;
  email: string;
  full_name?: string | null;
  phone?: string | null;
  location?: string | null;
  current_role?: string | null;
  experience_years?: number | null;
  preferred_salary_min?: number | null;
  preferred_salary_max?: number | null;
  preferred_locations?: string[] | null;
  preferred_job_types?: string[] | null;
  avatar_url?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user?: User | null) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('jobiq_token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('jobiq_token'),

  setAuth: (token: string, user: User | null = null) => {
    localStorage.setItem('jobiq_token', token);
    set({ token, user, isAuthenticated: true });
  },

  setUser: (user: User) => {
    set({ user });
  },

  logout: () => {
    localStorage.removeItem('jobiq_token');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
