import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { renderWithProviders } from '../../../../test/utils';
import { useAuthStore } from '@features/auth/store/authStore';

describe('ProtectedRoute Component', () => {
  it('redirects unauthenticated users to login', () => {
    useAuthStore.setState({ isAuthenticated: false, user: null });
    
    renderWithProviders(
      <Routes>
        <Route element={<ProtectedRoute roles={['customer']} />}>
          <Route path="/protected" element={<div>Protected Content</div>} />
        </Route>
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>,
      { route: '/protected' }
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders protected content when user is authenticated', () => {
    useAuthStore.setState({ isAuthenticated: true, user: { role: 'customer' } });

    renderWithProviders(
      <Routes>
        <Route element={<ProtectedRoute roles={['customer']} />}>
          <Route path="/protected" element={<div>Protected Content</div>} />
        </Route>
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>,
      { route: '/protected' }
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
