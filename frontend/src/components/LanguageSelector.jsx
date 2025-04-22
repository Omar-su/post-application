import React from 'react';
import { Select } from './Select'; // Reusable styled Select component

// Dropdown for selecting language
export const LanguageSelector = ({ currentLanguage, onLanguageChange }) => (
  <Select onChange={onLanguageChange} defaultValue={currentLanguage}>
    <option value="en">EN</option>  
    <option value="sv">SV</option>  
  </Select>
);
