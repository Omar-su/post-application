// src/components/DeleteModal.jsx
import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
`;

const Button = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  color: white;
  background-color: ${({ danger, theme }) => (danger ? theme.danger : theme.primary)};
`;

const DeleteModal = ({ onDelete, onClose }) => {
  return (
    <ModalOverlay>
      <ModalBox>
        <p>Are you sure you want to delete this post?</p>
        <div style={{ marginTop: '1rem' }}>
          <Button danger onClick={onDelete}>Delete</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </ModalBox>
    </ModalOverlay>
  );
};

export default DeleteModal;
