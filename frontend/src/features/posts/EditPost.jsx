import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updatePost } from './postslice';
import PostForm from './PostForm';
import { useTranslation } from 'react-i18next';

const EditPost = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const post = useSelector((state) => state.posts.posts.find((post) => post.id === id));
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
    <PostForm
      title={title}
      setTitle={setTitle}
      body={body}
      setBody={setBody}
      onSubmit={handleSubmit}
      heading={t('edit_post')}
    />
  );
};

export default EditPost;
