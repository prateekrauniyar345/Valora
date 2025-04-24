// 📁 src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    billingName: '',
    billingAddress: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    fetch('http://localhost:5001/api/user/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setUser(data);
          setFormData(prev => ({ ...prev, ...data }));
        }
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const res = await fetch('http://localhost:5001/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success) {
      alert('Profile updated!');
      setUser(data.user);
    } else {
      alert(data.message);
    }
  };

  if (!user) return <div className="contact-wrapper">Loading...</div>;

  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <h1 className="contact-title">My Account</h1>

        <section className="contact-section">
          <h2>Personal Information</h2>
          <label>First Name:
            <input name="firstName" value={formData.firstName} onChange={handleChange} />
          </label>
          <label>Last Name:
            <input name="lastName" value={formData.lastName} onChange={handleChange} />
          </label>
          <label>Email:
            <input name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>Phone Number:
            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </label>
        </section>

        <section className="contact-section">
          <h2>Address</h2>
          <label>Street:
            <input name="address" value={formData.address} onChange={handleChange} />
          </label>
          <label>City:
            <input name="city" value={formData.city} onChange={handleChange} />
          </label>
          <label>State:
            <input name="state" value={formData.state} onChange={handleChange} />
          </label>
          <label>Postal Code:
            <input name="postalCode" value={formData.postalCode} onChange={handleChange} />
          </label>
          <label>Country:
            <input name="country" value={formData.country} onChange={handleChange} />
          </label>
        </section>

        <section className="contact-section">
          <h2>Billing Info</h2>
          <label>Billing Name:
            <input name="billingName" value={formData.billingName} onChange={handleChange} />
          </label>
          <label>Billing Address:
            <input name="billingAddress" value={formData.billingAddress} onChange={handleChange} />
          </label>
        </section>

        <section className="contact-section">
          <h2>Payment Info</h2>
          <label>Card Number:
            <input name="cardNumber" value={formData.cardNumber} onChange={handleChange} />
          </label>
          <label>Expiry Date:
            <input name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
          </label>
          <label>CVV:
            <input name="cvv" value={formData.cvv} onChange={handleChange} />
          </label>
        </section>

        <div style={{ textAlign: 'right' }}>
          <button className="contact-submit" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
