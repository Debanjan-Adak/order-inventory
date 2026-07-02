import { useQuery } from "@tanstack/react-query";
import { getCustomers, getCustomerById, getCustomerOrders } from "../api/customerApi";

// List page: search + status filter, paginated
export function useCustomers(filters = {}) {
  return useQuery({
    queryKey: ["customers", filters],
    queryFn: () => getCustomers(filters),
    keepPreviousData: true,
    staleTime: 30_000,
  });
}

// Detail page: single customer record
export function useCustomer(customerId) {
  return useQuery({
    queryKey: ["customers", customerId],
    queryFn: () => getCustomerById(customerId),
    enabled: Boolean(customerId),
  });
}

// Detail page: read-only order history, owned by the orders feature's API
// but fetched here through /customers/:id/order per the API spec
export function useCustomerOrders(customerId) {
  return useQuery({
    queryKey: ["customers", customerId, "orders"],
    queryFn: () => getCustomerOrders(customerId),
    enabled: Boolean(customerId),
  });
}

// Used by DashboardChart: counts shipment statuses from orders
export function useShipmentStatusCount() {
  return useQuery({
    queryKey: ["shipments", "statusCount"],
    queryFn: async () => {
      // Shipment data is derived from order statuses for now
      const { data } = await import("../../orders/api/orderApi").then(m => m.getOrders());
      const counts = {};
      data.forEach((order) => {
        const status = order.order_status || "UNKNOWN";
        counts[status] = (counts[status] || 0) + 1;
      });
      return counts;
    }
  });
}
