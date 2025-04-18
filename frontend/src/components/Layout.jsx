import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
`;

const NavLink = styled(Link)`
  font-weight: bold;
  margin-right: 1rem;
  color: ${({ theme }) => theme.text};
`;

const Select = styled.select`
  padding: 0.25rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
`;

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();
  const location = useLocation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div style={{ background: theme === 'dark' ? '#111827' : '#ffffff', color: theme === 'dark' ? '#ffffff' : '#000000', minHeight: '100vh' }}>
      <Navbar>
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/add">Add Post</NavLink>
        </div>
        <div>
          <Select onChange={handleLanguageChange} defaultValue={i18n.language}>
            <option value="en">EN</option>
            <option value="sv">SV</option>
          </Select>
          <Button onClick={toggleTheme} style={{ marginLeft: '1rem' }}>
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </div>
      </Navbar>
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>{children}</main>
    </div>
  );
};

export default Layout;