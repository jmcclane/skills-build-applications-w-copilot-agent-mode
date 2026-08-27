import { NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/"><img src={logo} alt="Octofit" /><span>OCTOFIT<br /><b>TRACKER</b></span></NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink end to="/">Overview</NavLink>
          <NavLink to="/activities">Activity</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Members</NavLink>
        </nav>
        <span className="profile-chip">MC</span>
      </header>
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return <section className="overview"><div className="overview-copy"><span className="eyebrow">Thursday, August 27</span><h1>Make today<br /><em>count.</em></h1><p>Your movement adds up. Keep the rhythm going and make your next session your best one yet.</p><NavLink className="primary-action" to="/workouts">Find a workout <span aria-hidden="true">↗</span></NavLink></div><div className="overview-signal"><div className="signal-ring"><strong>72</strong><span>weekly score</span></div><div className="streak"><span>Current streak</span><b>06 days</b><small>+12% from last week</small></div></div><div className="quick-links"><NavLink to="/activities"><span>01</span><b>Log activity</b><small>Keep your streak alive</small></NavLink><NavLink to="/leaderboard"><span>02</span><b>See your rank</b><small>Find your edge</small></NavLink><NavLink to="/teams"><span>03</span><b>Meet your team</b><small>Move together</small></NavLink></div></section>
}

export default App
