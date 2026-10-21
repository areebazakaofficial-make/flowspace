import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { todayStr } from '../data/seed';
import './Reports.css';

const Reports = () => {
  const { tasks, projects, projectProgress } = useApp();
  const today = todayStr();

  const done = tasks.filter((t) => t.status === 'done').length;
  const inprog = tasks.filter((t) => t.status === 'progress').length;
  const todo = tasks.filter((t) => t.status === 'todo').length;
  const total = tasks.length || 1;

  const donePct = Math.round((done / total) * 100);
  const inprogPct = Math.round((inprog / total) * 100);
  const rate = donePct;

  const overdue = tasks.filter((t) => t.status !== 'done' && t.due < today);

  const prioData = ['High', 'Medium', 'Low'].map((pr) => ({
    name: pr,
    count: tasks.filter((t) => t.priority === pr && t.status !== 'done').length,
  }));
  const maxPrio = Math.max(...prioData.map((p) => p.count), 1);
  const prioColor = { High: '#EF4444', Medium: '#F59E0B', Low: '#3B82F6' };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Reports & Analytics</h1>
        <p className="page-sub">Productivity overview</p>
      </div>

      <div className="rep-top">
        <div className="card panel">
          <h3>Task Status</h3>
          <div className="donut-row">
            <div
              className="donut"
              style={{ background: `conic-gradient(#10B981 0% ${donePct}%, #3B82F6 ${donePct}% ${donePct + inprogPct}%, #E7E5E0 ${donePct + inprogPct}% 100%)` }}
            >
              <div className="donut-hole">
                <h4>{rate}%</h4>
                <p>Completed</p>
              </div>
            </div>
            <div className="legend">
              <span><i style={{ background: '#10B981' }} /> Completed ({done})</span>
              <span><i style={{ background: '#3B82F6' }} /> In Progress ({inprog})</span>
              <span><i style={{ background: '#E7E5E0' }} /> To Do ({todo})</span>
            </div>
          </div>
        </div>

        <div className="card panel">
          <h3>Project Progress</h3>
          {projects.map((p, i) => (
            <div key={p.id} className="rep-bar-row">
              <span className="rep-bar-name">{p.name}</span>
              <div className="bar">
                <motion.div
                  className="bar-fill"
                  style={{ background: p.color }}
                  initial={{ width: 0 }}
                  animate={{ width: projectProgress(p.id) + '%' }}
                  transition={{ duration: 0.7, delay: i * 0.06 }}
                />
              </div>
              <span className="p-percent">{projectProgress(p.id)}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rep-bottom">
        <div className="card panel">
          <h3>Priority Breakdown (active tasks)</h3>
          {prioData.map((p, i) => (
            <div key={p.name} className="rep-bar-row">
              <span className="rep-bar-name">{p.name}</span>
              <div className="bar">
                <motion.div
                  className="bar-fill"
                  style={{ background: prioColor[p.name] }}
                  initial={{ width: 0 }}
                  animate={{ width: (p.count / maxPrio) * 100 + '%' }}
                  transition={{ duration: 0.7, delay: i * 0.06 }}
                />
              </div>
              <span className="p-percent">{p.count}</span>
            </div>
          ))}
        </div>

        <div className="card panel">
          <h3>⚠️ Overdue Tasks ({overdue.length})</h3>
          {overdue.length === 0 && <p className="empty">Koi overdue task nahi 🎉</p>}
          {overdue.map((t) => (
            <div key={t.id} className="rep-overdue">
              <span className="prio high">Late</span>
              <div className="cal-task-info">
                <p>{t.title}</p>
                <span>Due: {t.due}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;