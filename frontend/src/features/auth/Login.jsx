// src/features/auth/Login.js
import React from 'react';
import AuthForm from './AuthForm';

function Login() {
  return (
    <AuthForm
      titleKey="login.title"
      usernamePlaceholderKey="login.username"
      passwordPlaceholderKey="login.password"
      buttonLabelKey="login.button"
      submitUrl="http://localhost:5000/login"
      onSuccessRedirect="/"
      failureAlertKey="Invalid credentials"
      alternateTextKey="login.no_account"
      alternateLinkLabelKey="login.register_link"
      alternateLinkPath="/register"
      buttonColor="#3b82f6"
    />
  );
}

export default Login;
