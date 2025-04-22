import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // Return the translation key as the text
  }),
}));

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock fetch
global.fetch = jest.fn();

describe('Register Component', () => {
  let alertSpy;

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();

    // Mock window.alert
    alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Reset fetch mock
    fetch.mockReset();
  });

  afterEach(() => {
    // Restore alert spy
    alertSpy.mockRestore();
  });

  // 1. Test rendering
  test('renders Register component correctly', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByText('register.title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('register.username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('register.password')).toBeInTheDocument();
    expect(screen.getByText('register.button')).toBeInTheDocument();
    expect(screen.getByText('register.have_account')).toBeInTheDocument();
    expect(screen.getByText('register.login_link')).toBeInTheDocument();
  });

  // 2. Test input handling
  test('updates username and password fields on input', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('register.username');
    const passwordInput = screen.getByPlaceholderText('register.password');

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'testpass');

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpass');
  });

  // 3. Test successful registration
  test('handles successful registration and navigates to login', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('register.username');
    const passwordInput = screen.getByPlaceholderText('register.password');
    const registerButton = screen.getByText('register.button');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'testpass' }),
      });
      expect(alertSpy).toHaveBeenCalledWith('register.success');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  // 4. Test failed registration
  test('handles failed registration and shows error alert', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve('Registration failed'),
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('register.username');
    const passwordInput = screen.getByPlaceholderText('register.password');
    const registerButton = screen.getByText('register.button');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'testpass' }),
      });
      expect(alertSpy).toHaveBeenCalledWith('register.failed');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  // 5. Test error handling for network failure
  test('handles network error and shows error alert', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('register.username');
    const passwordInput = screen.getByPlaceholderText('register.password');
    const registerButton = screen.getByText('register.button');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'testpass' }),
      });
      expect(alertSpy).toHaveBeenCalledWith('register.failed');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  // 6. Test login link navigation
  test('navigates to login when login link is clicked', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const loginLink = screen.getByText('register.login_link');
    fireEvent.click(loginLink);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});