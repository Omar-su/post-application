// src/pages/PostList.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { deletePost, fetchPosts } from './postslice';
import DeleteModal from '../../components/DeleteModal';
import PostTable from '../../components/Table';
import SearchBar from '../../components/SearchBar';
import ProfileIcon from '../../components/ProfileIcon'; // Import the ProfileIcon
import MyCharacter from "../../icons/MyCharacter.png";

const PostList = () => {
  const posts = useSelector((state) => state.posts.posts); // Get posts from the state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [search, setSearch] = useState(''); // State for search input
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [postToDelete, setPostToDelete] = useState(null); // Post to delete

  // Handle delete action
  const handleDelete = () => {
    dispatch(deletePost(postToDelete));
    setModalOpen(false); // Close modal after deletion
  };

  // Fetch posts if not available
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts.length]);

  // Filter posts based on search input
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase())
  );

  // Set the profile image source
  const profileImageSrc = MyCharacter;

  return (
    <div>
      <h1 style={{ display: 'flex', alignItems: 'center' }}>
        {t('posts')}
        <ProfileIcon imageSrc={profileImageSrc} />
      </h1>
      <SearchBar
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)} // Update search state
        placeholder={t('search_posts')}
      />
      <PostTable
        posts={filteredPosts} // Pass filtered posts to table
        onDelete={(postId) => {
          setPostToDelete(postId); // Set post to delete
          setModalOpen(true); // Open delete modal
        }}
        onRowClick={(id) => navigate(`/edit/${id}`)} // Navigate to edit page on row click
        t={t}
      />
      {modalOpen && (
        <DeleteModal onDelete={handleDelete} onClose={() => setModalOpen(false)} /> // Show delete modal
      )}
    </div>
  );
};

export default PostList;
