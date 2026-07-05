import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Navbar from '../Navbar';
import { renderWithProviders } from '../../../../test/utils';

describe('Navbar Component', () => {
  it('renders Navbar correctly with logo text', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('SmartBuy')).toBeInTheDocument();
  });
});
