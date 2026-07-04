import api from '@shared/api/axios';
import endpoints from '@shared/api/endpoints';
export function getShipments() {
  return api.get(endpoints.shipments.all()).then((response) => response.data);
}

export function getShipmentById(id) {
  return api.get(endpoints.shipments.byId(id)).then((response) => response.data);
}

export default { getShipments, getShipmentById };
