import api from '@shared/api/axios';
import endpoints from '@shared/api/endpoints';
import { customerApi } from '@features/customers/api/customerApi';

export async function lookupCustomerByEmail(email) {
  return customerApi.lookup(email);
}

export async function fetchAllAdmins() {
  const { data } = await api.get(endpoints.admin.all());
  return Array.isArray(data) ? data : [];
}

export async function createCustomer(payload) {
  return customerApi.create(payload);
}
export default {
  lookupCustomerByEmail,
  fetchAllAdmins,
  createCustomer,
};
