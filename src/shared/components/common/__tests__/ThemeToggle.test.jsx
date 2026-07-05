import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../ThemeToggle';
import { useThemeStore } from '@stores/themeStore';

describe('ThemeToggle Component', () => {
  it('toggles the theme between light and dark when clicked', async () => {
    useThemeStore.setState({ theme: 'light' });
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: 'Switch to dark theme' });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    // After clicking, theme should change to dark
    expect(useThemeStore.getState().theme).toBe('dark');
  });
});
