import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { renderWithProviders } from '../../../../test/utils';

const product = {
  id: 1,
  product_name: 'Wireless Headphones',
  unit_price: 99,
  colour: 'Black',
  rating: 4.5,
};

describe('ProductCard Component', () => {
  it('UT-019: renders product details correctly', () => {
    renderWithProviders(<ProductCard product={product} />);
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByLabelText('Black colour swatch')).toBeInTheDocument();
  });
});
