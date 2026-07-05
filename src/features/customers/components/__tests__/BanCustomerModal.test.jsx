import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BanCustomerModal from '../BanCustomerModal';
import { renderWithProviders } from '../../../../test/utils';
import * as mutations from '../../hooks/useCustomerMutations';

vi.mock('../../hooks/useCustomerMutations', () => ({
  useUpdateCustomer: vi.fn(),
  useDeleteCustomer: vi.fn(),
}));

const customer = { id: 12, full_name: 'John Banned' };

describe('BanCustomerModal Component', () => {
  beforeEach(() => {
    let modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(modalRoot);
    }
  });

  it('UT-027: opens and confirms the ban action', async () => {
    const mutateAsync = vi.fn().mockResolvedValue({});
    mutations.useUpdateCustomer.mockReturnValue({ mutateAsync, isPending: false });

    const handleClose = vi.fn();

    renderWithProviders(
      <BanCustomerModal isOpen={true} onClose={handleClose} customer={customer} />
    );

    expect(screen.getByText('Ban this customer?')).toBeInTheDocument();
    expect(screen.getByText('This will prevent John Banned from placing new orders.')).toBeInTheDocument();

    const banBtn = screen.getByRole('button', { name: 'Ban' });
    await userEvent.click(banBtn);

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith({ id: 12, isblocked: true });
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
