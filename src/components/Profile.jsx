// Profile.jsx
import React, { useEffect, useState } from 'react';
import BASE_URL from './data.js';

export default function Profile({ user }) {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    const fetchReceivedMessages = async () => {
      if (user) {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`${BASE_URL}/users/me/received-messages`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.success) {
            setReceivedMessages(data.data.messages);
          } else {
            console.error('Error fetching received messages:', data.error.message);
          }
        } catch (error) {
          console.error('Error fetching received messages:', error);
        }
      }
    };

    const fetchSentMessages = async () => {
      if (user) {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`${BASE_URL}/users/me/sent-messages`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.success) {
            setSentMessages(data.data.messages);
          } else {
            console.error('Error fetching sent messages:', data.error.message);
          }
        } catch (error) {
          console.error('Error fetching sent messages:', error);
        }
      }
    };

    fetchReceivedMessages();
    fetchSentMessages();
  }, [user]);

  return (
    <div className="profile">
      <h1>Profile</h1>
      {user && (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          {user.role === 'user' && (
            <>
              <p>You can view your received messages here:</p>
              <ul>
                {receivedMessages.map(message => (
                  <li key={message._id}>{message.content}</li>
                ))}
              </ul>
            </>
          )}
          {user.role === 'admin' && (
            <p>You can manage all posts and messages here.</p>
          )}
          <p>Your sent messages:</p>
          <ul>
            {sentMessages.map(message => (
              <li key={message._id}>{message.content}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
