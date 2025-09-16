import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault(); // Prevent page reload

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };

      const API_URL = 'http://localhost:8000/api/auth/register';
      
      await axios.post(API_URL, newUser);

      navigate('/home');

    } catch (err) {
      const errorDetail = err.response?.data?.detail;
      
      if (typeof errorDetail === 'string') {
        setMessage(errorDetail); // "Email already registered"
      } else {
        setMessage('Registration failed. An unknown error occurred.');
      }
      
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
