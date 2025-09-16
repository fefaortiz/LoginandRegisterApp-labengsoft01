import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  // State for the form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State for displaying error or success messages
  const [message, setMessage] = useState('');
  
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Updates state as the user types
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles the form submission
  const onSubmit = async e => {
    e.preventDefault(); // Prevent page reload

    // 1. Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      // 2. Prepare data for the API (without confirmPassword)
      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };

      const API_URL = 'http://localhost:8000/api/auth/register';
      
      // Send the request
      await axios.post(API_URL, newUser);

      // 3. On SUCCESS, navigate to the home page
      navigate('/home');

    } catch (err) {
      // 4. On FAILURE, display the error message
      const errorDetail = err.response?.data?.detail;
      
      if (typeof errorDetail === 'string') {
        setMessage(errorDetail); // e.g., "Email already registered"
      } else {
        setMessage('Registration failed. An unknown error occurred.');
      }
      
      // IMPORTANT: This will show the full error in your browser's console for debugging
      console.error("Registration Error Response:", err.response);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}>
      <h2>Create Your Account</h2>
      
      {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={onChange}
          required
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          minLength="6"
          required
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;