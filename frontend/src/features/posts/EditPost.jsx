import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updatePost } from './postslice';
import { useTranslation } from 'react-i18next';

const EditPost = () => {
  const { t } = useTranslation();
  const { id } = useParams(); // Get post ID from URL params
  const post = useSelector((state) => 
    state.posts.posts.find((post) => post.id === id) // Find the post to edit
  );
  const [title, setTitle] = useState(post?.title || ''); // Set initial state for title
  const [body, setBody] = useState(post?.body || ''); // Set initial state for body
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      dispatch(updatePost({ id, title, body })); // Dispatch update action
      navigate('/'); // Navigate to home page after save
    }
  };

  if (!post) { // Handle case where post is not found
    console.log('Post not found for ID:', id);
    return <p>{t('post_not_found')}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">{t('edit_post')}</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update title state
        className="border p-2 rounded w-full"
        placeholder={t('title')}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)} // Update body state
        className="border p-2 rounded w-full"
        placeholder={t('body')}
        rows="5"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
        disabled={!title.trim() || !body.trim()} // Disable button if title or body is empty
      >
        {t('save')}
      </button>
    </form>
  );
};

export default EditPost;
