import axiosClient from "../../../shared/api/axios";

export const getInventories = () => axiosClient.get("/inventory");

export const getInventory = (id) => axiosClient.get(`/inventory/${id}`);

export const addInventory = (data) => axiosClient.post("/inventory", data);

export const updateInventory = (id, data) => axiosClient.patch(`/inventory/${id}`, data);

export const deleteInventory = (id) => axiosClient.delete(`/inventory/${id}`);