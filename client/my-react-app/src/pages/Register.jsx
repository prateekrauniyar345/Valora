// // src/Components/Register.jsx
// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './Login.css';

// export default function Register() {
//   const [firstName, setFirstName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

// // Register.jsx
// const handleRegister = (e) => {
//     e.preventDefault();
//     const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
  
//     if (accounts.some(acc => acc.email === email)) {
//       alert('Account already exists.');
//       return;
//     }
  
//     accounts.push({ firstName, email, password });
//     localStorage.setItem('accounts', JSON.stringify(accounts));
  
//     localStorage.setItem('userFirstName', firstName);
//     navigate('/home');
//   };
  

//   return (
//     <div className="login-page-wrapper">
//       <div className="login-container">
//         <form className="login-form" onSubmit={handleRegister}>
//           <h2 className="login-title">REGISTER</h2>

//           <input
//             type="text"
//             className="login-input"
//             placeholder="FIRST NAME"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />

//           <input
//             type="email"
//             className="login-input"
//             placeholder="EMAIL"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             className="login-input"
//             placeholder="PASSWORD"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit" className="login-button">REGISTER</button>
//           <p className="login-footer">
//             Already have an account? <Link to="/login">Login</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }


// src/Components/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [userName, setUserName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const navigate                  = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');

    // Prevent duplicate email or username
    if (accounts.some(acc => acc.email === email || acc.userName === userName)) {
      alert('Account with that email or username already exists.');
      return;
    }

    // Add new account
    accounts.push({ firstName, lastName, userName, email, password });
    localStorage.setItem('accounts', JSON.stringify(accounts));

    // Store session info
    localStorage.setItem('userFirstName', firstName);
    localStorage.setItem('userName', userName);

    navigate('/login');
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
