import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import EditPost from './EditPost';
import { BrowserRouter } from 'react-router-dom';
import { updatePost } from './postslice';

// Mock Redux store and other hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

// Mock useNavigate for redirection
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock useTranslation to avoid i18next dependency
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // Return the key as the translation
  }),
}));

// Set up mock store and initial state for testing
const store = configureStore({
  reducer: {
    posts: (state = { posts: [{ id: '1', title: 'Old Title', body: 'Old Body' }] }) => state,
  },
});

describe('EditPost Component', () => {
  test('renders EditPost form with post data', () => {
    // Mock post data
    const post = { id: '1', title: 'Test Title', body: 'Test Body' };

    // Mock the useSelector hook to return the post data
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue(post);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditPost />
        </BrowserRouter>
      </Provider>
    );

    // Check that the input and textarea show the post's title and body
    expect(screen.getByPlaceholderText('title').value).toBe(post.title);
    expect(screen.getByPlaceholderText('body').value).toBe(post.body);
  });

  test('displays "post not found" when no post is found for the given id', () => {
    // Mock post not found
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue(undefined);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditPost />
        </BrowserRouter>
      </Provider>
    );

    // Ensure the "Post not found" message is displayed
    expect(screen.getByText('post_not_found')).toBeInTheDocument();
  });

  test('submits updated post data', () => {
    const post = { title: 'Old Title', body: 'Old Body' };

    // Mock Redux store and useSelector
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue(post);
    const mockDispatch = jest.fn();
    jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditPost />
        </BrowserRouter>
      </Provider>
    );

    // Change the title and body
    fireEvent.change(screen.getByPlaceholderText('title'), { target: { value: 'New Title' } });
    fireEvent.change(screen.getByPlaceholderText('body'), { target: { value: 'New Body' } });

    // Submit the form
    fireEvent.click(screen.getByText('save'));

    // Check that the dispatch function is called with the correct data
    expect(mockDispatch).toHaveBeenCalledWith(updatePost({ title: 'New Title', body: 'New Body' }));
  });

  test('disables save button when title or body is empty', () => {
    const post = { id: '1', title: '', body: '' };

    // Mock Redux store and useSelector
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue(post);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditPost />
        </BrowserRouter>
      </Provider>
    );

    // Ensure the save button is disabled when both fields are empty
    expect(screen.getByText('save')).toBeDisabled();

    // Fill in the title and body
    fireEvent.change(screen.getByPlaceholderText('title'), { target: { value: 'New Title' } });
    fireEvent.change(screen.getByPlaceholderText('body'), { target: { value: 'New Body' } });

    // Ensure the save button is enabled when both fields are non-empty
    expect(screen.getByText('save')).toBeEnabled();
  });

  test('redirects to home page after post update', () => {
    const post = { id: '1', title: 'Old Title', body: 'Old Body' };

    // Mock Redux store and useSelector
    jest.spyOn(require('react-redux'), 'useSelector').mockReturnValue(post);
    jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(jest.fn());

    // Mock navigate function
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditPost />
        </BrowserRouter>
      </Provider>
    );

    // Change title and body
    fireEvent.change(screen.getByPlaceholderText('title'), { target: { value: 'Updated Title' } });
    fireEvent.change(screen.getByPlaceholderText('body'), { target: { value: 'Updated Body' } });

    // Submit the form
    fireEvent.click(screen.getByText('save'));

    // Ensure the navigate function is called to redirect to the home page
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
