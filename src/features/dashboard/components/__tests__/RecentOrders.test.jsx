import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import RecentOrders from '../RecentOrders';
import { renderWithProviders } from '../../../../test/utils';
import * as ordersHooks from '@features/orders/hooks/useOrders';

vi.mock('@features/orders/hooks/useOrders', () => ({
  useOrders: vi.fn(),
  useOrderStatusCounts: vi.fn(),
}));

describe('RecentOrders Component', () => {
  it('renders recent orders list successfully', () => {
    ordersHooks.useOrders.mockReturnValue({
      data: [
        { id: 1, order_id: 101, order_tms: '2023-01-01 10:00:00', order_status: 'COMPLETE' },
      ],
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<RecentOrders />);

    expect(screen.getByText('Recent Orders')).toBeInTheDocument();
    expect(screen.getByText('#101')).toBeInTheDocument();
  });
});
