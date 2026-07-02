// Thin REST client for the customers resource.
// Uses the shared axiosClient instance pointed at json-server (port 4000).

import axiosClient from "../../../shared/api/axios";

// GET /customers?search=&status=&page=&limit=
export async function getCustomers(filters = {}) {
  const params = {};
  if (filters.search) params.search = filters.search;
  if (filters.status && filters.status !== "all") params.status = filters.status;
  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;

  const { data } = await axiosClient.get("/customers", { params });
  return data;
}

// GET /customers/:id
export async function getCustomerById(customerId) {
  const { data } = await axiosClient.get(`/customers/${customerId}`);
  return data;
}

// GET /orders?customer_id=:id — read-only order history for the detail page
export async function getCustomerOrders(customerId) {
  const { data } = await axiosClient.get("/orders", { params: { customer_id: customerId } });
  return data;
}

// POST /customers
export async function createCustomer(payload) {
  const { data } = await axiosClient.post("/customers", payload);
  return data;
}

// PUT /customers/:id
export async function updateCustomer(customerId, payload) {
  const { data } = await axiosClient.put(`/customers/${customerId}`, payload);
  return data;
}

// DELETE /customers/:id
export async function deleteCustomer(customerId) {
  const { data } = await axiosClient.delete(`/customers/${customerId}`);
  return data;
}

// PATCH /customers/:id — used for both ban and unban, toggling isblocked
export async function setCustomerBlockedStatus(customerId, isblocked) {
  const { data } = await axiosClient.patch(`/customers/${customerId}`, { isblocked });
  return data;
}
