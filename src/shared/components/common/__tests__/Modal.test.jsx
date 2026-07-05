import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../Modal';

describe('Modal Component', () => {
  beforeEach(() => {
    // Set up modal root portal target
    let modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      document.body.appendChild(modalRoot);
    }
  });

  it('renders open modal content and triggers close on click', async () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <div>Modal Content Body</div>
      </Modal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content Body')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Close dialog' });
    await userEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
