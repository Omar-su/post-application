import React from 'react';
import { useTheme } from './ThemeProvider'; 
import { useTranslation } from 'react-i18next'; 

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme(); // Extracting current theme and toggle function
  const { t } = useTranslation(); // Extracting translation function

  const nextTheme = theme === 'light' ? 'dark' : 'light'; // Determine the next theme

  return (
    <button onClick={toggleTheme} className="border px-4 py-2 rounded">
      {t(`theme.${nextTheme}`)} {t('mode')} {/* Display next theme (light/dark) and mode */}
    </button>
  );
};

export default ThemeToggleButton;
