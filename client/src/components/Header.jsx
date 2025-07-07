import React, { useContext } from 'react';
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';

const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <Navbar
      bg="white"
      className="px-4 shadow-sm border-bottom d-flex justify-content-between"
      expand="lg"
    >
      {/* Left Section */}
      <div className="d-flex align-items-center">
        <i className="bi bi-list fs-4 text-primary cursor-pointer"></i>
      </div>

      {/* Right Section */}
      <Nav className="d-flex align-items-center">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            className="d-flex align-items-center border-0 p-0 bg-transparent"
          >
           
            <span className="fw-semibold text-dark">Profile</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow-sm mt-2">
           
            <Dropdown.Divider />
            <Dropdown.Item as="button" onClick={handleLogout} className="text-danger">
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default Header;
