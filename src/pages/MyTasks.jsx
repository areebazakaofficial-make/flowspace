import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { todayStr } from '../data/seed';
import './MyTasks.css';

const columns = [
  { key: 'todo', title: 'To Do', icon: '📋' },
  { key: 'progress', title: 'In Progress', icon: '⏳' },
  { key: 'done', title: 'Completed', icon: '✅' },
];

const MyTasks = () => {
  const { tasks, projects, members, getMember, addTask, moveTask, deleteTask } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', projectId: '', assignee: '', priority: 'Medium', due: '' });
  const today = todayStr();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.due) return;
    addTask({
      title: form.title,
      projectId: Number(form.projectId),
      assignee: Number(form.assignee),
      status: 'todo',
      priority: form.priority,
      due: form.due,
    });
    setForm({ title: '', projectId: '', assignee: '', priority: 'Medium', due: '' });
    setShowModal(false);
  };

  return (
    <div>
      <div className="page-header tasks-header">
        <div>
          <h1 className="page-title">My Tasks</h1>
          <p className="page-sub"></p>
        </div>
        <button className="btn-emerald" onClick={() => setShowModal(true)}>+ New Task</button>
      </div>

      <div className="kanban">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className="kanban-col">
              <div className="kanban-col-head">
                <h3>{col.icon} {col.title}</h3>
                <span className="count">{colTasks.length}</span>
              </div>
              <AnimatePresence mode="popLayout">
                {colTasks.map((t) => {
                  const p = projects.find((pr) => pr.id === t.projectId);
                  const m = getMember(t.assignee);
                  const idx = columns.findIndex((c) => c.key === t.status);
                  return (
                    <motion.div
                      key={t.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="task-card card"
                    >
                      <div className="task-top">
                        <span className={`prio ${t.priority.toLowerCase()}`}>{t.priority}</span>
                        <button className="task-del" onClick={() => deleteTask(t.id)}>✕</button>
                      </div>
                      <p className="task-title">{t.title}</p>
                      <div className="task-meta">
                        <span className="task-project" style={{ color: p ? p.color : '#888' }}>{p ? p.name : '—'}</span>
                        <span className={`task-due ${t.status !== 'done' && t.due < today ? 'late' : ''}`}>{t.due}</span>
                      </div>
                      <div className="task-foot">
                        <div className="avatar" style={{ background: m ? m.color : '#888' }}>{m ? m.name.charAt(0) : '?'}</div>
                        <div className="task-actions">
                          {idx > 0 && <button onClick={() => moveTask(t.id, columns[idx - 1].key)}>←</button>}
                          {idx < 2 && <button onClick={() => moveTask(t.id, columns[idx + 1].key)}>→</button>}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)}>
            <motion.div
              className="modal card"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>New Task</h3>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Task ka naam" required />

                <div className="form-row">
                  <div>
                    <label>Project</label>
                    <select value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })} required>
                      <option value="">Select</option>
                      {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label>Assignee</label>
                    <select value={form.assignee} onChange={(e) => setForm({ ...form, assignee: e.target.value })} required>
                      <option value="">Select</option>
                      {members.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div>
                    <label>Priority</label>
                    <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div>
                    <label>Due Date</label>
                    <input type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} required />
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn-emerald">Add Task</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyTasks;