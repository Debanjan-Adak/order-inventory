import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductByName,
  fetchProductsByBrand,
  fetchProductsByColour,
  fetchProductsSorted,
  fetchProductsByPriceRange,
} from "../api/productApi";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const useProduct = (productName) => {
  return useQuery({
    queryKey: ["products", "name", productName],
    queryFn: () => fetchProductByName(productName),
    enabled: Boolean(productName),
  });
};

export const useProductsByBrand = (brand) => {
  return useQuery({
    queryKey: ["products", "brand", brand],
    queryFn: () => fetchProductsByBrand(brand),
    enabled: Boolean(brand),
  });
};

export const useProductsByColour = (colour) => {
  return useQuery({
    queryKey: ["products", "colour", colour],
    queryFn: () => fetchProductsByColour(colour),
    enabled: Boolean(colour),
  });
};

export const useProductsSorted = (field) => {
  return useQuery({
    queryKey: ["products", "sort", field],
    queryFn: () => fetchProductsSorted(field),
    enabled: Boolean(field),
  });
};

export const useProductsByPriceRange = (min, max) => {
  return useQuery({
    queryKey: ["products", "price-range", min, max],
    queryFn: () => fetchProductsByPriceRange(min, max),
    enabled: min !== undefined && max !== undefined,
  });
};