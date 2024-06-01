import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/reset-password', { email, password, token });
      setMessage('Password reset successful');
    } catch (error) {
      console.error('Error resetting password:', error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" placeholder="Reset Token" value={token} onChange={(e) => setToken(e.target.value)} />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordForm;
