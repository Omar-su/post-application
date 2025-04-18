import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPost  } from './postslice';
import { useTranslation } from 'react-i18next';
import { nanoid } from '@reduxjs/toolkit';

const AddPost = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
        dispatch(addPost({
            id: Date.now(),
            title: title,       
          }));
        navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">{t('add_post')}</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder={t('title')}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {t('save')}
      </button>
    </form>
  );
};

export default AddPost;