import React from 'react';
import { useTheme } from './ThemeProvider';
import { useTranslation } from 'react-i18next';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <button onClick={toggleTheme} className="border px-4 py-2 rounded">
      {t(`theme.${nextTheme}`)} {t('mode')}
    </button>
  );
};

export default ThemeToggleButton;
