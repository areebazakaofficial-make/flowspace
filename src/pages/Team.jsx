import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import './Team.css';

const Team = () => {
  const { members, tasks } = useApp();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Team</h1>
        <p className="page-sub">Team members and their workload</p>
      </div>

      <div className="team-grid">
        {members.map((m, i) => {
          const mt = tasks.filter((t) => t.assignee === m.id);
          const done = mt.filter((t) => t.status === 'done').length;
          const active = mt.filter((t) => t.status !== 'done').length;
          const pct = mt.length ? Math.round((done / mt.length) * 100) : 0;

          return (
            <motion.div
              key={m.id}
              className="card team-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
            >
              <div className="avatar big" style={{ background: m.color }}>{m.name.charAt(0)}</div>
              <h3>{m.name}</h3>
              <p className="team-role">{m.role}</p>

              <div className="team-stats">
                <div><h4>{mt.length}</h4><p>Total</p></div>
                <div><h4>{done}</h4><p>Done</p></div>
                <div><h4>{active}</h4><p>Active</p></div>
              </div>

              <div className="team-bar-wrap">
                <div className="progress-top"><span className="p-percent">{pct}% tasks done</span></div>
                <div className="bar">
                  <motion.div
                    className="bar-fill"
                    style={{ background: m.color }}
                    initial={{ width: 0 }}
                    animate={{ width: pct + '%' }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Team;