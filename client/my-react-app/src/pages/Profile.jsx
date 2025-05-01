import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import API_BASE from '../components/api';


export default function Profile() {
  const [billingSameAsShipping, setBillingSame] = useState(false);
  const [profile, setProfile]                   = useState(null);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState(null);
  const navigate                                = useNavigate();

  // Fetch once on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/user/profile`, { credentials: 'include' })
    // fetch('http://localhost:5001/api/user/profile', { credentials: 'include' })
      .then(res => {
        if (res.status === 401) { navigate('/login', { replace: true }); throw new Error(); }
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then(data => { 
        // ensure at least one shippingAddress and one payment slot exist
        if (!data.shippingAddresses?.length) data.shippingAddresses = [{}];
        if (!data.billingAddress) data.billingAddress = {};
        if (!data.paymentMethods?.length) data.paymentMethods = [{}];
        setProfile(data); 
        setLoading(false); 
      })
      .catch(() => { setError('Unable to load profile'); setLoading(false); });
  }, [navigate]);

  // copy shipping → billing when toggled
  useEffect(() => {
    if (billingSameAsShipping && profile) {
      setProfile(p => ({
        ...p,
        billingAddress: { ...p.shippingAddresses[0] }
      }));
    }
  }, [billingSameAsShipping, profile]);

  const handleChange = (path, value) => {
    setProfile(prev => {
      const copy = JSON.parse(JSON.stringify(prev)); // deep clone
      const keys = path.split('.');
      let obj = copy;
      keys.slice(0,-1).forEach(k => obj = obj[k]);
      obj[keys[keys.length-1]] = value;
      return copy;
    });
  };

  const handleSave = () => {
    fetch(`${API_BASE}/api/user/profile`, {
    // fetch('http://localhost:5001/api/user/profile', {
      method: 'PUT',
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(profile)
    })
      .then(res => {
        if (!res.ok) throw new Error();
        alert('Profile saved');
      })
      .catch(() => alert('Save failed'));
  };

  if (loading) return <p className="loading">Loading…</p>;
  if (error)   return <p className="error">{error}</p>;
  if (!profile) return null;

  const {
    user: { username, email },
    fullName, phone, dob = '',
    shippingAddresses, billingAddress, paymentMethods
  } = profile;

  // pull out slot-zero for ease
  const ship = shippingAddresses[0];
  const pay  = paymentMethods[0];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>My Profile</h1>

        <section className="profile-section">
          <h2>Account Info</h2>
          <input
            className="wide-input"
            type="text"
            placeholder="Full Name"
            value={fullName || ''}
            onChange={e => handleChange('fullName', e.target.value)}
          />
          <input
            className="wide-input"
            type="text"
            placeholder="Username"
            value={username}
            disabled
          />
          <input
            className="wide-input"
            type="email"
            placeholder="Email"
            value={email}
            disabled
          />
          <input
            className="wide-input"
            type="tel"
            placeholder="Phone"
            value={phone || ''}
            onChange={e => handleChange('phone', e.target.value)}
          />
          <input
            className="wide-input"
            type="date"
            placeholder="Date of Birth"
            value={dob ? dob.split('T')[0] : ''}
            onChange={e => handleChange('dob', e.target.value)}
          />
        </section>

        <section className="profile-section">
          <h2>Shipping Address</h2>
          <div className="address-block">
            <input
              className="wide-input"
              type="text"
              placeholder="Line1"
              value={ship.line1 || ''}
              onChange={e => handleChange('shippingAddresses.0.line1', e.target.value)}
            />
            <input
              className="wide-input"
              type="text"
              placeholder="City"
              value={ship.city || ''}
              onChange={e => handleChange('shippingAddresses.0.city', e.target.value)}
            />
            <input
              className="wide-input"
              type="text"
              placeholder="State"
              value={ship.state || ''}
              onChange={e => handleChange('shippingAddresses.0.state', e.target.value)}
            />
            <input
              className="wide-input"
              type="text"
              placeholder="Zip"
              value={ship.zip || ''}
              onChange={e => handleChange('shippingAddresses.0.zip', e.target.value)}
            />
            <input
              className="wide-input"
              type="text"
              placeholder="Country"
              value={ship.country || ''}
              onChange={e => handleChange('shippingAddresses.0.country', e.target.value)}
            />
          </div>
        </section>

        <section className="profile-section">
          <h2>Billing Address</h2>
          <div className="same-checkbox">
            <input
              type="checkbox"
              id="sameAs"
              checked={billingSameAsShipping}
              onChange={e => setBillingSame(e.target.checked)}
            />
            <label htmlFor="sameAs">Same as shipping</label>
          </div>
          <div className="address-block">
            <input
              className="wide-input"
              type="text"
              placeholder="Line1"
              value={billingAddress.line1 || ''}
              onChange={e => handleChange('billingAddress.line1', e.target.value)}
            />
            <input
              className="wide-input"
              type="text"
              placeholder="City"
              value={billingAddress.city || ''}
              onChange={e => handleChange('billingAddress.city', e.target.value)}
            />
            <input
              className="wide-input"
              type="text"
              placeholder="State"
              value={billingAddress.state || ''}
              onChange={e => handleChange('billingAddress.state', e.target.value)}
            />
            <input
              className="wide-input"
              type="text"
              placeholder="Zip"
              value={billingAddress.zip || ''}
              onChange={e => handleChange('billingAddress.zip', e.target.value)}
            />
            <input
              className="wide-input"
              type="text"
              placeholder="Country"
              value={billingAddress.country || ''}
              onChange={e => handleChange('billingAddress.country', e.target.value)}
            />
          </div>
        </section>

        <section className="profile-section">
          <h2>Payment Method</h2>
          <div className="payment-block">
            <input
              className="wide-input"
              type="text"
              placeholder="Card Number"
              value={pay.cardNumber || ''}
              onChange={e => handleChange('paymentMethods.0.cardNumber', e.target.value)}
            />
            <input
              className="wide-input"
              type="text"
              placeholder="CVV"
              value={pay.cvv || ''}
              onChange={e => handleChange('paymentMethods.0.cvv', e.target.value)}
            />
            <input
              className="wide-input"
              type="month"
              placeholder="Expiry"
              value={pay.expiry || ''}
              onChange={e => handleChange('paymentMethods.0.expiry', e.target.value)}
            />
            <input
              className="wide-input"
              type="text"
              placeholder="ZIP"
              value={pay.zip || ''}
              onChange={e => handleChange('paymentMethods.0.zip', e.target.value)}
            />
          </div>
        </section>

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

