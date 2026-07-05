import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';
import { renderWithProviders } from '../../../../test/utils';
import { useAuthStore } from '@features/auth/store/authStore';

describe('Logout Action', () => {
  it('UT-015: triggers logout action successfully in Navbar', async () => {
    // Set authenticated state
    const spyLogout = vi.spyOn(useAuthStore.getState(), 'logout');
    useAuthStore.setState({
      isAuthenticated: true,
      user: { fullName: 'Gary Jenkins', email: 'gary@example.com', role: 'customer' },
    });

    renderWithProviders(<Navbar />);

    // Dropdown trigger is the button with avatar text (initials) "GJ"
    const trigger = screen.getByLabelText('Account menu');
    await userEvent.click(trigger);

    // Click logout
    const logoutBtn = screen.getByRole('menuitem', { name: 'Logout' });
    await userEvent.click(logoutBtn);

    expect(spyLogout).toHaveBeenCalled();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
  });
});
