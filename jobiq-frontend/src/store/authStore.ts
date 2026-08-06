export type AuthUser = {
  id: number;
  email: string;
  fullName?: string;
};

type Listener = () => void;

let currentUser: AuthUser | null = null;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener());
}

export const authStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getUserSnapshot(): AuthUser | null {
    return currentUser;
  },
  setUser(user: AuthUser) {
    currentUser = user;
    emit();
  },
  clearUser() {
    currentUser = null;
    emit();
  },
};

