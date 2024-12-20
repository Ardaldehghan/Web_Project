import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (role) => {
    const endpoint =
      role === 'player'
        ? 'http://localhost:3001/api/login/player'
        : 'http://localhost:3001/api/login/designer';
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
  
        // Save username in local storage
        localStorage.setItem('playerUsername', username);
  
        navigate(`/${role}`);
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong. Please try again.');
    }
  };
  

  const handleRegister = async (role) => {
    const endpoint = role === 'player'
      ? 'http://localhost:3001/api/login/register/player'
      : 'http://localhost:3001/api/login/register/designer';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const data = await response.json();
        alert(data.message);
        setError(data.message);
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login or Register</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setError('');
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="button" onClick={() => handleLogin('player')}>
          Login as Player
        </button>
        <button type="button" onClick={() => handleLogin('designer')}>
          Login as Designer
        </button>

        <button type="button" onClick={() => handleRegister('player')}>
          Register as Player
        </button>
        <button type="button" onClick={() => handleRegister('designer')}>
          Register as Designer
        </button>
      </form>
    </div>
  );
};

export default Login;
