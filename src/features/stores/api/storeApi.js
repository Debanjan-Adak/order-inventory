import api from "@shared/api/axios";
import { endpoints } from "@shared/api/endpoints";

export const storeApi = {
  getAll: () => api.get(endpoints.stores.all()).then((res) => res.data),

  getById: (id) => api.get(endpoints.stores.byId(id)).then((res) => res.data),
};

export default storeApi;
