import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AdminSidebar.scss";

const menu = [
  {
    label: "Dashboard",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75h-5.25a.75.75 0 01-.75-.75v-4.5h-3v4.5a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"/></svg>
    ),
    path: "/admin/dashboard"
  },
  {
    label: "User Management",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="11" r="3"/></svg>
    ),
    path: "/admin/users"
  },
  {
    label: "Artist Management",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="11" r="3"/></svg>
    ),
    path: "/admin/artists"
  },
  {
    label: "Content Management",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 3h8v4H8z"/></svg>
    ),
    path: "/admin/content"
  },
  {
    label: "Payment Management",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M16 3h-8v4h8z"/></svg>
    ),
    path: "/admin/payments"
  },
  {
    label: "Notifications",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
    ),
    path: "/admin/notifications"
  }
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const handleNav = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__header">
        <div className="admin-sidebar__logo">
          <span className="admin-sidebar__logo-circle">
            <svg width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#1ED760"/><path d="M10 16l4 4 8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <div>
            <div className="admin-sidebar__logo-title">Admin Panel</div>
            <div className="admin-sidebar__logo-desc">Fitcify Management</div>
          </div>
        </div>
      </div>
      <div className="admin-sidebar__section-title">FITCIFY MANAGEMENT</div>
      <nav className="admin-sidebar__nav">
        <ul>
          {menu.map((item) => (
            <li
              key={item.label}
              className={`admin-sidebar__menu-parent${isActive(item.path) ? " active" : ""}`}
              onClick={() => handleNav(item.path)}
              tabIndex={0}
              role="button"
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleNav(item.path)}
            >
              <span className="admin-sidebar__icon">{item.icon}</span>
              <span className="admin-sidebar__label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="admin-sidebar__footer">
        <div
          className={isActive("/admin/settings") ? "admin-sidebar__settings active" : "admin-sidebar__settings"}
          onClick={() => handleNav("/admin/settings")}
          tabIndex={0}
          role="button"
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleNav("/admin/settings")}
        >
          <span className="admin-sidebar__icon">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          </span>
          <span className="admin-sidebar__label">Settings</span>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
