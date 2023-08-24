// MainContainer.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import BASE_URL from './components/data';

const MainContainer = ({ isLoggedIn, onLogin, token }) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn) {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.success) {
            setUser(data.data.user);
          } else {
            console.error('Error fetching user data:', data.error.message);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  return (
    <div id='routes'>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/posts" element={<PostList isLoggedIn={isLoggedIn} user={user} />} />
        <Route exact path="/profile" element={<Profile user={user} />} />
        <Route exact path="/login" element={<Login onLogin={onLogin} />} />
        <Route exact path="/register" element={<Register onLogin={onLogin} />} />
        <Route exact path="/create-post" element={<CreatePost isLoggedIn={isLoggedIn} />} />
      </Routes>
    </div>
  );
};

export default MainContainer;
