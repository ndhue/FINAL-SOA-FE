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
      <h5 className='text-center pt-3 dashboard'>Bảng điều khiển</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/">Trang chủ</Link>
        </li>
        <div className='my-4'>
          <li className="nav-item">
            <NavLink activeClassName='sidebar-active' className="nav-link" to="/users-management">Quản lý nhân viên</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName='sidebar-active' className="nav-link" to="/products-management">Quản lý sản phẩm</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName='sidebar-active' className="nav-link" to="/seller-management">Seller Management</NavLink>
          </li>
        </div>
        <button className="btn btn-log-out" onClick={handleLogout}>Đăng xuất</button>
      </ul>
    </div>
  )
}