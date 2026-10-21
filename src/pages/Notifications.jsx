import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { todayStr } from '../data/seed';
import './Notifications.css';

const Notifications = () => {
  const { tasks } = useApp();
  const today = todayStr();

  const week = new Date();
  week.setDate(week.getDate() + 7);
  const weekStr = week.getFullYear() + '-' + String(week.getMonth() + 1).padStart(2, '0') + '-' + String(week.getDate()).padStart(2, '0');

  const overdue = tasks.filter((t) => t.status !== 'done' && t.due < today).map((t) => ({ ...t, type: 'overdue' }));
  const dueToday = tasks.filter((t) => t.status !== 'done' && t.due === today).map((t) => ({ ...t, type: 'today' }));
  const dueWeek = tasks.filter((t) => t.status !== 'done' && t.due > today && t.due <= weekStr).map((t) => ({ ...t, type: 'week' }));
  const completed = tasks.filter((t) => t.status === 'done').sort((a, b) => b.due.localeCompare(a.due)).slice(0, 4).map((t) => ({ ...t, type: 'done' }));

  const all = [...overdue, ...dueToday, ...dueWeek, ...completed];
  const unread = overdue.length + dueToday.length;

  const config = {
    overdue: { icon: '🔴', title: 'Overdue!' },
    today: { icon: '🟠', title: 'Due Today' },
    week: { icon: '🔵', title: 'Due this week' },
    done: { icon: '🟢', title: 'Completed' },
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Notifications</h1>
        <p className="page-sub">{unread > 0 ? `${unread} unread alerts` : 'All Clear ✨'}</p>
      </div>

      <div className="notif-list">
        {all.length === 0 && <div className="card panel"><p className="empty">No Notifications 🎉</p></div>}
        {all.map((n, i) => {
          const c = config[n.type];
          return (
            <motion.div
              key={n.type + n.id}
              className="card notif-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <span className="notif-icon">{c.icon}</span>
              <div className="notif-body">
                <p className="notif-title">{n.title}</p>
                <span className="notif-sub">{c.title} • Due: {n.due}</span>
              </div>
              {n.type !== 'done' && <span className="notif-dot" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;