import styled from 'styled-components';

// Styled select dropdown used for language selection or other options
export const Select = styled.select`
  padding: 0.25rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;
