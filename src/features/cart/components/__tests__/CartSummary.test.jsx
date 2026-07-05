import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import CartSummary from '../CartSummary';
import { renderWithProviders } from '../../../../test/utils';
import { useCartStore } from '../../store/cartStore';

describe('CartSummary Component', () => {
  it('UT-029: displays correct subtotal and item count', () => {
    useCartStore.setState({
      items: [
        { productId: 1, productName: 'A', unitPrice: 10, quantity: 2 },
        { productId: 2, productName: 'B', unitPrice: 30, quantity: 1 },
      ],
    });

    renderWithProviders(<CartSummary />);

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('Items (3)')).toBeInTheDocument(); // 2+1 = 3 items
  });
});
