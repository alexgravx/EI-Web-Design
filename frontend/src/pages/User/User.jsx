import React, { useState } from 'react';
import './User.css';

function User() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulating authentication logic
    if (username === 'Paul-Aim' && password === '1234567890' || username === 'Alex' && password === 'azertyuiop' ||
        username === 'Hugues' && password === 'qsdfghjklm'
    ) {
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div className="container">
        <h2>Vous êtes bien admin de PopMovie </h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default User;