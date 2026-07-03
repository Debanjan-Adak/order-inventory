import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { lookupCustomerByEmail, fetchAllAdmins, createCustomer } from '../api/authApi';

function findByEmail(records, email, field) {
  const target = String(email).trim().toLowerCase();
  return records.find((record) => String(record[field]).toLowerCase() === target);
}

export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const results = await lookupCustomerByEmail(email);
      const customer = findByEmail(results, email, 'email_address');

      if (!customer || customer.password !== password) {
        throw new Error('Incorrect username or password.');
      }

      if (customer.isblocked === true) {
        throw new Error('This account has been banned. Contact support.');
      }

      useAuthStore.getState().login({
        id: customer.id,
        role: 'customer',
        email: customer.email_address,
        fullName: customer.full_name,
      });

      return customer;
    },
  });
}

export function useAdminLogin() {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const admins = await fetchAllAdmins();
      const admin = findByEmail(admins, email, 'email');

      if (!admin || admin.password !== password) {
        throw new Error('Incorrect username or password.');
      }

      useAuthStore.getState().login({
        id: admin.id,
        role: 'admin',
        email: admin.email,
        fullName: admin.name,
      });

      return admin;
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async ({ fullName, email, password }) => {
      const results = await lookupCustomerByEmail(email);
      const existing = findByEmail(results, email, 'email_address');

      if (existing) {
        throw new Error('A customer with this email already exists.');
      }

      const created = await createCustomer({
        full_name: fullName,
        email_address: email,
        password,
        isblocked: false,
      });

      useAuthStore.getState().login({
        id: created.id,
        role: 'customer',
        email: created.email_address,
        fullName: created.full_name,
      });

      return created;
    },
  });
}

export default { useLogin, useAdminLogin, useRegister };
