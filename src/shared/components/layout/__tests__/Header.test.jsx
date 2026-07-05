import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Header from '../Header';
import { renderWithProviders } from '../../../../test/utils';

describe('Header Component', () => {
  it('renders Header with the provided title', () => {
    renderWithProviders(<Header title="Dashboard Overview" />);
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
  });
});
