import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 // Login.jsx
const handleLogin = (e) => {
  e.preventDefault();
  const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
  const user = accounts.find(acc => acc.email === email && acc.password === password);

  if (user) {
    localStorage.setItem('userFirstName', user.firstName);
    navigate('/'); // This forces reload and triggers login detection
    
  } else {
    alert('Account not found. Please register first.');
    navigate('/register');
  }
};

  

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-title">LOGIN</h2>
          <input
            type="email"
            className="login-input"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">LOGIN</button>
          <p className="login-footer">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
