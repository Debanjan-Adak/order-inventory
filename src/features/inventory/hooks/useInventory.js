import { useQuery } from '@tanstack/react-query';
import { inventoryApi } from '../api/inventoryApi';

export const INVENTORY_QUERY_KEY = ['inventory'];

/**
 *
 * @param {number|string} [storeId] - pass `undefined` for the unfiltered "all" case
 */

export function useInventory(storeId) {
  return useQuery({
    queryKey: [...INVENTORY_QUERY_KEY, 'list', storeId ?? 'all'],
    queryFn: () => inventoryApi.getAll(storeId),
  });
}

export function useInventoryByProductStore(productId, storeId) {
  return useQuery({
    queryKey: [...INVENTORY_QUERY_KEY, 'byProductStore', productId, storeId],
    queryFn: () => inventoryApi.getByProductStore(productId, storeId),
    enabled: !!productId && !!storeId,
  });
}


export function useInventoryByCategory(category) {
  return useQuery({
    queryKey: [...INVENTORY_QUERY_KEY, 'byCategory', category],
    queryFn: () => inventoryApi.getByCategory(category),
    enabled: !!category,
  });
}


export function useInventoryShipmentReport() {
  return useQuery({
    queryKey: [...INVENTORY_QUERY_KEY, 'shipmentReport'],
    queryFn: () => inventoryApi.getShipmentReport(),
  });
}


export function useInventoryByOrder(orderId) {
  return useQuery({
    queryKey: [...INVENTORY_QUERY_KEY, 'byOrder', orderId],
    queryFn: () => inventoryApi.getByOrder(orderId),
    enabled: !!orderId,
  });
}

export function useInventoryOrderDetails(orderId) {
  return useQuery({
    queryKey: [...INVENTORY_QUERY_KEY, 'orderDetails', orderId],
    queryFn: () => inventoryApi.getOrderDetails(orderId),
    enabled: !!orderId,
  });
}

export default useInventory;
