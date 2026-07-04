import { useQuery } from '@tanstack/react-query';
import { getShipments, getShipmentById } from '../api/shipmentApi';

export function useShipments() {
  return useQuery({
    queryKey: ['shipments'],
    queryFn: getShipments,
  });
}

export function useShipment(id) {
  return useQuery({
    queryKey: ['shipments', id],
    queryFn: () => getShipmentById(id),
    enabled: id !== undefined && id !== null,
  });
}

export default useShipments;
