import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { deletePost, fetchPosts } from './postslice';
import DeleteModal from '../../components/DeleteModal';

// Styled components remain unchanged
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;
const Th = styled.th`
  border-bottom: 2px solid ${({ theme }) => theme.border};
  padding: 0.75rem;
  text-align: left;
`;
const Td = styled.td`
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0.75rem;
`;
const SearchInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
`;
const DeleteButton = styled.button`
  background-color: ${({ theme }) => theme.danger};
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
`;

const PostList = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleDelete = () => {
    dispatch(deletePost(postToDelete));
    setModalOpen(false);
  };

  useEffect(() => {
    // Only fetch posts if the posts array is empty
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>{t('posts')}</h1>
      <SearchInput
        type="text"
        placeholder={t('search_posts')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table>
        <thead>
          <tr>
            <Th>{t('title')}</Th>
            <Th>{t('body')}</Th>
            <Th>{t('actions')}</Th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr
              key={post.id}
              onClick={() => navigate(`/edit/${post.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <Td>{post.title}</Td>
              <Td>{post.body}</Td>
              <Td onClick={(e) => e.stopPropagation()}>
                <DeleteButton
                  onClick={() => {
                    setPostToDelete(post.id);
                    setModalOpen(true);
                  }}
                >
                  {t('delete')}
                </DeleteButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      {modalOpen && (
        <DeleteModal onDelete={handleDelete} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default PostList;