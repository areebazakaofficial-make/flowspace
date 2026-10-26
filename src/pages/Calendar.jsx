import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { todayStr } from '../data/seed';
import './Calendar.css';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const { tasks, projects, getMember } = useApp();
  const today = todayStr();

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selected, setSelected] = useState(today);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, key });
  }

  const changeMonth = (dir) => {
    let m = month + dir;
    let y = year;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setMonth(m);
    setYear(y);
  };

  const dayTasks = (key) => tasks.filter((t) => t.due === key);
  const selectedTasks = dayTasks(selected);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Calendar</h1>
        <p className="page-sub"></p>
      </div>

      <div className="cal-wrap">
        <div className="card cal-main">
          <div className="cal-head">
            <button className="cal-nav" onClick={() => changeMonth(-1)}>←</button>
            <h3>{monthNames[month]} {year}</h3>
            <button className="cal-nav" onClick={() => changeMonth(1)}>→</button>
          </div>

          <div className="cal-weekdays">
            {weekdays.map((w) => <span key={w}>{w}</span>)}
          </div>

          <motion.div
            key={month + '-' + year}
            className="cal-grid"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          >
            {cells.map((c, i) =>
              c === null ? (
                <div key={'e' + i} className="cal-day empty-cell" />
              ) : (
                <div
                  key={c.key}
                  className={`cal-day ${c.key === today ? 'today' : ''} ${c.key === selected ? 'selected' : ''}`}
                  onClick={() => setSelected(c.key)}
                >
                  <span className="cal-num">{c.day}</span>
                  {dayTasks(c.key).slice(0, 2).map((t) => {
                    const p = projects.find((pr) => pr.id === t.projectId);
                    return (
                      <span key={t.id} className="cal-chip" style={{ background: (p ? p.color : '#888') + '22', color: p ? p.color : '#888' }}>
                        {t.title}
                      </span>
                    );
                  })}
                  {dayTasks(c.key).length > 2 && <span className="cal-more">+{dayTasks(c.key).length - 2} more</span>}
                </div>
              )
            )}
          </motion.div>
        </div>

        <div className="card cal-side">
          <h3>{selected === today ? 'Today Tasks' : selected}</h3>
          {selectedTasks.length === 0 && <p className="empty">There is no task for today😌</p>}
          {selectedTasks.map((t) => {
            const m = getMember(t.assignee);
            const p = projects.find((pr) => pr.id === t.projectId);
            return (
              <div key={t.id} className="cal-task">
                <span className={`prio ${t.priority.toLowerCase()}`}>{t.priority}</span>
                <div className="cal-task-info">
                  <p>{t.title}</p>
                  <span>{p ? p.name : '—'} • {m ? m.name : '—'}</span>
                </div>
                <span className={`pd-badge ${t.status}`}>
                  {t.status === 'todo' ? 'To Do' : t.status === 'progress' ? 'In Progress' : 'Done'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;