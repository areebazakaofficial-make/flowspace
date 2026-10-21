import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import './Projects.css';

const colorOptions = ['#10B981', '#3B82F6', '#C9A227', '#F59E0B', '#EF4444', '#8B5CF6'];

const Projects = () => {
  const { projects, tasks, members, projectProgress, addProject } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', deadline: '', color: '#10B981' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.deadline) return;
    addProject({ id: 'p' + Date.now(), ...form, team: ['m1'] });
    setForm({ name: '', description: '', deadline: '', color: '#10B981' });
    setShowModal(false);
  };

  return (
    <div>
      <div className="page-header tasks-header">
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="page-sub">All your projects in one place.</p>
        </div>
        <button className="btn-emerald" onClick={() => setShowModal(true)}>+ New Project</button>
      </div>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            className="project-card card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
          >
            <div className="project-color" style={{ background: p.color }} />
            <div className="project-body">
              <div className="project-head">
                <h3>{p.name}</h3>
                <span className={`status ${p.status.replace(' ', '').toLowerCase()}`}>{p.status}</span>
              </div>
              <p className="project-desc">{p.description}</p>

              <div className="progress-top">
                <span className="p-percent">{projectProgress(p.id)}% complete</span>
              </div>
              <div className="bar">
                <motion.div
                  className="bar-fill"
                  style={{ background: p.color }}
                  initial={{ width: 0 }}
                  animate={{ width: projectProgress(p.id) + '%' }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.06 }}
                />
              </div>

              <div className="project-foot">
                <div className="team-stack">
                  {p.team.map((id) => {
                    const m = members.find((mm) => mm.id === id);
                    if (!m) return null;
                    return <div key={id} className="avatar" style={{ background: m.color }}>{m.name.charAt(0)}</div>;
                  })}
                </div>
                <span className="project-tasks">{tasks.filter((t) => t.projectId === p.id).length} tasks</span>
              </div>

              <div className="project-deadline">📅 Deadline: {p.deadline}</div>
              <Link to={`/projects/${p.id}`} className="view-btn">View Details →</Link>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)}>
            <motion.div
              className="modal card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>New Project</h3>
              <form onSubmit={handleSubmit}>
                <label>Project Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Project name" required />

                <label>Description</label>
                <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" />

                <label>Deadline</label>
                <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} required />

                <label>Color</label>
                <div className="color-row">
                  {colorOptions.map((c) => (
                    <button
                      type="button"
                      key={c}
                      className={`color-dot ${form.color === c ? 'sel' : ''}`}
                      style={{ background: c }}
                      onClick={() => setForm({ ...form, color: c })}
                    />
                  ))}
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn-emerald">Create Project</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;