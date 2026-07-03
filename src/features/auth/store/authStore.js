import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useAuthStore = create()(
  devtools(
    persist(
      (set) => ({
        user: null,
        role: null,
        isAuthenticated: false,

        setSession: ({ user, role }) =>
          set({ user, role, isAuthenticated: true }, false, "auth/setSession"),

        clearSession: () =>
          set({ user: null, role: null, isAuthenticated: false }, false, "auth/clearSession"),

        updateUser: (updates) =>
          set(
            (state) => ({
              user: state.user ? { ...state.user, ...updates } : state.user
            }),
            false,
            "auth/updateUser"
          )
      }),
      { name: "auth-storage" }
    ),
    { name: "AuthStore" }
  )
);

export default useAuthStore;