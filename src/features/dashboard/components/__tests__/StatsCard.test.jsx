import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import StatsCard from '../StatsCard';
import { ShoppingCart } from 'lucide-react';

describe('StatsCard Component', () => {
  it('renders StatsCard elements correctly', () => {
    render(<StatsCard icon={ShoppingCart} label="Total Sales" value={42} trend="+12%" />);
    expect(screen.getByText('Total Sales')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('+12%')).toBeInTheDocument();
  });
});
