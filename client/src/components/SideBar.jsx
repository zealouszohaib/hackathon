import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

function SideBar() {
  const location = useLocation();

  const navItems = [
    { to: '/home', icon: 'bi-house', label: 'Dashboard' },
    { to: '/upload', icon: 'bi-upload', label: 'Upload Image' },
    { to: '/demage-analysis', icon: 'bi-graph-up', label: 'Damage Analysis' },
    { to: '/reports', icon: 'bi-file-earmark-bar-graph', label: 'Reports' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className="d-flex flex-column vh-100 p-3 shadow-sm bg-white border-end"
      style={{ width: '250px', overflowY: 'auto' }}
    >
      {/* Logo & Title */}
      <div className="text-center mb-4">
        <Link
          to="/home"
          className="text-decoration-none d-flex align-items-center justify-content-center gap-2"
        >
          <img src={logo} alt="Logo" style={{ width: '180px' }} />
        </Link>
      </div>

      <hr />

      <Nav className="flex-column">

        {navItems.map(({ to, icon, label }, index) => (
          <Link
            key={index}
            to={to}
            className={`nav-link d-flex align-items-center px-3 py-2 rounded mb-1 ${
              isActive(to) ? 'bg-primary text-white shadow-sm' : 'text-dark'
            }`}
            style={{
              transition: 'all 0.2s ease-in-out',
              fontWeight: isActive(to) ? '600' : 'normal',
            }}
          >
            <i className={`bi ${icon} me-2 fs-5`}></i>
            <span>{label}</span>
          </Link>
        ))}
      </Nav>
    </div>
  );
}

export default SideBar;
