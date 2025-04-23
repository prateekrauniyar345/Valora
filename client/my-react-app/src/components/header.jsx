import React, { useState, useEffect } from 'react';
import './header.css';
import logo from '../assets/logo/logo.png';
import { Link, useNavigate, useSearchParams  } from 'react-router-dom';
import slugify from 'slugify'; // For URL slugs
import pluralize from 'pluralize';


const Header = () => {
  const [dropdown, setDropdown] = useState(null);
  // const [searchTerm, setSearchTerm] = useState('');
  const [searchParams]              = useSearchParams();  
  // init from ?query= on first render
  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get('query') || ''
  );

  // keep it in sync if someone lands or navigates with a ?query=
  useEffect(() => {
    setSearchTerm(searchParams.get('query') || '');
  }, [searchParams]);



  const navigate  = useNavigate();


  const toggleDropdown = (category) => {
    setDropdown(dropdown === category ? null : category);
  };


  const renderDropdown = (gender, items) => (
    <div className="dropdown-menu">
      <div className="dropdown-grid">
        <Link to={`/products/${gender}/all`} className="shop-all">
          Shop All
        </Link>
  
        {items.map((item, idx) => (
          <Link
            key={idx}
            to={`/products/${gender}/${slugify(item, { lower:true, strict:true })}`}
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
      genderParam = pluralize.plural(g);   // "boy" → "boys", "girl" → "girls", "man" → "men", etc.
    }
    // singularize search term so “skirts” → “skirt”, “pants” → “pant”
    term = pluralize.singular(term);
    // build the URL
    const params = new URLSearchParams();
     // store the entire raw search string, unmodified
    params.set('query', raw);
    // if (genderParam) params.set('gender', genderParam);
    params.set('gender', genderParam || 'all');
    navigate(`/search?${params.toString()}`);
  };
  
  


  return (
    <header className="header">

      <div className="header__logo">
        <Link to="/"><img src={logo} alt="Company Logo" className="logo" /></Link>
      </div>

      <nav className="header__nav">
        <ul>
          <li><Link to="/">Home</Link></li>

          {/* Men */}
          <li
            className="dropdown-trigger"
            onMouseEnter={() => toggleDropdown("men")}
            onMouseLeave={() => setDropdown(null)}
          >
            MEN
            {dropdown === "men" && renderDropdown("men", [
              "Topwear", "Bottomwear", "Socks", "Watches", "Shoes", "Flip Flops", "Sandal", "Fragrance",
              "Belts", "Innerwear", "Eyewear", "Wallets", "Jewellery", "Headwear", "Free Gifts", "Ties",
              "Mufflers", "Loungewear and Nightwear", "Accessories", "Scarves", "Bags", "Gloves", "Cufflinks",
              "Skin Care", "Perfumes", "Water Bottle", "Shoe Accessories", "Bath and Body", "Stoles"
            ])}
          </li>

          {/* Women */}
          <li
            className="dropdown-trigger"
            onMouseEnter={() => toggleDropdown("women")}
            onMouseLeave={() => setDropdown(null)}
          >
            WOMEN
            {dropdown === "women" && renderDropdown("women", [
              "Watches", "Topwear", "Belts", "Bags", "Innerwear", "Jewellery", "Lips", "Shoes", "Saree",
              "Fragrance", "Sandal", "Nails", "Scarves", "Dress", "Loungewear and Nightwear", "Bottomwear",
              "Wallets", "Flip Flops", "Apparel Set", "Mufflers", "Skin Care", "Makeup", "Socks", "Eyewear",
              "Accessories", "Skin", "Headwear", "Beauty Accessories", "Free Gifts", "Eyes", "Bath and Body",
              "Cufflinks", "Stoles", "Hair", "Perfumes", "Umbrellas", "Vouchers"
            ])}
          </li>

          {/* Boys */}
          <li
            className="dropdown-trigger"
            onMouseEnter={() => toggleDropdown("boys")}
            onMouseLeave={() => setDropdown(null)}
          >
            BOYS
            {dropdown === "boys" && renderDropdown("boys", [
              "Flip Flops", "Topwear", "Shoes", "Bottomwear", "Socks", "Sandal", "Eyewear", "Apparel Set",
              "Watches", "Gloves", "Headwear", "Innerwear"
            ])}
          </li>

          {/* Girls */}
          <li
            className="dropdown-trigger"
            onMouseEnter={() => toggleDropdown("girls")}
            onMouseLeave={() => setDropdown(null)}
          >
            GIRLS
            {dropdown === "girls" && renderDropdown("girls", [
              "Topwear", "Bottomwear", "Dress", "Sandal", "Watches", "Shoes", "Flip Flops", "Innerwear",
              "Gloves", "Socks", "Headwear", "Apparel Set", "Eyewear", "Jewellery", "Bags"
            ])}
          </li>

          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>

        </ul>
      </nav>

      {/* <div className="header__search">
        <input className="search" type="text" placeholder="Search for products, brands, or more..." />
        <button className="search-btn">Search</button>
      </div> */}
      {/* SEARCH FORM */}
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
      


      {/* 🆕 Login and Register buttons styled like Search */}
      <div className='login-register'>
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>
      </div>


    </header>
  );
};

export default Header;
