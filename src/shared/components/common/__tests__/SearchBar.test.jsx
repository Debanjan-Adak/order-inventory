import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, render, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('accepts input and calls onChange with debounced value', async () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} placeholder="Search products..." />);
    
    const input = screen.getByPlaceholderText('Search products...');
    expect(input).toBeInTheDocument();
    
    // Type in the input
    fireEvent.change(input, { target: { value: 'phone' } });
    
    // Before 300ms, it shouldn't call onChange
    expect(handleChange).not.toHaveBeenCalled();
    
    // Advance timers by 300ms
    await vi.advanceTimersByTimeAsync(300);
    
    expect(handleChange).toHaveBeenCalledWith('phone');
  });
});
