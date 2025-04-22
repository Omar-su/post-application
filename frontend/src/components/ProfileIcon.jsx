// src/components/ProfileIcon.jsx
import React from 'react';
import styled from 'styled-components';

// Container for the icon with left margin
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

// Styled image to appear as a circular profile icon
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

// Reusable profile icon component
const ProfileIcon = ({ imageSrc }) => {
  return (
    <IconWrapper>
      <ProfileImage src={imageSrc} alt="Profile" />
    </IconWrapper>
  );
};

export default ProfileIcon;
