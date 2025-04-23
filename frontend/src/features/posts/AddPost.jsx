import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPost, fetchPosts } from './postslice';
import { nanoid } from '@reduxjs/toolkit';
import PostForm from './PostForm';
import { useTranslation } from 'react-i18next';

const AddPost = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      dispatch(addPost({ id: nanoid(), title, body }));
      dispatch(fetchPosts());
      navigate('/');
    }
  };

  return (
    <PostForm
      title={title}
      setTitle={setTitle}
      body={body}
      setBody={setBody}
      onSubmit={handleSubmit}
      heading={t('add_post')}
    />
  );
};

export default AddPost;
