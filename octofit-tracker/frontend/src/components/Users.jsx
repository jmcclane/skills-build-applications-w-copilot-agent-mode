import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((reason) => setError(reason.message));
  }, []);

  return (
    <section className="data-section">
      <div className="section-heading"><span className="eyebrow">Community</span><h2>Members</h2><p>Everyone showing up for their next strong day.</p></div>
      {error ? <div className="alert alert-warning">{error}</div> : <div className="member-grid">{users.map((user) => <article className="member-card" key={user._id}><span className="avatar" style={{ backgroundColor: user.avatarColor }}>{user.name?.charAt(0)}</span><div><h3>{user.name}</h3><p>{user.email}</p></div></article>)}</div>}
      {!error && users.length === 0 && <p className="empty-state">No members yet.</p>}
    </section>
  );
}

export default Users;
