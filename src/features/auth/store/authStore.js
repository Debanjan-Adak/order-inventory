import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCartStore } from '@features/cart/store/cartStore';

const INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => {
        useCartStore.getState().clearCart();
        return set({ ...INITIAL_STATE });
      },
    }),
    {
      name: 'smartbuy-auth',
    }
  )
);

export default useAuthStore;
