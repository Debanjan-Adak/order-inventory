
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { getOrders, getOrder, getOrderItems } from "../api/orderApi";


export const useOrderStore = create((set) => ({
  theme: "light",
  toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
  draftItems: [],
  clearDraft: () => set({ draftItems: [] })
}));


export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await getOrders();
      return data;
    }
  });
};

export const useOrderDetails = (id) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const orderRes = await getOrder(id);
      const itemsRes = await getOrderItems(id);
      return { ...orderRes.data, items: itemsRes.data };
    },
    enabled: !!id
  });
};


export const useOrderStatusCount = () => {
  return useQuery({
    queryKey: ["orders", "statusCount"],
    queryFn: async () => {
      const { data } = await getOrders();
      const counts = {};
      data.forEach((order) => {
        const status = order.order_status || "UNKNOWN";
        counts[status] = (counts[status] || 0) + 1;
      });
      return counts;
    }
  });
};