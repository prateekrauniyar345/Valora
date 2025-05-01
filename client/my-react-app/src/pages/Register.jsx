import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import API_BASE from '../components/api';



export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [userName, setUserName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const navigate                  = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE}/api/user/register`, {
    // const res = await fetch('http://localhost:5001/api/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, userName, email, password })
    });

    const data = await res.json();

    if (data.success) {
      alert('Registration successful! Please log in.');
      navigate('/login');
    } else {
      alert(data.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <form className="login-form" onSubmit={handleRegister}>
          <h2 className="login-title">REGISTER</h2>

          <input
            type="text"
            className="login-input"
            placeholder="FIRST NAME"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            className="login-input"
            placeholder="LAST NAME"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />

          <input
            type="text"
            className="login-input"
            placeholder="USERNAME"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            required
          />

          <input
            type="email"
            className="login-input"
            placeholder="EMAIL"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="login-input"
            placeholder="PASSWORD"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">
            REGISTER
          </button>

          <p className="login-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
