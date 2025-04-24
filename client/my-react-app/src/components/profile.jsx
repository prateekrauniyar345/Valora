import { useState, useEffect } from 'react';
import './Login.css'; // reuse styling
import './Profile.css'; // optional for custom profile styles

export default function Profile() {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');
  const [billingInfo, setBillingInfo] = useState('');
  const userId = localStorage.getItem('userId'); // make sure this is set at login

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/user/profile/${userId}`);
        const data = await res.json();
        setUser(data);
        setAddress(data.address || '');
        setPaymentInfo(data.paymentInfo || '');
        setBillingInfo(data.billingInfo || '');
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    if (userId) fetchProfile();
  }, [userId]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5001/api/user/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, paymentInfo, billingInfo }),
      });

      const data = await res.json();
      alert('Profile updated!');
      setUser(data);
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSave}>
          <h2 className="login-title">MY PROFILE</h2>

          {/* Profile image */}
          <div className="profile-img-wrapper">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Profile"
              className="profile-img"
            />
          </div>

          {/* Full name & email (read-only) */}
          <input
            className="login-input"
            value={`${user.firstName} ${user.lastName}`}
            readOnly
          />

          <input
            className="login-input"
            value={user.email}
            readOnly
          />

          {/* Editable fields */}
          <input
            className="login-input"
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />

          <input
            className="login-input"
            placeholder="Payment Information"
            value={paymentInfo}
            onChange={e => setPaymentInfo(e.target.value)}
          />

          <input
            className="login-input"
            placeholder="Billing Information"
            value={billingInfo}
            onChange={e => setBillingInfo(e.target.value)}
          />

          <button type="submit" className="login-button">SAVE</button>
        </form>
      </div>
    </div>
  );
}
