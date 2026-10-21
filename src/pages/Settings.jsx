import { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Settings.css';

const Settings = () => {
  const { user, setUser, resetData } = useApp();
  const [form, setForm] = useState({ name: user.name, email: user.email, role: user.role });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-sub">Profile and account settings</p>
      </div>

      <div className="set-grid">
        <div className="card panel">
          <h3>Profile</h3>
          <div className="set-profile-row">
            <div className="avatar big">{form.name.charAt(0)}</div>
            <div>
              <p className="set-name">{user.name}</p>
              <span className="set-role">{user.role}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

            <label>Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option>Admin</option>
              <option>Manager</option>
              <option>Developer</option>
              <option>Designer</option>
            </select>

            <button type="submit" className="btn-emerald set-save">Save Changes</button>
            {saved && <span className="set-saved">✓ Saved!</span>}
          </form>
        </div>

        <div className="card panel">
          <h3>Preferences</h3>
          <p className="set-pref-text">
           Want the original demo back? Resetting will restore all projects and tasks to their initial demo state.
          </p>
          <button className="btn-ghost" onClick={() => resetData()}>↺ Reset Demo Data</button>

          <h3 className="set-gap">Danger Zone</h3>
          <p className="set-pref-text">
            This button clears all saved data (localStorage) — the app will start completely fresh.
          </p>
          <button
            className="btn-ghost set-danger"
            onClick={() => { localStorage.clear(); location.reload(); }}
          >
            Clear All Local Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;