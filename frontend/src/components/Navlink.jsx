import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled navigation link with dynamic color based on active state
export const NavLink = styled(Link)`
  font-weight: bold;
  margin-right: 1rem;
  color: ${({ theme, active }) => active ? theme.primary : theme.text};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
