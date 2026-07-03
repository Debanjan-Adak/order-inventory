import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const cartStore = (set, get) => ({
  items: [],

  addItem: (product, quantity = 1) =>
    set((state) => {
      const existing = state.items.find(
        (item) => item.productId === product.id,
      );

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            productId: product.id,
            name: product.name,
            unitPrice: product.unitPrice,
            colour: product.colour,
            quantity,
          },
        ],
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((item) => item.productId !== productId)
          : state.items.map((item) =>
              item.productId === productId ? { ...item, quantity } : item,
            ),
    })),

  clearCart: () => set({ items: [] }),

  getItemCount: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  getSubtotal: () =>
    get().items.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0,
    ),
});

const useCartStore = create(
  devtools(
    persist(cartStore, {
      name: "cart-storage",
    }),
    {
      name: "CartStore",
    },
  ),
);

export default useCartStore;
