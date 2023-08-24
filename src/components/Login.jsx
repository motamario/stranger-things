//Login.jsx
import React, { useState } from 'react';
import BASE_URL from './data.js';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    const data = {
      user: {
        username,
        password,
      },
    };

    fetch(`${BASE_URL}/users/login`, {
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
      .catch(error => console.error('Error logging in:', error));
  };

  return (
    <div className="login">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
