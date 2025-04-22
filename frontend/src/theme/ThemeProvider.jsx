import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { useTranslation } from 'react-i18next';

// Create a context for managing theme state
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // State to track the current theme, with 'light' as the default
  const [theme, setTheme] = useState(() => {
    // Check if localStorage has a saved theme
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const { t } = useTranslation();

  // Update localStorage and body class whenever theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    // Provide the theme state and toggle function to the rest of the app
    <ThemeContext.Provider value={{ theme, toggleTheme, themeLabel: t(`theme.${theme}`) }}>
      <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
