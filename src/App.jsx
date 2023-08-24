// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContainer from './MainContainer';
import Navbar from './Navbar';
import './index.css';

function App() {
  const [token, setToken] = useState(null);

  const handleLogin = (newToken) => {
    console.log(newToken)
    setToken(newToken);
    localStorage.setItem('token', newToken)
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token')
  };

  const isLoggedIn = () => {
    return !!token;
  };

  const makeHeaders = () => {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  };

  return (
    <div id="container">
      <div className="nav-section">
        <h1>Stranger's Things</h1>
        <Navbar isLoggedIn={isLoggedIn()} onLogout={handleLogout} />
      </div>

      <div id="main-section">
        
          <MainContainer isLoggedIn={isLoggedIn()} onLogin={handleLogin} token={token} />
      </div>

      <div id="footer"></div>
    </div>
  );
}

export default App;
