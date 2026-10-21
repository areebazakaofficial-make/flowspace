import { createContext, useContext, useEffect, useState } from 'react';
import { members as seedMembers, projects as seedProjects, tasks as seedTasks } from '../data/seed';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [allMembers] = useState(seedMembers);
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('flowspace-projects');
    return saved ? JSON.parse(saved) : seedProjects;
  });
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('flowspace-tasks');
    return saved ? JSON.parse(saved) : seedTasks;
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('flowspace-user');
    return saved ? JSON.parse(saved) : { name: 'Areeba', email: 'areeba@flowspace.com', role: 'Admin' };
  });
  const [dark, setDark] = useState(() => localStorage.getItem('flowspace-dark') === 'true');

  useEffect(() => localStorage.setItem('flowspace-projects', JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem('flowspace-tasks', JSON.stringify(tasks)), [tasks]);
  useEffect(() => localStorage.setItem('flowspace-user', JSON.stringify(user)), [user]);
  useEffect(() => {
    localStorage.setItem('flowspace-dark', dark ? 'true' : 'false');
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  const toggleTheme = () => setDark((d) => !d);

  const getMember = (id) => allMembers.find((m) => m.id === id);

  const addTask = (task) => setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  const moveTask = (id, status) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const addProject = (p) => setProjects((prev) => [...prev, { ...p, id: Date.now(), status: 'Active' }]);

  const projectProgress = (projectId) => {
    const pt = tasks.filter((t) => t.projectId === projectId);
    if (pt.length === 0) return 0;
    return Math.round((pt.filter((t) => t.status === 'done').length / pt.length) * 100);
  };

  const resetData = () => { setProjects(seedProjects); setTasks(seedTasks); };

  return (
    <AppContext.Provider value={{ members: allMembers, projects, tasks, user, setUser, dark, toggleTheme, getMember, addTask, moveTask, deleteTask, addProject, projectProgress, resetData }}>
      {children}
    </AppContext.Provider>
  );
};