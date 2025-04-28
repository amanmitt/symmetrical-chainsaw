// src/components/LoginForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

test('shows error for invalid email and prevents submission', () => {
  const handleLogin = jest.fn();
  render(<LoginForm onLogin={handleLogin} />);

  const input = screen.getByLabelText(/email/i);
  const button = screen.getByRole('button', { name: /login/i });

  fireEvent.change(input, { target: { value: 'invalidemail' } });
  fireEvent.click(button);

  expect(screen.getByRole('alert')).toHaveTextContent(/please enter a valid email/i);
  expect(handleLogin).not.toHaveBeenCalled();
});

test('calls onLogin with valid email', () => {
  const handleLogin = jest.fn();
  render(<LoginForm onLogin={handleLogin} />);

  const input = screen.getByLabelText(/email/i);
  const button = screen.getByRole('button', { name: /login/i });

  fireEvent.change(input, { target: { value: 'test@example.com' } });
  fireEvent.click(button);

  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(handleLogin).toHaveBeenCalledWith('test@example.com');
});
