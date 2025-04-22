import React from 'react';
import styled from 'styled-components';

// Styled input for the search bar
const SearchInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
`;

// Search bar component for filtering content
const SearchBar = ({ search, onSearchChange, placeholder }) => (
  <SearchInput
    type="text"
    placeholder={placeholder}
    value={search}
    onChange={onSearchChange}
  />
);

export default SearchBar;
