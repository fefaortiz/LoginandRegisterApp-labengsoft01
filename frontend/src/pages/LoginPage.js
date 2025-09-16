// frontend/src/pages/LoginPage.js
import React from 'react';
import LoginForm from '../components/LoginForm'; // The component from the previous answer

function LoginPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome Back!</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;