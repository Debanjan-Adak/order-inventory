import React from 'react';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from 'vitest';
import { screen, render, fireEvent } from '@testing-library/react';
import ProductSearch from '../ProductSearch';
import { useFiltersStore } from '@stores/filtersStore';

describe('ProductSearch Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('UT-023: updates products search filter when user types', async () => {
    useFiltersStore.setState({
      products: {
        search: '',
      },
    });

    const spySetFilters = vi.spyOn(
      useFiltersStore.getState(),
      'setFilters'
    );

    render(<ProductSearch />);

    const input = screen.getByPlaceholderText('Search products…');

    fireEvent.change(input, {
      target: {
        value: 'shirt',
      },
    });

    await vi.advanceTimersByTimeAsync(300);

    expect(spySetFilters).toHaveBeenCalledWith('products', {
      search: 'shirt',
    });
  });
});