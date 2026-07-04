import { useQuery } from '@tanstack/react-query';
import { productApi } from '../api/productApi';

export const PRODUCTS_QUERY_KEY = ['products'];

export function useProducts() {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: productApi.getAll,
  });
}

export function useProductSearch(name) {
  return useQuery({
    queryKey: ['products', 'search', name],
    queryFn: () => productApi.search(name),
    enabled: !!name,
  });
}

export function useProductsByBrand(brand) {
  return useQuery({
    queryKey: ['products', 'brand', brand],
    queryFn: () => productApi.byBrand(brand),
    enabled: !!brand,
  });
}

export function useProductsByColour(colour) {
  return useQuery({
    queryKey: ['products', 'colour', colour],
    queryFn: () => productApi.byColour(colour),
    enabled: !!colour,
  });
}

export function useProductsByPriceRange(min, max) {
  return useQuery({
    queryKey: ['products', 'price-range', min, max],
    queryFn: () => productApi.byPriceRange(min, max),
    enabled: Number.isFinite(min) && Number.isFinite(max),
  });
}

export function useProductsSorted(field) {
  return useQuery({
    queryKey: ['products', 'sort', field],
    queryFn: () => productApi.sorted(field),
    enabled: !!field,
  });
}

export default useProducts;