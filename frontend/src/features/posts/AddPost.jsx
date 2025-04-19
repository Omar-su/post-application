import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPost } from './postslice';
import { useTranslation } from 'react-i18next';
import { nanoid } from '@reduxjs/toolkit';
import { fetchPosts} from './postslice';

const AddPost = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      // Create the post object with the correct values
      const postData = {
        id: nanoid(),  
        title: title,  // Only pass the title string
        body: body,    // Pass the body string
      };
  
      // Log to make sure the correct data is being dispatched
      console.log(postData);  
      // Dispatch the action to add the post
      dispatch(addPost(postData));  
      dispatch(fetchPosts());
  
      // Navigate to the home page
      navigate('/');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-xl font-bold mb-4">{t('add_post')}</h1>

      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder={t('title')}
        />
        <div>
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder={t('body')}
                rows="4"  
            />

        </div>

        
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          {t('save')}
        </button>
      </div>
    </form>
  );
};

export default AddPost;
