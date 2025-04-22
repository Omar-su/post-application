import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

// Table container styling
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

// Table header cell styling
const Th = styled.th`
  border-bottom: 2px solid ${({ theme }) => theme.border};
  padding: 0.75rem;
  text-align: left;
`;

// Table data cell styling
const Td = styled.td`
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 0.75rem;
`;

// Main post table rendering posts list
const PostTable = ({ posts, onDelete, onRowClick, t }) => (
  <Table>
    <thead>
      <tr>
        <Th>{t('title')}</Th>
        <Th>{t('body')}</Th>
        <Th>{t('actions')}</Th>
      </tr>
    </thead>
    <tbody>
      {posts.map((post) => (
        <PostRow key={post.id} post={post} onDelete={onDelete} onRowClick={onRowClick} t={t} />
      ))}
    </tbody>
  </Table>
);

// Row for a single post
const PostRow = ({ post, onDelete, onRowClick, t }) => (
  <tr onClick={() => onRowClick(post.id)} style={{ cursor: 'pointer' }}>
    <Td>{post.title}</Td>
    <Td>{post.body}</Td>
    {/* Prevent click propagation to avoid triggering row click when delete is pressed */}
    <Td onClick={(e) => e.stopPropagation()}>
      <Button
        $danger
        onClick={() => onDelete(post.id)}
      >
        {t('delete')}
      </Button>
    </Td>
  </tr>
);

export default PostTable;
