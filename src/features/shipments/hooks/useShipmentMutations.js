import { useMutation } from '@tanstack/react-query';


export function useUpdateShipmentStatus() {
  return useMutation({
    mutationFn: () =>
      Promise.reject(
        new Error('Updating shipment status is not yet supported by the backend.')
      ),
  });
}

export default useUpdateShipmentStatus;
