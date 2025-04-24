import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('http://localhost:5001/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 🧠 VERY important for cookie to be sent
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (res.ok && data.success) {
        window.location.href = '/';
      } else {
        alert(data.message || 'Login failed. Please check your credentials.');
      }
  
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong. Please try again.');
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
