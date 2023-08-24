//PostList.jsx
import React, { useState, useEffect } from 'react';
import BASE_URL from './data.js';

export default function PostList({ isLoggedIn, user }) {
const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (postId) => {
    if (!isLoggedIn) {
      return;
    }

    // Check if the logged-in user is the author of the post before deleting
    const postToDelete = posts.find(post => post._id === postId);
    if (postToDelete && user._id === postToDelete.author._id) {
      try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
          method: 'DELETE',
          headers: makeHeaders(),
        });

        if (response.ok) {
            // Remove the deleted post from the posts array in state
            setPosts(posts.filter(post => post._id !== postId));
          } else {
            console.error('Error deleting post:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      }
    };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${BASE_URL}/posts`);
      const data = await response.json();
      setPosts(data.data.posts);
    };

    fetchPosts();
  }, []);

  const handleSendMessage = async (postId, authorId) => {
    if (!isLoggedIn) {
      console.error('You need to be logged in to send a message.');
      return;
    }

    const token = localStorage.getItem('token');

    const data = {
      message: {
        content: message,
      },
    };

    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage('');
        setSelectedPostId(null);
      } else {
        console.error('Error sending message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  function postMatches(post, text) {
    return (
      post.title.toLowerCase().includes(text.toLowerCase()) ||
      post.description.toLowerCase().includes(text.toLowerCase())
    );
  }

  const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;
  console.log(postsToDisplay)
  return (
    <div className="post-list">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <h1>Post List</h1>
      <ul>
      {postsToDisplay.map(post => (
        post && post._id ? (
        <li key={post._id}>           
         <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>Price: {post.price}</p>
            {isLoggedIn && user && user._id === post.author._id && (
              <>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </>
            )}
            {isLoggedIn && user && user._id !== post.author._id && (
              <>
                <button onClick={() => setSelectedPostId(post._id)}>Send Message</button>
                {selectedPostId === post._id && (
                  <div>
                    <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
                    <button onClick={() => handleSendMessage(post._id, post.author._id)}>Send</button>
                  </div>
                )}
              </>
            )}
          </li>
        ) : null
        ))}
      </ul>
    </div>
  );
}


