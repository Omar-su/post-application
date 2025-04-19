import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Login() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', data.user);
        navigate('/');
      } else {
        const err = await res.text();
        alert(err);
      }
    } catch (error) {
      console.error(error);
      alert(t('login.failed'));
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', paddingTop: '2rem' }}>
      <h2>{t('login.title')}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t('login.username')}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('login.password')}
          type="password"
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <button
          onClick={handleLogin}
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {t('login.button')}
        </button>
      </div>
      <p style={{ marginTop: '1rem' }}>
        {t('login.no_account')}{' '}
        <span
          onClick={() => navigate('/register')}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          {t('login.register_link')}
        </span>
      </p>
    </div>
  );
}

export default Login;
