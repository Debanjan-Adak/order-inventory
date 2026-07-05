import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  screen,
  render,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import ProductForm from '../ProductForm';

describe('ProductForm Component', () => {
  beforeEach(() => {
    let modalRoot = document.getElementById('modal-root');

    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(modalRoot);
    }
  });

  it('UT-021: validates required fields on submit', async () => {
    render(
      <ProductForm
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
      />
    );

    const form = document.getElementById('product-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(
        screen.getAllByText('This field is required.').length
      ).toBeGreaterThan(0);
    });
  });

  it('UT-022: submits valid product information', async () => {
    const handleSubmit = vi.fn();

    render(
      <ProductForm
        isOpen={true}
        onClose={() => {}}
        onSubmit={handleSubmit}
      />
    );

    const nameInput = screen.getByLabelText('Product Name');
    const priceInput = screen.getByLabelText('Unit Price');
    const colourInput = screen.getByLabelText('Colour');
    const sizeInput = screen.getByLabelText('Size');
    const brandInput = screen.getByLabelText('Brand');

    fireEvent.change(nameInput, {
      target: { value: 'New Laptop' },
    });

    fireEvent.change(priceInput, {
      target: { value: '1200' },
    });

    fireEvent.change(colourInput, {
      target: { value: 'Silver' },
    });

    fireEvent.change(sizeInput, {
      target: { value: '15-inch' },
    });

    fireEvent.change(brandInput, {
      target: { value: 'BrandX' },
    });

    const form = document.getElementById('product-form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        product_name: 'New Laptop',
        unit_price: 1200,
        colour: 'Silver',
        brand: 'BrandX',
        size: '15-inch',
      });
    });
  });
});