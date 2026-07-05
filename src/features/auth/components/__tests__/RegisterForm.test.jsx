import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from '../RegisterForm';
import { renderWithProviders } from '../../../../test/utils';
import * as useAuthHooks from '../../hooks/useAuth';


vi.mock('../../hooks/useAuth', () => ({
  useRegister: vi.fn(),
  useLogin: vi.fn(),
  useAdminLogin: vi.fn(),
}));

describe('RegisterForm Component', () => {
  it('UT-013: validates required fields on submit', async () => {
    const mutateAsync = vi.fn().mockRejectedValue(new Error('A customer with this email already exists.'));
    useAuthHooks.useRegister.mockReturnValue({
      mutateAsync,
      isPending: false,
    });

    renderWithProviders(<RegisterForm />);

    const submitBtn = screen.getByRole('button', { name: 'Create account' });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getAllByText('This field is required.').length).toBeGreaterThan(0);
    });
  });

  it('UT-014: submits valid user information successfully', async () => {
    const mutateAsync = vi.fn().mockResolvedValue({ id: 1 });
    useAuthHooks.useRegister.mockReturnValue({
      mutateAsync,
      isPending: false,
    });

    renderWithProviders(<RegisterForm />);

    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitBtn = screen.getByRole('button', { name: 'Create account' });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith({
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
    });
  });
});
