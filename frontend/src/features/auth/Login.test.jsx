import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

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

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Login Component', () => {
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
  test('renders Login component correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText('login.title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('login.username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('login.password')).toBeInTheDocument();
    expect(screen.getByText('login.button')).toBeInTheDocument();
    expect(screen.getByText('login.no_account')).toBeInTheDocument();
    expect(screen.getByText('login.register_link')).toBeInTheDocument();
  });

  // 2. Test input handling
  test('updates username and password fields on input', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('login.username');
    const passwordInput = screen.getByPlaceholderText('login.password');

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'testpass');

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpass');
  });

  // 3. Test successful login
  test('handles successful login, stores user, and navigates to home', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ user: 'testuser' }),
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('login.username');
    const passwordInput = screen.getByPlaceholderText('login.password');
    const loginButton = screen.getByText('login.button');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'testpass' }),
      });
      expect(localStorage.setItem).toHaveBeenCalledWith('user', 'testuser');
      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(alertSpy).not.toHaveBeenCalled();
    });
  });

  // 4. Test failed login
  test('handles failed login and shows error alert', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve('Invalid credentials'),
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('login.username');
    const passwordInput = screen.getByPlaceholderText('login.password');
    const loginButton = screen.getByText('login.button');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'testpass' }),
      });
      expect(alertSpy).toHaveBeenCalledWith('Invalid credentials');
      expect(localStorage.setItem).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  // 5. Test network error
  test('handles network error and shows translated error alert', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('login.username');
    const passwordInput = screen.getByPlaceholderText('login.password');
    const loginButton = screen.getByText('login.button');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'testpass' }),
      });
      expect(alertSpy).toHaveBeenCalledWith('Invalid credentials');
      expect(localStorage.setItem).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  // 6. Test register link navigation
  test('navigates to register when register link is clicked', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const registerLink = screen.getByText('login.register_link');
    fireEvent.click(registerLink);

    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });
});