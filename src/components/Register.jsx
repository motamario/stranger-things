//Register.jsx
import React, { useState } from 'react';
import BASE_URL from './data.js';

export default function Register({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const data = {
      user: {
        username,
        password,
      },
    };

    fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          onLogin(data.data.token); // Log in the user
        } else {
          setError(data.error.message);
        }
      })
      .catch(error => console.error('Error registering user:', error));
  };

  return (
    <div className="register">
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
