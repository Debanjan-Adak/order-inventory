import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Cart items are stored as plain objects so persist can serialize them
// straight to localStorage without any custom hydration logic.
// Shape: { productId, name, unitPrice, colour, quantity }

const useCartStore = create()(
  devtools(
    persist(
      (set, get) => ({
        items: [],

        addItem: (product, quantity = 1) =>
          set(
            (state) => {
              const existing = state.items.find((item) => item.productId === product.id);

              if (existing) {
                return {
                  items: state.items.map((item) =>
                    item.productId === product.id
                      ? { ...item, quantity: item.quantity + quantity }
                      : item
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
            },
            false,
            "cart/addItem"
          ),

        removeItem: (productId) =>
          set(
            (state) => ({ items: state.items.filter((item) => item.productId !== productId) }),
            false,
            "cart/removeItem"
          ),

        updateQuantity: (productId, quantity) =>
          set(
            (state) => ({
              items:
                quantity <= 0
                  ? state.items.filter((item) => item.productId !== productId)
                  : state.items.map((item) =>
                      item.productId === productId ? { ...item, quantity } : item
                    ),
            }),
            false,
            "cart/updateQuantity"
          ),

        clearCart: () => set({ items: [] }, false, "cart/clearCart"),

        getItemCount: () => get().items.reduce((total, item) => total + item.quantity, 0),

        getSubtotal: () =>
          get().items.reduce((total, item) => total + item.unitPrice * item.quantity, 0),
      }),
      { name: "cart-storage" }
    ),
    { name: "CartStore" }
  )
);

export default useCartStore;
