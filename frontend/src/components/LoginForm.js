import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const { username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const API_URL = 'http://localhost:8000/api/auth/login';
      const res = await axios.post(API_URL, formData);
      localStorage.setItem('token', res.data.access_token);
      navigate('/home'); 
    } catch (err) {
      const errorDetail = err.response?.data?.detail;

      if (typeof errorDetail === 'string') {
        setMessage(errorDetail);
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
      console.error('Login Error:', err.response);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}>
      <h2>Login</h2>
      {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Email
        </label>
        <input
          type="text"
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
          type="text"
          name="password"
          value={formData.password}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
