import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import PostList from './features/posts/PostList';
import EditPost from './features/posts/EditPost';
import AddPost from './features/posts/AddPost';
import NotFound from './features/errors/NotFound';
import { ThemeProvider } from './theme/ThemeProvider';
import Layout from './components/Layout';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/" element={<ProtectedRoute><PostList /></ProtectedRoute>} />
              <Route path="/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
              <Route path="/add" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
              
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
