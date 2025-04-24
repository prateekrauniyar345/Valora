import React, { useEffect, useState } from 'react';
import './header.css';
import logo from '../assets/logo/logo.png';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import slugify from 'slugify';
import pluralize from 'pluralize';
<<<<<<< Updated upstream
=======
import { useCart } from './CartContext';
import { FaUser } from 'react-icons/fa';
>>>>>>> Stashed changes

const Header = () => {
  const [dropdown, setDropdown] = useState(null);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('query') || '');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch current logged in user (via cookie)
  useEffect(() => {
    fetch('http://localhost:5001/api/user/me', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data) setUser(data);
      })
      .catch(err => console.error('Failed to fetch user:', err));
  }, []);

  useEffect(() => {
    setSearchTerm(searchParams.get('query') || '');
  }, [searchParams]);

<<<<<<< Updated upstream
=======
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/user/me', {
          credentials: 'include'
        });
        const data = await res.json();
        if (data && data.firstName) {
          setUsername(data.firstName);
        } else {
          setUsername(null);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
  
    fetchUser();
  
    // Re-fetch on visibility change (like after login redirect)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchUser();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
  
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  

  const handleLogout = async () => {
    await fetch('http://localhost:5001/api/user/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUsername(null);
    window.location.href = '/login';
  };

>>>>>>> Stashed changes
  const toggleDropdown = (category) => {
    setDropdown(dropdown === category ? null : category);
  };

  const renderDropdown = (gender, items) => (
    <div className="dropdown-menu">
      <div className="dropdown-grid">
        <Link to={`/products/${gender}/all`} className="shop-all">Shop All</Link>
        {items.map((item, idx) => (
          <Link key={idx} to={`/products/${gender}/${slugify(item, { lower: true, strict: true })}`}>{item}</Link>
        ))}
      </div>
    </div>
  );

  const onSearch = (e) => {
    e.preventDefault();
    const raw = searchTerm.trim();
    if (!raw) return;

    const m = raw.match(/(.+)\s+for\s+(man|men|woman|women|boy|boys|girl|girls)$/i);
    let term = raw;
    let genderParam = '';

    if (m) {
      term = m[1].trim();
      const g = m[2].toLowerCase();
      genderParam = pluralize.plural(g);
    }

    term = pluralize.singular(term);

    const params = new URLSearchParams();
    params.set('query', raw);
    params.set('gender', genderParam || 'all');
    navigate(`/search?${params.toString()}`);
  };

<<<<<<< Updated upstream
=======
  // ✅ VALID return block inside the function body
>>>>>>> Stashed changes
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/"><img src={logo} alt="Company Logo" className="logo" /></Link>
      </div>

      <nav className="header__nav">
        <ul>
          <li><Link to="/">Home</Link></li>
<<<<<<< Updated upstream
          {/* Add Men/Women/Boys/Girls dropdowns here (omitted for brevity) */}
=======
          <li className="dropdown-trigger" onMouseEnter={() => toggleDropdown("men")} onMouseLeave={() => setDropdown(null)}>
            MEN
            {dropdown === "men" && renderDropdown("men", ["Topwear", "Bottomwear", "Socks", "Watches", "Shoes", "Flip Flops", "Sandal", "Fragrance", "Belts", "Innerwear", "Eyewear", "Wallets", "Jewellery", "Headwear", "Free Gifts", "Ties", "Mufflers", "Loungewear and Nightwear", "Accessories", "Scarves", "Bags", "Gloves", "Cufflinks", "Skin Care", "Perfumes", "Water Bottle", "Shoe Accessories", "Bath and Body", "Stoles"])}
          </li>
          {/* Add other dropdowns similarly */}
>>>>>>> Stashed changes
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <form className="header__search" onSubmit={onSearch}>
        <input
          className="search"
          type="text"
          placeholder="Search for products, brands, or more…"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

<<<<<<< Updated upstream
      {user ? (
        <div className="header__user">
          <span>Hi, {user.firstName}</span>
          <button
            className="login-btn"
            onClick={() => {
              fetch('http://localhost:5001/api/user/logout', {
                method: 'POST',
                credentials: 'include',
              }).then(() => window.location.href = '/login');
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="login-register">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      )}
=======
      <div className="login-register">
        {username ? (
          <>
            <span>Hi, {username}</span>
            <button onClick={handleLogout} className="login-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className="login-btn">Login</button></Link>
            <Link to="/register"><button className="register-btn">Register</button></Link>
          </>
        )}
      </div>

      <Link to="/cart" className="cart-btn">
        <span className="cart-icon">🛒</span>
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </Link>

      <Link to="/profile" className="profile-icon">
        <FaUser size={22} />
      </Link>
>>>>>>> Stashed changes
    </header>
  );
};

export default Header;
