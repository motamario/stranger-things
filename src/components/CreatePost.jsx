// CreatePost.jsx
import React, { useState } from 'react';
import BASE_URL from './data.js';

export default function CreatePost({ isLoggedIn }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);

  const handleCreatePost = () => {
    if (!isLoggedIn) {
      setError('You need to be logged in to create a post.');
      return;
    }

    const data = {
      post: {
        title,
        description,
        price,
      },
    };

    const token = localStorage.getItem('token');

    fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Add the new post to the posts array in your state
        } else {
          setError(data.error.message);
        }
      })
      .catch(error => console.error('Error creating post:', error));
  };

  const makeHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

  return (
    <div className="create-post">
      <h1>Create Post</h1>
      {error && <p className="error">{error}</p>}
      {isLoggedIn ? (
      <>
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
          <button onClick={handleCreatePost}>Create Post</button>
      </>
      ) : (
        <p>You need to be logged in to create a post.</p>
      )}

    </div>
  );
}

