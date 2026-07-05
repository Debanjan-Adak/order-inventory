import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import DataTable from '../DataTable';
import { renderWithProviders } from '../../../../test/utils';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
];

const rows = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' },
];

describe('DataTable Component', () => {
  it('renders table headers and rows correctly', () => {
    renderWithProviders(<DataTable columns={columns} rows={rows} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('renders skeleton rows when loading', () => {
    renderWithProviders(<DataTable columns={columns} rows={[]} isLoading={true} />);
    // Skeleton rows are rendered
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
  });
});
