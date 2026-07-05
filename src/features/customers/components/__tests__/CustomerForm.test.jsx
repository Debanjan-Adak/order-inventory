import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import CustomerForm from '../CustomerForm';
import { renderWithProviders } from '../../../../test/utils';
import * as useCustomersHooks from '../../hooks/useCustomers';
import * as useCustomerMutationsHooks from '../../hooks/useCustomerMutations';

vi.mock('../../hooks/useCustomers', () => ({
  useCustomers: vi.fn(),
  useCustomerOrders: vi.fn(),
}));

vi.mock('../../hooks/useCustomerMutations', () => ({
  useCreateCustomer: vi.fn(),
  useUpdateCustomer: vi.fn(),
}));

describe('CustomerForm Component', () => {
  beforeEach(() => {
    let modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(modalRoot);
    }
  });

  it('UT-025: validates required fields on submit', async () => {
    useCustomersHooks.useCustomers.mockReturnValue({ data: [] });
    useCustomerMutationsHooks.useCreateCustomer.mockReturnValue({ mutateAsync: vi.fn(), isPending: false });
    useCustomerMutationsHooks.useUpdateCustomer.mockReturnValue({ mutateAsync: vi.fn(), isPending: false });

    renderWithProviders(<CustomerForm isOpen={true} onClose={() => {}} />);

    const form = document.getElementById('customer-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getAllByText('This field is required.').length).toBeGreaterThan(0);
    });
  });

  it('UT-026: submits valid customer information', async () => {
    const mutateAsync = vi.fn().mockResolvedValue({ id: 1 });
    useCustomersHooks.useCustomers.mockReturnValue({ data: [] });
    useCustomerMutationsHooks.useCreateCustomer.mockReturnValue({ mutateAsync, isPending: false });

    renderWithProviders(<CustomerForm isOpen={true} onClose={() => {}} />);

    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    const form = document.getElementById('customer-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith({
        full_name: 'John Doe',
        email_address: 'john@example.com',
        isblocked: false,
      });
    });
  });
});
