import React, { useState } from 'react';
import { FiSearch, FiBell, FiUser, FiSettings, FiCalendar } from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
  const [notifications] = useState([
    { id: 1, text: 'New candidate application', unread: true },
    { id: 2, text: 'Interview scheduled for tomorrow', unread: true },
    { id: 3, text: 'Meeting reminder: Team sync', unread: false },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav className="ur-navbar">
      {/* Search Box */}
      <div className="search-box">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search employees, reports..." aria-label="Search" />
      </div>

      {/* Action Icons */}
      <div className="nav-actions">
        {/* Calendar */}
        <div className="calendar-wrapper">
          <button className="icon-button" aria-label="Calendar">
            <FiCalendar />
          </button>
        </div>

        {/* Notifications */}
        <div className="notification-wrapper">
          <button
            className="icon-button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <FiBell />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="dropdown notifications-dropdown">
              <h3>Notifications</h3>
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={"notification-item " + (notification.unread ? 'unread' : '')}
                  >
                    <p>{notification.text}</p>
                    {notification.unread && <span className="unread-dot" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="profile-wrapper">
          <button
            className="icon-button profile-button"
            onClick={() => setShowProfile(!showProfile)}
            aria-label="User menu"
          >
            <FiUser />
          </button>

          {showProfile && (
            <div className="dropdown profile-dropdown">
              <div className="profile-header">
                <FiUser className="profile-avatar" />
                <div className="profile-info">
                  <h4>Admin User</h4>
                  <small>admin@urhrm.com</small>
                </div>
              </div>
              <div className="profile-menu">
                <button className="menu-item">
                  <FiUser />
                  <span>My Profile</span>
                </button>
                <button className="menu-item">
                  <FiSettings />
                  <span>Settings</span>
                </button>
                <button className="menu-item logout">
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
