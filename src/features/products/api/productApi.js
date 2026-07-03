import axiosClient from "../../../shared/api/axios";

const BASE_URL = "/products";

export const fetchProducts = async () => {
  const response = await axiosClient.get(BASE_URL);
  return response.data;
};

export const fetchProductByName = async (productName) => {
  const response = await axiosClient.get(`${BASE_URL}`, {
    params: { product_name: productName }
  });
  return response.data;
};

export const fetchProductsByBrand = async (brand) => {
  const response = await axiosClient.get(`${BASE_URL}`, {
    params: { brand }
  });
  return response.data;
};

export const fetchProductsByColour = async (colour) => {
  const response = await axiosClient.get(`${BASE_URL}`, {
    params: { colour }
  });
  return response.data;
};

export const fetchProductsSorted = async (field) => {
  const response = await axiosClient.get(`${BASE_URL}`, {
    params: { _sort: field },
  });
  return response.data;
};

export const fetchProductsByPriceRange = async (min, max) => {
  const response = await axiosClient.get(`${BASE_URL}`, {
    params: { unit_price_gte: min, unit_price_lte: max },
  });
  return response.data;
};

export const createProduct = async (payload) => {
  const response = await axiosClient.post(BASE_URL, payload);
  return response.data;
};

export const updateProduct = async (payload) => {
  const response = await axiosClient.put(`${BASE_URL}/${payload.id}`, payload);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosClient.delete(`${BASE_URL}/${id}`);
  return response.data;
};