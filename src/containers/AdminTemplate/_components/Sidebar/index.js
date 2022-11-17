import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './style.css';

export default function AdminSidebar() {
  const history = useHistory();
  const handleLogout = () => {
    if (window.confirm("Logout?")) {
      localStorage.removeItem("UserInfo");
      history.replace("./");
    }
  }

  return (
    <div className="sidebar">
      <h5 className='text-center pt-3 dashboard'>Dashboard</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/">Homepage</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/user-page">Admin Info</Link>
        </li>
        <div className='my-4'>
          <li className="nav-item">
            <NavLink activeClassName='sidebar-active' className="nav-link" to="/users-management">Users Management</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName='sidebar-active' className="nav-link" to="/products-management">Products Management</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName='sidebar-active' className="nav-link" to="/catalog-management">Catalog Management</NavLink>
          </li>
        </div>
        <button className="btn btn-log-out" onClick={handleLogout}>Logout</button>
      </ul>
    </div>
  )
}