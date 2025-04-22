import { render, screen, fireEvent, within } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer, { fetchPosts, deletePost } from './postslice';
import { useDispatch, useSelector } from 'react-redux';
import PostList from './PostList';

// Mock react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock useTranslation to avoid i18next dependency
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
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

describe('PostList Component', () => {
  let mockDispatch;

  const store = configureStore({
    reducer: {
      posts: postsReducer,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  // 1. Render Posts from Redux Store
  test('renders posts correctly from Redux store', () => {
    const posts = [
      { id: '1', title: 'First Post', body: 'This is the first post.' },
      { id: '2', title: 'Second Post', body: 'This is the second post.' },
    ];

    useSelector.mockReturnValue(posts);

    render(
      <Provider store={store}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <PostList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('This is the first post.')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getByText('This is the second post.')).toBeInTheDocument();
  });

  // 2. Search Functionality
  test('filters posts by search input', () => {
    const posts = [
      { id: '1', title: 'First Post', body: 'This is the first post.' },
      { id: '2', title: 'Second Post', body: 'This is the second post.' },
    ];

    useSelector.mockReturnValue(posts);

    render(
      <Provider store={store}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <PostList />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('search_posts'), {
      target: { value: 'First' },
    });

    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.queryByText('Second Post')).toBeNull();
  });

  // 3. Show Modal on Delete Click
  test('opens delete modal when delete button is clicked', () => {
    const posts = [
      { id: '1', title: 'First Post', body: 'This is the first post.' },
    ];

    useSelector.mockReturnValue(posts);

    render(
      <Provider store={store}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <PostList />
        </BrowserRouter>
      </Provider>
    );

    // Click the delete button in the table
    fireEvent.click(screen.getByText('delete'));

    // Verify the modal appears
    expect(screen.getByTestId('deletemodal')).toBeInTheDocument();
    expect(screen.getByText('delete_post_confirmation')).toBeInTheDocument();
  });

  // 4. Post Deletion
  test('deletes post when delete is confirmed', () => {
    const posts = [
      { id: '1', title: 'First Post', body: 'This is the first post.' },
    ];

    useSelector.mockReturnValue(posts);

    render(
      <Provider store={store}>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <PostList />
        </BrowserRouter>
      </Provider>
    );

    // Click the delete button in the table
    fireEvent.click(screen.getByText('delete'));

    // Click the delete button in the modal
    const modal = screen.getByTestId('deletemodal');
    fireEvent.click(within(modal).getByText('delete'));

    // Check that dispatch was called with the correct action
    expect(mockDispatch).toHaveBeenCalledWith(deletePost('1'));
  });


});