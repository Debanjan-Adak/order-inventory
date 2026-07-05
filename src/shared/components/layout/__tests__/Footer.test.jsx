import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  it('renders Footer text correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/Order Inventory Management/i)).toBeInTheDocument();
  });
});
