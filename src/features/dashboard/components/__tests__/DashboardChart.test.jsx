import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import DashboardChart from '../DashboardChart';
import { renderWithProviders } from '../../../../test/utils';
import * as ordersHooks from '@features/orders/hooks/useOrders';
import * as customersHooks from '@features/customers/hooks/useCustomers';

vi.mock('@features/orders/hooks/useOrders', () => ({
  useOrders: vi.fn(),
  useOrderStatusCounts: vi.fn(),
}));

vi.mock('@features/customers/hooks/useCustomers', () => ({
  useCustomers: vi.fn(),
  useShipmentStatusCounts: vi.fn(),
  useCustomerOrders: vi.fn(),
}));

vi.mock('recharts', async () => {
  const original = await vi.importActual('recharts');
  return {
    ...original,
    ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
  };
});

describe('DashboardChart Component', () => {
  it('renders order and shipment status mix charts successfully', () => {
    ordersHooks.useOrderStatusCounts.mockReturnValue({
      data: [{ status: 'COMPLETE', count: 5 }],
      isLoading: false,
      isError: false,
    });

    customersHooks.useShipmentStatusCounts.mockReturnValue({
      data: [{ status: 'SHIPPED', count: 2 }],
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<DashboardChart />);

    expect(screen.getByText('Order Status Mix')).toBeInTheDocument();
    expect(screen.getByText('Shipment Status Mix')).toBeInTheDocument();
  });
});
