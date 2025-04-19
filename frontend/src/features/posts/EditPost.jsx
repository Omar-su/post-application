import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updatePost } from './postslice';
import { useTranslation } from 'react-i18next';

const EditPost = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === id)
  );
  const [title, setTitle] = useState(post?.title || '');
  const [body, setBody] = useState(post?.body || '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      dispatch(updatePost({ id, title, body }));
      navigate('/');
    }
  };

  if (!post) {
    console.log('Post not found for ID:', id);
    return <p>{t('post_not_found')}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">{t('edit_post')}</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder={t('title')}
      />
      <div></div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder={t('body')}
        rows="5"
      />
      <div></div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
        disabled={!title.trim() || !body.trim()}
      >
        {t('save')}
      </button>
    </form>
  );
};

export default EditPost;