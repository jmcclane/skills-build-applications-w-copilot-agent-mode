import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('/api/activities/').then(setActivities).catch((reason) => setError(reason.message));
  }, []);

  return (
    <section className="data-section"><div className="section-heading"><span className="eyebrow">Training log</span><h2>Recent activity</h2><p>Momentum is built one session at a time.</p></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="activity-list">{activities.map((activity) => <article className="activity-row" key={activity._id}><span className="activity-icon">{activity.activityType?.charAt(0)}</span><div className="activity-copy"><h3>{activity.activityType}</h3><p>{activity.durationMinutes} min · {activity.calories} calories</p></div><time>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Today'}</time></article>)}</div>}{!error && activities.length === 0 && <p className="empty-state">No activities logged yet.</p>}</section>
  );
}

export default Activities;
