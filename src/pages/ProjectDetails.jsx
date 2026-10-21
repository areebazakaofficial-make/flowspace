import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const { projects, tasks, projectProgress, getMember } = useApp();
  const project = projects.find((p) => String(p.id) === String(id));

  if (!project) {
    return (
      <div className="page-header">
        <h1 className="page-title">No project found!</h1>
        <Link to="/projects" className="back-link">← Back to Projects</Link>
      </div>
    );
  }

  const pt = tasks.filter((t) => t.projectId === project.id);
  const done = pt.filter((t) => t.status === 'done').length;
  const inprog = pt.filter((t) => t.status === 'progress').length;
  const todo = pt.filter((t) => t.status === 'todo').length;
  const pct = projectProgress(project.id);

  return (
    <div>
      <Link to="/projects" className="back-link">← Back to Projects</Link>

      <div className="pd-header card">
        <div>
          <h1 className="page-title">{project.name}</h1>
          <p className="page-sub">{project.description}</p>
        </div>
        <span className={`status ${project.status.replace(' ', '').toLowerCase()}`}>{project.status}</span>
      </div>

      <div className="pd-stats">
        <div className="card pd-stat"><h3>{pt.length}</h3><p>Total Tasks</p></div>
        <div className="card pd-stat"><h3>{todo}</h3><p>To Do</p></div>
        <div className="card pd-stat"><h3>{inprog}</h3><p>In Progress</p></div>
        <div className="card pd-stat"><h3>{done}</h3><p>Completed</p></div>
      </div>

      <div className="pd-grid">
        <div className="card panel">
          <h3>Progress — {pct}%</h3>
          <div className="bar big">
            <motion.div
              className="bar-fill"
              style={{ background: project.color }}
              initial={{ width: 0 }}
              animate={{ width: pct + '%' }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="pd-deadline">📅 Deadline: {project.deadline}</p>
        </div>

        <div className="card panel">
          <h3>Team Members</h3>
          {project.team.map((mid) => {
            const m = getMember(mid);
            if (!m) return null;
            const count = pt.filter((t) => t.assignee === mid).length;
            return (
              <div key={mid} className="pd-member">
                <div className="avatar" style={{ background: m.color }}>{m.name.charAt(0)}</div>
                <div>
                  <p>{m.name}</p>
                  <span>{m.role} • {count} tasks</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card panel">
        <h3>Tasks</h3>
        {pt.length === 0 && <p className="empty">No tasks in this project yet — add one from My Tasks!</p>}
        {pt.map((t) => {
          const m = getMember(t.assignee);
          return (
            <div key={t.id} className="pd-task">
              <span className={`prio ${t.priority.toLowerCase()}`}>{t.priority}</span>
              <p className="pd-task-title">{t.title}</p>
              <div className="avatar" style={{ background: m ? m.color : '#888' }}>{m ? m.name.charAt(0) : '?'}</div>
              <span className="pd-task-due">{t.due}</span>
              <span className={`pd-badge ${t.status}`}>
                {t.status === 'todo' ? 'To Do' : t.status === 'progress' ? 'In Progress' : 'Done'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectDetails;