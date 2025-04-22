import styled from 'styled-components';

/**
 * Reusable styled button 
 */
export const Button = styled.button`
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  color: white;
  background-color: ${({ $danger, theme }) => ($danger ? theme.danger : theme.primary)};
  
  &:hover {
    opacity: 0.9;
  }
`;
