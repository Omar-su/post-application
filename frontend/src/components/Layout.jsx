import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  background-color: ${({ theme }) => theme.background};
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  font-weight: bold;
  margin-right: 1rem;
  color: ${({ theme, active }) => active ? theme.primary : theme.text};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Select = styled.select`
  padding: 0.25rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  border: none;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  margin-left: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('user');
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <div
      style={{
        background: theme === 'dark' ? '#111827' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
        minHeight: '100vh',
      }}
    >
      <Navbar>
        <NavGroup>
          {isLoggedIn ? (
            <>
              <NavLink to="/" active={location.pathname === "/"}>{t('nav.home')}</NavLink>
              <NavLink to="/add" active={location.pathname === "/add"}>{t('nav.add_post')}</NavLink>
            </>
          ) : null}
        </NavGroup>

        <NavGroup>
          <Select onChange={handleLanguageChange} defaultValue={i18n.language}>
            <option value="en">EN</option>
            <option value="sv">SV</option>
          </Select>
          <Button onClick={toggleTheme}>
          {t(`theme.${nextTheme}`)} {t('mode')}
          </Button>

          <div style={{ width: '1rem' }} /> 

          {isLoggedIn ? (
            <Button onClick={handleLogout}>{t('nav.logout') || 'Logout'}</Button>
          ) : (
            <>
              <NavLink to="/login" active={location.pathname === "/login"}>{t('nav.login') || 'Login'}</NavLink>
              <NavLink to="/register" active={location.pathname === "/register"}>{t('nav.register') || 'Register'}</NavLink>
            </>
          )}

        </NavGroup>
      </Navbar>

      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
