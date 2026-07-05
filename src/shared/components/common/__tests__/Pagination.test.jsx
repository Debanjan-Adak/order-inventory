import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../Pagination';

describe('Pagination Component', () => {
  it('renders pages correctly and triggers page change on click', async () => {
    const handlePageChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={handlePageChange} />);

    // Current page button should be marked active
    const page2Button = screen.getByRole('button', { name: 'Page 2' });
    expect(page2Button).toHaveClass('pagination__button--active');

    // Click on page 3 button
    const page3Button = screen.getByRole('button', { name: 'Page 3' });
    await userEvent.click(page3Button);
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  it('disables previous and next buttons at boundaries', () => {
    render(<Pagination page={1} totalPages={1} onPageChange={() => {}} />);
    const prevButton = screen.getByRole('button', { name: 'Previous page' });
    const nextButton = screen.getByRole('button', { name: 'Next page' });
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
