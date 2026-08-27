import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('/api/teams/').then(setTeams).catch((reason) => setError(reason.message));
  }, []);

  return (
    <section className="data-section"><div className="section-heading"><span className="eyebrow">Friendly competition</span><h2>Teams</h2><p>Find your people, then find another mile.</p></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id}><span className="team-mark">+</span><div><h3>{team.name}</h3><p>{team.motto}</p><small>{team.members?.length ?? 0} members</small></div></article>)}</div>}{!error && teams.length === 0 && <p className="empty-state">No teams yet.</p>}</section>
  );
}

export default Teams;
