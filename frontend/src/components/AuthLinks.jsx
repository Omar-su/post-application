import React from 'react';
import { useTranslation } from 'react-i18next';  
import { NavLink } from './Navlink';
import { Button } from './Button';

export const AuthLinks = ({ isLoggedIn, onLogout }) => {
  const { t } = useTranslation();  // Access the translation function

  // Render logout button if logged in, otherwise render login and register links
  return isLoggedIn ? (
    <Button onClick={onLogout}>{t('nav.logout')}</Button>
  ) : (
    <>
      <NavLink to="/login">{t('nav.login')}</NavLink> 
      <NavLink to="/register">{t('nav.register')}</NavLink>  
    </>
  );
};
