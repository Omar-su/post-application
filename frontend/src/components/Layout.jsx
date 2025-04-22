import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { NavGroup } from './NavGroup';
import { NavLink } from './Navlink';
import { Navbar } from './NavBar';
import { LanguageSelector } from './LanguageSelector'; // Importing LanguageSelector
import { ThemeToggleButton } from './ThemeToggleButton'; // Importing ThemeToggleButton
import { AuthLinks } from './AuthLinks'; // Importing AuthLinks

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Change language when a new option is selected
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  // Clear user session and redirect to login
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('user');  // Check login status
  const nextTheme = theme === 'light' ? 'dark' : 'light';  // Determine next theme option

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
              {/* Show navigation links if user is logged in */}
              <NavLink to="/" active={location.pathname === "/"}>{t('nav.home')}</NavLink>
              <NavLink to="/add" active={location.pathname === "/add"}>{t('nav.add_post')}</NavLink>
            </>
          ) : null}
        </NavGroup>

        <NavGroup>
          <LanguageSelector currentLanguage={i18n.language} onLanguageChange={handleLanguageChange} />
          <ThemeToggleButton nextTheme={t(`theme.${nextTheme}`)} onToggleTheme={toggleTheme} />
          <div style={{ width: '1rem' }} />
          <AuthLinks isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        </NavGroup>
      </Navbar>

      {/* Page content */}
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

