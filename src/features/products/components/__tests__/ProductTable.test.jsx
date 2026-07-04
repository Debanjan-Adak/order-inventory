import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductTable from '../ProductTable';

const products = [
  {
    id: 1,
    product_name: 'iPhone 13',
    brand: 'Apple',
    colour: 'Black',
    size: '128GB',
    unit_price: 799,
    rating: 4.8,
  },
];

describe('ProductTable Component', () => {
  it('UT-020: renders products and responds to actions', async () => {
    const handleEdit = vi.fn();
    const handleDelete = vi.fn();

    render(
      <ProductTable
        rows={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );

    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();

    const editBtn = screen.getByLabelText('Edit iPhone 13');
    const deleteBtn = screen.getByLabelText('Delete iPhone 13');

    await userEvent.click(editBtn);
    expect(handleEdit).toHaveBeenCalledWith(products[0]);

    await userEvent.click(deleteBtn);
    expect(handleDelete).toHaveBeenCalledWith(products[0]);
  });
});