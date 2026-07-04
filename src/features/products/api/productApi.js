import api from '@shared/api/axios';
import { endpoints } from '@shared/api/endpoints';

export const productApi = {
  getAll: () =>
    api.get(endpoints.products.all()).then((res) => res.data),

  search: (name) =>
    productApi.getAll().then((products) =>
      products.filter((p) =>
        String(p.product_name)
          .toLowerCase()
          .includes(String(name).toLowerCase())
      )
    ),

  byBrand: (brand) =>
    api.get(endpoints.products.byBrand(brand)).then((res) => res.data),

  byColour: (colour) =>
    api.get(endpoints.products.byColour(colour)).then((res) => res.data),

  byPriceRange: (min, max) =>
    api.get(endpoints.products.priceRange(min, max)).then((res) => res.data),

  sorted: (field) =>
    api.get(endpoints.products.sort(field)).then((res) => res.data),

  create: (data) =>
    api.post(endpoints.products.create(), data).then((res) => res.data),

  update: ({ id, ...fields }) =>
    api.patch(endpoints.products.update(id), fields).then((res) => res.data),

  remove: (id) =>
    api.delete(endpoints.products.remove(id)).then((res) => res.data),
};

export default productApi;