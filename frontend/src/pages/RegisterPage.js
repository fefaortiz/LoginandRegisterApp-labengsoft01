// frontend/src/pages/RegisterPage.js

import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom'; // To link to the login page

function RegisterPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Register</h1>
      <p>Join our platform by creating an account.</p>
      
      <RegisterForm />
      
      <p style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default RegisterPage;