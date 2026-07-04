import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckoutSummary from '../CheckoutSummary';
import { renderWithProviders } from '../../../../test/utils';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '@features/auth/store/authStore';
import * as mutations from '@features/orders/hooks/useOrderMutations';

vi.mock('@features/orders/hooks/useOrderMutations', () => ({
  useCreateOrder: vi.fn(),
  useUpdateOrder: vi.fn(),
  useCancelOrder: vi.fn(),
}));

describe('CheckoutSummary Component', () => {
  it('UT-030: renders order review and places order', async () => {
    const mutateAsync = vi.fn().mockResolvedValue({ id: 10 });
    mutations.useCreateOrder.mockReturnValue({ mutateAsync, isPending: false });

    useAuthStore.setState({ user: { id: 42 } });
    useCartStore.setState({
      items: [
        { productId: 101, productName: 'Hat', unitPrice: 15, quantity: 1, colour: 'Red' },
      ],
    });

    renderWithProviders(<CheckoutSummary />);

    expect(screen.getByText('Review Your Order')).toBeInTheDocument();
    expect(screen.getByText('Hat')).toBeInTheDocument();

    const placeBtn = screen.getByRole('button', { name: 'Place Order' });
    await userEvent.click(placeBtn);

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith({
        customerId: 42,
        storeId: 1,
        items: [{ productId: 101, unitPrice: 15, quantity: 1 }],
      });
    });
  });
});
