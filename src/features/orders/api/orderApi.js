import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const getOrders = () => axios.get(`${BASE_URL}/orders`);
export const getOrder = (id) => axios.get(`${BASE_URL}/orders/${id}`);
export const addOrder = (order) => axios.post(`${BASE_URL}/orders`, order);
export const updateOrder = (id, order) => axios.patch(`${BASE_URL}/orders/${id}`, order);
export const deleteOrder = (id) => axios.delete(`${BASE_URL}/orders/${id}`);

export const cancelOrder = (id) => {
  return axios.patch(`${BASE_URL}/orders/${id}`, { order_status: "CANCELLED" });
};

export const getCustomerOrders = (customerId) => {
  return axios.get(`${BASE_URL}/orders?customer_id=${customerId}`);
};

export const getOrderItems = (orderId) => {
  return axios.get(`${BASE_URL}/order_items?order_id=${orderId}`);
};

export const addOrderItems = (items) => {
  return Promise.all(items.map((item) => axios.post(`${BASE_URL}/order_items`, item)));
};