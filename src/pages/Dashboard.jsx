import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { todayStr } from '../data/seed';
import './Dashboard.css';

const Dashboard = () => {
  const { projects, tasks, projectProgress, getMember } = useApp();
  const today = todayStr();

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: '📁', color: '#10B981' },
    { label: 'Completed Tasks', value: tasks.filter((t) => t.status === 'done').length, icon: '✅', color: '#C9A227' },
    { label: 'In Progress', value: tasks.filter((t) => t.status === 'progress').length, icon: '⏳', color: '#3B82F6' },
    { label: 'Overdue', value: tasks.filter((t) => t.status !== 'done' && t.due < today).length, icon: '⚠️', color: '#EF4444' },
  ];

  const upcoming = tasks
    .filter((t) => t.status !== 'done' && t.due >= today)
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-sub">A well-planned project with clear milestones, a dedicated team and steady progress towards on-time delivery. </p>
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-card card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <span className="stat-icon" style={{ background: s.color + '1a', color: s.color }}>{s.icon}</span>
            <div>
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card panel">
          <h3>Projects Progress</h3>
          {projects.map((p) => (
            <Link to={`/projects/${p.id}`} key={p.id} className="progress-row">
              <div className="progress-top">
                <span className="p-name">{p.name}</span>
                <span className="p-percent">{projectProgress(p.id)}%</span>
              </div>
              <div className="bar">
                <motion.div
                  className="bar-fill"
                  style={{ background: p.color }}
                  initial={{ width: 0 }}
                  animate={{ width: projectProgress(p.id) + '%' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="card panel">
          <h3>Upcoming Deadlines</h3>
          {upcoming.length === 0 && <p className="empty">Koi upcoming task nahi 🎉</p>}
          {upcoming.map((t) => {
            const m = getMember(t.assignee);
            return (
              <div key={t.id} className="deadline-row">
                <div className="avatar" style={{ background: m.color }}>{m.name.charAt(0)}</div>
                <div className="deadline-info">
                  <p>{t.title}</p>
                  <span>Due: {t.due}</span>
                </div>
                <span className={`prio ${t.priority.toLowerCase()}`}>{t.priority}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;