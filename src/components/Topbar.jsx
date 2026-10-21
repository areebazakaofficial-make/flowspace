import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { todayStr } from '../data/seed';
import './Topbar.css';

const Topbar = () => {
  const { user, tasks, dark, toggleTheme } = useApp();
  const today = todayStr();
  const overdue = tasks.filter((t) => t.status !== 'done' && t.due < today).length;

  const dateStr = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <header className="topbar">
      <div>
        <h2>Hello! {user.name.split(' ')[0]} 👋</h2>
        <p>{dateStr}</p>
      </div>
      <div className="topbar-right">
        <div className="search">
          <span>🔍</span>
          <input placeholder="Search tasks, projects..." />
        </div>
        <button className="theme-btn" onClick={toggleTheme} title="Theme change">
          {dark ? '☀️' : '🌙'}
        </button>
        <Link to="/notifications" className="bell">
          🔔
          {overdue > 0 && <span className="bell-badge">{overdue}</span>}
        </Link>
        <div className="avatar">{user.name.charAt(0)}</div>
      </div>
    </header>
  );
};

export default Topbar;