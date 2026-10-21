// ================= FlowSpace Seed Data =================

// Helper: today's date as "YYYY-MM-DD"
export const todayStr = () => new Date().toISOString().slice(0, 10);

// ================= Team Members =================
export const members = [
  { id: 'm1', name: 'Areeba',      role: 'Project Manager', color: '#10B981', initials: 'A' },
  { id: 'm2', name: 'Sara Khan',   role: 'UI Designer',     color: '#C9A227', initials: 'S' },
  { id: 'm3', name: 'Hamza Ali',   role: 'Developer',       color: '#3B82F6', initials: 'H' },
  { id: 'm4', name: 'Zainab Ahmed', role: 'Developer',      color: '#F59E0B', initials: 'Z' },
  { id: 'm5', name: 'Bilal Raza',  role: 'QA Engineer',     color: '#EF4444', initials: 'B' },
];

// ================= Projects =================
export const projects = [
  {
    id: 'p1',
    name: 'Website Redesign',
    description: 'A complete new design for the company website',
    deadline: '2026-11-05',
    status: 'Active',
    color: '#10B981',
    team: ['m1', 'm2', 'm3'],
  },
  {
    id: 'p2',
    name: 'Mobile App',
    description: 'A shopping app for iOS and Android',
    deadline: '2026-11-20',
    status: 'Active',
    color: '#3B82F6',
    team: ['m1', 'm3', 'm4'],
  },
  {
    id: 'p3',
    name: 'Marketing Campaign',
    description: 'Season sale social media campaign',
    deadline: '2026-10-28',
    status: 'Active',
    color: '#C9A227',
    team: ['m2', 'm5'],
  },
  {
    id: 'p4',
    name: 'AI Chatbot',
    description: 'Customer support chatbot integration',
    deadline: '2026-12-10',
    status: 'On Hold',
    color: '#F59E0B',
    team: ['m3', 'm4'],
  },
  {
    id: 'p5',
    name: 'Brand Identity',
    description: 'Logo, colors and brand guidelines',
    deadline: '2026-10-10',
    status: 'Completed',
    color: '#EF4444',
    team: ['m2'],
  },
];

// ================= Tasks =================
export const tasks = [
  // --- Website Redesign ---
  { id: 't1',  title: 'Design homepage wireframe',      projectId: 'p1', assignee: 'm2', status: 'done',     priority: 'Medium', due: '2026-10-05' },
  { id: 't2',  title: 'Develop hero section',            projectId: 'p1', assignee: 'm3', status: 'done',     priority: 'High',   due: '2026-10-12' },
  { id: 't3',  title: 'Client feedback meeting notes',   projectId: 'p1', assignee: 'm1', status: 'done',     priority: 'Low',    due: '2026-10-14' },
  { id: 't4',  title: 'Build pricing page',              projectId: 'p1', assignee: 'm3', status: 'done',     priority: 'High',   due: '2026-10-22' },
  { id: 't5',  title: 'Mobile responsive fixes',         projectId: 'p1', assignee: 'm4', status: 'done',     priority: 'Medium', due: '2026-10-25' },
  { id: 't6',  title: 'Color palette approval',          projectId: 'p1', assignee: 'm2', status: 'todo',     priority: 'Low',    due: '2026-10-30' },

  // --- Mobile App ---
  { id: 't7',  title: 'Setup React project',             projectId: 'p2', assignee: 'm3', status: 'done',     priority: 'High',   due: '2026-10-08' },
  { id: 't8',  title: 'Login screen UI',                 projectId: 'p2', assignee: 'm4', status: 'done',     priority: 'Medium', due: '2026-10-21' },
  { id: 't9',  title: 'Push notifications setup',        projectId: 'p2', assignee: 'm3', status: 'progress', priority: 'Medium', due: '2026-11-05' },
  { id: 't10', title: 'API integration plan',            projectId: 'p2', assignee: 'm1', status: 'todo',     priority: 'High',   due: '2026-10-27' },

  // --- Marketing Campaign ---
  { id: 't11', title: 'Instagram content calendar',      projectId: 'p3', assignee: 'm2', status: 'done',     priority: 'Medium', due: '2026-10-15' },
  { id: 't12', title: 'Ad banners design',               projectId: 'p3', assignee: 'm5', status: 'todo',     priority: 'Medium', due: '2026-10-16' },
  { id: 't13', title: 'Campaign performance report',     projectId: 'p3', assignee: 'm1', status: 'todo',     priority: 'Low',    due: '2026-10-29' },

  // --- AI Chatbot ---
  { id: 't14', title: 'Chatbot research',                projectId: 'p4', assignee: 'm4', status: 'progress', priority: 'Medium', due: '2026-11-15' },

  // --- Brand Identity ---
  { id: 't15', title: 'Brand guidelines PDF',            projectId: 'p5', assignee: 'm2', status: 'done',     priority: 'Medium', due: '2026-10-09' },
  { id: 't16', title: 'Logo final files',                projectId: 'p5', assignee: 'm2', status: 'done',     priority: 'High',   due: '2026-10-02' },
];