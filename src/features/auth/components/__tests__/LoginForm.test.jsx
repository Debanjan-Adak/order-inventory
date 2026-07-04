import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../LoginForm';
import { renderWithProviders } from '../../../../test/utils';
import * as useAuthHooks from '../../hooks/useAuth';

vi.mock('../../hooks/useAuth', () => ({
  useLogin: vi.fn(),
  useAdminLogin: vi.fn(),
  useRegister: vi.fn(),
}));

describe('LoginForm Component', () => {
  it('UT-011: validates required fields on submit', async () => {
    const mutateAsync = vi.fn().mockRejectedValue(new Error('Incorrect username or password.'));
    useAuthHooks.useLogin.mockReturnValue({
      mutateAsync,
      isPending: false,
    });

    renderWithProviders(<LoginForm />);

    // Click submit without entering values
    const submitBtn = screen.getByRole('button', { name: 'Sign in' });
    await userEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getAllByText('This field is required.').length).toBeGreaterThan(0);
    });
  });

  it('UT-012: submits credentials successfully', async () => {
    const mutateAsync = vi.fn().mockResolvedValue({ id: 1 });
    useAuthHooks.useLogin.mockReturnValue({
      mutateAsync,
      isPending: false,
    });

    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitBtn = screen.getByRole('button', { name: 'Sign in' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
