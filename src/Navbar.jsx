// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import './index.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <div id="navbar">
      <Link to="/">Home</Link>
      <Link to="/posts">Posts</Link>
      {isLoggedIn ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
