import React, { useState, useEffect } from 'react';
import './header.css';
import logo from '../assets/logo/logo.png';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import slugify from 'slugify';
import pluralize from 'pluralize';
import { useCart } from './CartContext';

const Header = () => {
  const [dropdown, setDropdown] = useState(null);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('query') || '');
  const [username, setUsername] = useState(null);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm(searchParams.get('query') || '');
  }, [searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      const name = localStorage.getItem('userFirstName');
      setUsername(name);
    }, 1000); // check every 1 second
  
    return () => clearInterval(interval); // cleanup
  }, []);
  

  const toggleDropdown = (category) => {
    setDropdown(dropdown === category ? null : category);
  };

  const renderDropdown = (gender, items) => (
    <div className="dropdown-menu">
      <div className="dropdown-grid">
        <Link to={`/products/${gender}/all`} className="shop-all">Shop All</Link>
        {items.map((item, idx) => (
          <Link
            key={idx}
            to={`/products/${gender}/${slugify(item, { lower: true, strict: true })}`}
          >
            {item}
          </Link>
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

  const handleLogout = () => {
    localStorage.removeItem('userFirstName');
    setUsername(null);
  
    // 👉 Reload the page so Header re-evaluates localStorage
    window.location.href = '/login';
  };
  

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/"><img src={logo} alt="Company Logo" className="logo" /></Link>
      </div>

      <nav className="header__nav">
        <ul>
          <li><Link to="/">Home</Link></li>

          <li className="dropdown-trigger" onMouseEnter={() => toggleDropdown("men")} onMouseLeave={() => setDropdown(null)}>
            MEN
            {dropdown === "men" && renderDropdown("men", ["Topwear", "Bottomwear", "Socks", "Watches", "Shoes", "Flip Flops", "Sandal", "Fragrance", "Belts", "Innerwear", "Eyewear", "Wallets", "Jewellery", "Headwear", "Free Gifts", "Ties", "Mufflers", "Loungewear and Nightwear", "Accessories", "Scarves", "Bags", "Gloves", "Cufflinks", "Skin Care", "Perfumes", "Water Bottle", "Shoe Accessories", "Bath and Body", "Stoles"])}
          </li>

          <li className="dropdown-trigger" onMouseEnter={() => toggleDropdown("women")} onMouseLeave={() => setDropdown(null)}>
            WOMEN
            {dropdown === "women" && renderDropdown("women", ["Watches", "Topwear", "Belts", "Bags", "Innerwear", "Jewellery", "Lips", "Shoes", "Saree", "Fragrance", "Sandal", "Nails", "Scarves", "Dress", "Loungewear and Nightwear", "Bottomwear", "Wallets", "Flip Flops", "Apparel Set", "Mufflers", "Skin Care", "Makeup", "Socks", "Eyewear", "Accessories", "Skin", "Headwear", "Beauty Accessories", "Free Gifts", "Eyes", "Bath and Body", "Cufflinks", "Stoles", "Hair", "Perfumes", "Umbrellas", "Vouchers"])}
          </li>

          <li className="dropdown-trigger" onMouseEnter={() => toggleDropdown("boys")} onMouseLeave={() => setDropdown(null)}>
            BOYS
            {dropdown === "boys" && renderDropdown("boys", ["Flip Flops", "Topwear", "Shoes", "Bottomwear", "Socks", "Sandal", "Eyewear", "Apparel Set", "Watches", "Gloves", "Headwear", "Innerwear"])}
          </li>

          <li className="dropdown-trigger" onMouseEnter={() => toggleDropdown("girls")} onMouseLeave={() => setDropdown(null)}>
            GIRLS
            {dropdown === "girls" && renderDropdown("girls", ["Topwear", "Bottomwear", "Dress", "Sandal", "Watches", "Shoes", "Flip Flops", "Innerwear", "Gloves", "Socks", "Headwear", "Apparel Set", "Eyewear", "Jewellery", "Bags"])}
          </li>

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

      <div className='login-register'>
        {username ? (
          <>
            <span style={{ fontWeight: '500', fontSize: '16px' }}>Hi, {username}</span>
            <button onClick={handleLogout} className="login-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="register-btn">Register</button>
            </Link>
          </>
        )}
      </div>

      <Link to="/cart" className="cart-btn">
        <span className="cart-icon">🛒</span>
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </Link>
    </header>
  );
};

export default Header;
