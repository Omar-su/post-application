import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import styled from 'styled-components';

/**
 * Fullscreen overlay that dims the background and centers the modal.
 */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * Styled container for the modal content.
 */
const ModalBox = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
`;

/**
 * DeleteModal displays a confirmation dialog with Delete and Cancel buttons.
 * 
 * @param {function} onDelete - Function to call when delete is confirmed.
 * @param {function} onClose - Function to close the modal.
 */
const DeleteModal = ({ onDelete, onClose }) => {
  const { t } = useTranslation();

  return (
    <ModalOverlay data-testid="deletemodal" onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <p>{t('delete_post_confirmation')}</p>
        <div style={{ marginTop: '1rem' }}>
          <Button $danger onClick={onDelete}>{t('delete')}</Button>
          <Button onClick={onClose}>{t('cancel')}</Button> 
        </div>
      </ModalBox>
    </ModalOverlay>
  );
};

export default DeleteModal;
