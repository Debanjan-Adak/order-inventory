import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartItem from '../CartItem';
import { useCartStore } from '../../store/cartStore';

const item = {
  productId: 101,
  productName: 'Cool Shirt',
  unitPrice: 25,
  colour: 'Blue',
  quantity: 2,
};

describe('CartItem Component', () => {
  it('UT-028: renders cart item info and triggers stepper actions', async () => {
    const spyUpdate = vi.spyOn(useCartStore.getState(), 'updateQuantity');
    render(<CartItem item={item} />);

    expect(screen.getByText('Cool Shirt')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Quantity

    const incBtn = screen.getByLabelText('Increase quantity');
    await userEvent.click(incBtn);

    expect(spyUpdate).toHaveBeenCalledWith(101, 3);
  });
});
