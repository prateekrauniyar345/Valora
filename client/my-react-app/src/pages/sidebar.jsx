// Sidebar.jsx
const Sidebar = ({ activeTab, setActiveTab }) => (
    <div className="sidebar">
      <h3>My Account</h3>
      <ul>
        <li onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>My Profile</li>
        <li onClick={() => setActiveTab('address')} className={activeTab === 'address' ? 'active' : ''}>Address Book</li>
        <li onClick={() => setActiveTab('payment')} className={activeTab === 'payment' ? 'active' : ''}>My Payment Options</li>
        <li onClick={() => setActiveTab('manage')} className={activeTab === 'manage' ? 'active' : ''}>Manage My Account</li>
      </ul>
    </div>
  );
  