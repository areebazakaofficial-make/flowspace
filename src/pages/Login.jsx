import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Login.css';

const Login = () => {
  const { setUser } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('areeba@flowspace.com');
  const [password, setPassword] = useState('123456');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    const name = email.split('@')[0].replace(/[._]/g, ' ');
    setUser({ name: name.charAt(0).toUpperCase() + name.slice(1), email, role: 'Admin' });
    navigate('/');
  };

  return (
    <div className="login-page">
      <motion.div className="login-brand" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <div className="login-logo">
          <span className="login-bolt">⚡</span>
          <h1>Flow<span>Space</span></h1>
        </div>
        <h2>Apne projects,<br />ek jagah manage karo.</h2>
        <ul>
          <li>📊 Real-time dashboard & analytics</li>
          <li>✅ Kanban board with smooth animations</li>
          <li>📅 Calendar & deadlines</li>
          <li>👥 Team workload tracking</li>
        </ul>
        <p className="login-quote">"Stay organized. Stay FlowSpace."</p>
      </motion.div>

      <motion.div className="login-form-side" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome back 👋</h2>
          <p className="login-sub">Sign in to continue to FlowSpace</p>

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" className="btn-emerald login-btn">Sign In →</button>
          <p className="login-hint">Demo app — koi bhi email/password chalega 😄</p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;