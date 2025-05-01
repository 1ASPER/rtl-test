import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import { vi } from 'vitest';
import { FeedbackForm } from '../components/FeedbackForm';

describe('FeedbackForm', () => {
  it('renders the title', () => {
    render(<FeedbackForm />);
    expect(screen.getByText('Обратная связь')).toBeInTheDocument();
  });

  it('input and textarea update on user typing', async () => {
    render(<FeedbackForm />);
    const nameInput = screen.getByLabelText('Имя:');
    const messageTextarea = screen.getByLabelText('Сообщение:');

    await userEvent.type(nameInput, 'Иван');
    expect(nameInput).toHaveValue('Иван');

    await userEvent.type(messageTextarea, 'Привет!');
    expect(messageTextarea).toHaveValue('Привет!');
  });

  it('shows confirmation after submitting valid data', async () => {
    vi.useFakeTimers();
    render(<FeedbackForm />);

    const nameInput = screen.getByLabelText('Имя:');
    const messageTextarea = screen.getByLabelText('Сообщение:');
    const submitButton = screen.getByRole('button', { name: /отправить/i });

    await userEvent.type(nameInput, 'Мария');
    await userEvent.type(messageTextarea, 'Добрый день');
    await userEvent.click(submitButton);

    act(() => {
      vi.runAllTimers();
    });

    expect(
      screen.getByText('Спасибо, Мария! Ваше сообщение отправлено.')
    ).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('does not show confirmation if name or message is empty', async () => {
    vi.useFakeTimers();
    render(<FeedbackForm />);

    const submitButton = screen.getByRole('button', { name: /отправить/i });
    await userEvent.click(submitButton);

    act(() => {
      vi.runAllTimers();
    });

    expect(screen.queryByText(/Спасибо,/i)).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it('submit button exists and is enabled', () => {
    render(<FeedbackForm />);
    const submitButton = screen.getByRole('button', { name: /отправить/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

  it('does not submit when fields contain only spaces (trim validation)', async () => {
    vi.useFakeTimers();
    render(<FeedbackForm />);

    const nameInput = screen.getByLabelText('Имя:');
    const messageTextarea = screen.getByLabelText('Сообщение:');
    const submitButton = screen.getByRole('button', { name: /отправить/i });

    await userEvent.type(nameInput, '   ');
    await userEvent.type(messageTextarea, '    ');
    await userEvent.click(submitButton);

    act(() => {
      vi.runAllTimers();
    });

    expect(screen.queryByText(/Спасибо,/i)).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});
