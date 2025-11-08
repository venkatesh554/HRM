import React, { useState, useEffect } from 'react';
import "./EmployeeSidebar.css";

import { FaTachometerAlt, FaUser, FaCalendarCheck, FaRegFileAlt, FaMoneyBillAlt, FaChartLine, FaSignOutAlt, FaBars } from 'react-icons/fa';

const menu = [
  { key: 'dashboard', label: 'Dashboard', Icon: FaTachometerAlt },
  { key: 'profile', label: 'My Profile', Icon: FaUser },
  { key: 'attendance', label: 'Attendance', Icon: FaCalendarCheck },
  { key: 'leave', label: 'Leave Requests', Icon: FaRegFileAlt },
  { key: 'payroll', label: 'Payroll', Icon: FaMoneyBillAlt },
  { key: 'performance', label: 'Performance', Icon: FaChartLine },
];

export default function EmployeeSidebar({ onNavigate, onLogout }) {
  const [active, setActive] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('has-employee-sidebar');

    if (collapsed) {
      document.documentElement.classList.add('employee-sidebar-collapsed');
    } else {
      document.documentElement.classList.remove('employee-sidebar-collapsed');
    }

    return () => {
      document.documentElement.classList.remove('employee-sidebar-collapsed');
      document.documentElement.classList.remove('has-employee-sidebar');
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
    // prefer explicit logout handler, otherwise notify parent via onNavigate
    if (typeof onLogout === 'function') {
      onLogout();
      return;
    }

    if (onNavigate) {
      onNavigate('logout');
    } else {
      // fallback behaviour: log to console (integrate real logout as needed)
      // eslint-disable-next-line no-console
      console.log('Logout requested');
    }
  }

  return (
    <aside className={"employee-sidebar " + (collapsed ? 'employee-collapsed' : '')}>
      <div className="employee-sidebar-top">
        <button
          className="employee-collapse-btn"
          onClick={() => setCollapsed(c => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <FaBars />
        </button>

        <div className="employee-brand" title="UR HRM - Employee Portal">
          <div className="employee-logo" aria-hidden="true">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#FFD166" />
                  <stop offset="100%" stopColor="#FF7A7A" />
                </linearGradient>
              </defs>
              <rect width="42" height="42" rx="10" fill="url(#g1)" />
              <text x="21" y="26" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="14" fill="#fff">UR</text>
            </svg>
          </div>

          {!collapsed && <h2 className="employee-brand-text">Employee Portal</h2>}
        </div>
      </div>

      <nav className="employee-menu" role="navigation" aria-label="Main menu">
        <ul>
          {menu.map(({ key, label, Icon }) => (
            <li key={key} className={active === key ? 'employee-active' : ''}>
              <button onClick={() => handleClick(key)} className="employee-menu-item">
                <span className="employee-icon-wrap"><Icon /></span>
                {!collapsed && <span className="employee-label">{label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="employee-sidebar-footer">
        <button className="employee-menu-item employee-logout-btn" onClick={handleLogout} title="Sign out">
          <span className="employee-icon-wrap"><FaSignOutAlt /></span>
          {!collapsed && <span className="employee-label">Sign Out</span>}
        </button>
        <div className="employee-footer-info">
          {!collapsed ? (
            <small>Logged in as <strong>Employee</strong></small>
          ) : (
            <span className="employee-tiny">E</span>
          )}
        </div>
      </div>
    </aside>
  );
}