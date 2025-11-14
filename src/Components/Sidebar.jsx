import React, { useState, useEffect } from 'react';
import './Sidebar.new.css';
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillAlt,
  FaCalendarCheck,
  FaRegFileAlt,
  FaUserPlus,
  FaChalkboardTeacher,
  FaCog,
  FaSignOutAlt,
  FaBars
} from 'react-icons/fa';

const menu = [
  { key: 'dashboard', label: 'Dashboard', Icon: FaTachometerAlt },
  { key: 'employees', label: 'Employees', Icon: FaUsers },
  { key: 'payroll', label: 'Payroll', Icon: FaMoneyBillAlt },
  { key: 'attendance', label: 'Attendance', Icon: FaCalendarCheck },
  { key: 'leave-management', label: 'Leave Management', Icon: FaRegFileAlt },
  { key: 'Recruitment', label: 'Recruitment', Icon: FaUserPlus },
  { key: 'Trainings', label: 'Trainings', Icon: FaChalkboardTeacher },
  { key: 'Settings', label: 'Settings', Icon: FaCog },
  
];

export default function Sidebar({ onNavigate, onLogout }) {
  const [active, setActive] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('has-sidebar');
    if (collapsed) {
      document.documentElement.classList.add('sidebar-collapsed');
    } else {
      document.documentElement.classList.remove('sidebar-collapsed');
    }

    return () => {
      document.documentElement.classList.remove('sidebar-collapsed');
      document.documentElement.classList.remove('has-sidebar');
    };
  }, [collapsed]);

  function handleClick(key) {
    if (collapsed) {
      setCollapsed(false);
      return;
    }
    setActive(key);
    if (onNavigate) onNavigate(key);
  }

  function handleLogout() {
    if (typeof onLogout === 'function') {
      onLogout();
      return;
    }

    if (onNavigate) {
      onNavigate('logout');
    } else {
      console.log('Logout requested');
    }
  }

  return (
    <aside className={`ur-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Top */}
      <div className="sidebar-top">
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(c => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <FaBars />
        </button>

        <div className="brand" title="UR HRM">
          <div className="logo" aria-hidden="true">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#FFD166" />
                  <stop offset="100%" stopColor="#FF7A7A" />
                </linearGradient>
              </defs>
              <rect width="42" height="42" rx="10" fill="url(#g1)" />
              <text x="21" y="26" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="14" fill="#fff">
                UR
              </text>
            </svg>
          </div>
          {!collapsed && <h2 className="brand-text">UR HRM</h2>}
        </div>
      </div>

      {/* Menu */}
      <nav className="menu" role="navigation" aria-label="Main menu">
        <ul>
          {menu.map(({ key, label, Icon }) => (
            <li key={key} className={active === key ? 'active' : ''}>
              <button onClick={() => handleClick(key)} className="menu-item">
                <span className="icon-wrap"><Icon /></span>
                {!collapsed && <span className="label">{label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="menu-item logout-btn" onClick={handleLogout} title="Sign out">
          <span className="icon-wrap"><FaSignOutAlt /></span>
          {!collapsed && <span className="label">Sign Out</span>}
        </button>

        <div className="footer-info">
          {!collapsed ? (
            <small>Logged in as <strong>Admin</strong></small>
          ) : (
            <span className="tiny">A</span>
          )}
        </div>
      </div>
    </aside>
  );
}
