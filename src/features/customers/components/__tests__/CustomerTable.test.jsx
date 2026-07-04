import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import CustomerTable from '../CustomerTable';
import { renderWithProviders } from '../../../../test/utils';

vi.mock('../hooks/useCustomerMutations', () => ({
  useDeleteCustomer: vi.fn(() => ({
    mutateAsync: vi.fn(),
    isPending: false,
  })),
}));

vi.mock('../hooks/useCustomerMutations', () => ({
  useDeleteCustomer: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}));

const customers = [
  { id: 1, full_name: 'John Doe', email_address: 'john@example.com', isblocked: false },
];

describe('CustomerTable Component', () => {
  it('UT-024: renders customers table successfully', () => {
    renderWithProviders(<CustomerTable rows={customers} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});
