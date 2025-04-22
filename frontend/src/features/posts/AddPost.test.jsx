import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AddPost from './AddPost';
import { BrowserRouter } from 'react-router-dom';

// Mock Redux dispatch
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

// Mock useTranslation to avoid i18next dependency
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // Return the key as the translation
  }),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock nanoid
jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'mocked-id',
}));

describe('AddPost Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        posts: (state = {}) => state,
      },
    });
  });

  test('renders AddPost form with title, body, and save button', () => {
    render(
      <Provider store={store}>
        <AddPost />
      </Provider>
    );

    // Check for form elements using placeholder and button text
    expect(screen.getByPlaceholderText('title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('body')).toBeInTheDocument();
    expect(screen.getByText('save')).toBeInTheDocument();
  });

  test('submits correct title and body', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AddPost />
        </BrowserRouter>
      </Provider>
    );

    const titleInput = getByPlaceholderText('title');
    const bodyTextarea = getByPlaceholderText('body');
    const submitButton = getByText('save');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(bodyTextarea, { target: { value: 'Test Body' } });
    expect(titleInput.value).toEqual('Test Title');
    expect(bodyTextarea.value).toEqual('Test Body');
    
    fireEvent.click(submitButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});