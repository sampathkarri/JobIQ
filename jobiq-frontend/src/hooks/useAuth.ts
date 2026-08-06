import { useSyncExternalStore } from "react";

import { authStore } from "../store/authStore";

export function useAuth() {
  const user = useSyncExternalStore(authStore.subscribe, authStore.getUserSnapshot);
  return {
    user,
    isAuthenticated: Boolean(user),
    setUser: authStore.setUser,
    clearUser: authStore.clearUser,
  };
}

