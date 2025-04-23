// src/components/AuthForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function AuthForm({
  titleKey,
  usernamePlaceholderKey,
  passwordPlaceholderKey,
  buttonLabelKey,
  submitUrl,
  onSuccessRedirect,
  successAlertKey,
  failureAlertKey,
  alternateTextKey,
  alternateLinkLabelKey,
  alternateLinkPath,
  buttonColor
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await fetch(submitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        if (submitUrl.includes('/login')) {
          const data = await res.json();
          localStorage.setItem('user', data.user);
        }
        if (successAlertKey) alert(t(successAlertKey));
        navigate(onSuccessRedirect);
      } else {
        alert(t(failureAlertKey));
      }
    } catch (err) {
      console.error(err);
      alert(t(failureAlertKey));
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', paddingTop: '2rem' }}>
      <h2>{t(titleKey)}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t(usernamePlaceholderKey)}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t(passwordPlaceholderKey)}
          type="password"
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            backgroundColor: buttonColor,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {t(buttonLabelKey)}
        </button>
      </div>
      <p style={{ marginTop: '1rem' }}>
        {t(alternateTextKey)}{' '}
        <span
          onClick={() => navigate(alternateLinkPath)}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          {t(alternateLinkLabelKey)}
        </span>
      </p>
    </div>
  );
}

export default AuthForm;
