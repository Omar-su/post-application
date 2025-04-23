// src/features/auth/Register.js
import React from 'react';
import AuthForm from './AuthForm';

function Register() {
  return (
    <AuthForm
      titleKey="register.title"
      usernamePlaceholderKey="register.username"
      passwordPlaceholderKey="register.password"
      buttonLabelKey="register.button"
      submitUrl="http://localhost:5000/register"
      onSuccessRedirect="/login"
      successAlertKey="register.success"
      failureAlertKey="register.failed"
      alternateTextKey="register.have_account"
      alternateLinkLabelKey="register.login_link"
      alternateLinkPath="/login"
      buttonColor="#10b981"
    />
  );
}

export default Register;
