import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { todayStr } from '../data/seed';
import './Sidebar.css';

const items = [
  { to: '/', icon: '📊', label: 'Dashboard', end: true },
  { to: '/tasks', icon: '✅', label: 'My Tasks' },
  { to: '/projects', icon: '📁', label: 'Projects' },
  { to: '/calendar', icon: '📅', label: 'Calendar' },
  { to: '/team', icon: '👥', label: 'Team' },
  { to: '/reports', icon: '📈', label: 'Reports' },
  { to: '/notifications', icon: '🔔', label: 'Notifications' },
  { to: '/settings', icon: '⚙️', label: 'Settings' },
];

const Sidebar = () => {
  const { user, tasks } = useApp();
  const today = todayStr();
  const overdue = tasks.filter((t) => t.status !== 'done' && t.due < today).length;

  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-icon">⚡</span>
        <h1>Flow<span>Space</span></h1>
      </div>

      <nav className="nav">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.to === '/notifications' && overdue > 0 && <span className="badge">{overdue}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="user-card">
        <div className="avatar" style={{ background: '#10B981' }}>{user.name.charAt(0)}</div>
        <div>
          <p className="user-name">{user.name}</p>
          <p className="user-role">{user.role}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;