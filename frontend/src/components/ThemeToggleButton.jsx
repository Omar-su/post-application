import React from 'react';
import { Button } from './Button'; // Reusing Button styled component

// ThemeToggleButton for toggling between light/dark modes
export const ThemeToggleButton = ({ nextTheme, onToggleTheme }) => (
  <Button onClick={onToggleTheme}>
    {nextTheme} Mode  {/* Display next theme (light/dark) */}
  </Button>
);
