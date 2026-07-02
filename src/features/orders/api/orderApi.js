import axiosClient from "../../../shared/api/axios";

export const getOrders = () => axiosClient.get("/orders");
export const getOrder = (id) => axiosClient.get(`/orders/${id}`);
export const addOrder = (order) => axiosClient.post("/orders", order);
export const updateOrder = (id, order) => axiosClient.patch(`/orders/${id}`, order);
export const deleteOrder = (id) => axiosClient.delete(`/orders/${id}`);

export const cancelOrder = (id) => {
  return axiosClient.patch(`/orders/${id}`, { order_status: "CANCELLED" });
};

export const getCustomerOrders = (customerId) => {
  return axiosClient.get("/orders", { params: { customer_id: customerId } });
};

export const getOrderItems = (orderId) => {
  return axiosClient.get("/order_items", { params: { order_id: orderId } });
};

export const addOrderItems = (items) => {
  return Promise.all(items.map((item) => axiosClient.post("/order_items", item)));
};