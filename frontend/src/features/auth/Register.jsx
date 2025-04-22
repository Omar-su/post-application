import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Register() {
  const { t } = useTranslation(); // Initialize translation
  const [username, setUsername] = useState(''); // Store username input
  const [password, setPassword] = useState(''); // Store password input
  const navigate = useNavigate(); // Hook for navigation

  const handleRegister = async () => {
    try {
      const res = await fetch('http://localhost:5000/register', { // Send registration request
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) { // If successful, show success message and navigate to login page
        alert(t('register.success'));
        navigate('/login');
      } else {
        const err = await res.text(); // Show error message if registration fails
        alert(t('register.failed'));
      }
    } catch (error) {
      console.error(error);
      alert(t('register.failed')); // Display error message if request fails
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', paddingTop: '2rem' }}>
      <h2>{t('register.title')}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state
          placeholder={t('register.username')}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          placeholder={t('register.password')}
          type="password"
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <button
          onClick={handleRegister} // Call register function on click
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            backgroundColor: '#10b981', // Green background color for success
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {t('register.button')}
        </button>
      </div>
      <p style={{ marginTop: '1rem' }}>
        {t('register.have_account')}{' '}
        <span
          onClick={() => navigate('/login')} // Navigate to login page
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          {t('register.login_link')}
        </span>
      </p>
    </div>
  );
}

export default Register;
