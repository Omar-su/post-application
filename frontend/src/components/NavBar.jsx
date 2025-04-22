import styled from 'styled-components';

// Styled navigation bar with spacing and theming
export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;  // Space between left and right groups
  align-items: center;             // Vertically center items
  padding: 1rem 2rem;              // Add padding around content
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);  // Subtle bottom shadow
  background-color: ${({ theme }) => theme.background}; // Use theme background
`;
