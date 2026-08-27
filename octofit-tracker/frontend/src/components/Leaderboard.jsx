import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection(leaderboardEndpoint).then(setEntries).catch((reason) => setError(reason.message));
  }, []);

  return (
    <section className="data-section"><div className="section-heading"><span className="eyebrow">This week</span><h2>Leaderboard</h2><p>Celebrate consistency, not just the finish line.</p></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="leaderboard">{[...entries].sort((a, b) => a.rank - b.rank).map((entry) => <article className={`leader-row ${entry.rank === 1 ? 'leader-row-top' : ''}`} key={entry._id}><strong>0{entry.rank}</strong><span className="leader-dot" /><div><h3>{entry.userId}</h3><p>Team points</p></div><b>{entry.points}</b></article>)}</div>}{!error && entries.length === 0 && <p className="empty-state">No scores yet.</p>}</section>
  );
}

export default Leaderboard;
