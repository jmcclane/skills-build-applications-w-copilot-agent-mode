import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection(workoutsEndpoint).then(setWorkouts).catch((reason) => setError(reason.message));
  }, []);

  return (
    <section className="data-section"><div className="section-heading"><span className="eyebrow">Your next session</span><h2>Workouts</h2><p>Choose a challenge that meets you where you are.</p></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-top"><span>{workout.activityType}</span><small>{workout.difficulty}</small></div><h3>{workout.name}</h3><p>{workout.description}</p><footer><span>{workout.durationMinutes} min</span><span>{workout.target}</span></footer></article>)}</div>}{!error && workouts.length === 0 && <p className="empty-state">No workouts available yet.</p>}</section>
  );
}

export default Workouts;
