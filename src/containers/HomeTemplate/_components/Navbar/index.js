import './style.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { actFetchJobTypes } from './modules/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import logo from './img/logo.png';
export default function NavbarHome() {
  const history = useHistory();
  const searchInput = useRef(null);
  const [isLogin, setIsLogin] = useState(localStorage.getItem("UserInfo") ? true : false);
  const dispatch = useDispatch();

  const selectALl = items => { return document.querySelectorAll(items) };
  const select = dom => { return document.querySelector(dom) }

  useEffect(() => {
    dispatch(actFetchJobTypes());
  }, []);


  const handleOnChange = (e) => {
    localStorage.setItem("job-keyword", JSON.stringify(e.target.value.trim()));
  }

  const handleRenderLoginSpace = () => {
    if (localStorage.getItem("UserInfo") && JSON.parse(localStorage.getItem("UserInfo")).user.role === "Admin") {
      return (
        <>
          <Link className="nav-link m-1 btn-join m-auto px-3" style={{ cursor: "pointer" }} onClick={() => {
            if (window.confirm("Logout?")) {
              localStorage.removeItem("UserInfo");
              setIsLogin(false);
            }
          }}>Logout</Link>
          <li className="nav-item">
            <Link className="nav-link btn btn-join text-white ml-1" to="/users-management">Dashboard</Link>
          </li>
        </>
      )
    } else if (localStorage.getItem("UserInfo") && JSON.parse(localStorage.getItem("UserInfo")).user.role === "Customer") {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/user-page" >User Info</Link>
          </li>
          <Link className="nav-link px-1" style={{ cursor: "pointer" }} onClick={() => {
            if (window.confirm("Logout?")) {
              localStorage.removeItem("UserInfo");
              setIsLogin(false);
            }
          }}>Logout</Link>
        </>
      )
    } else {
      return (
        <><div className="collapse navbar-collapse" id="navbarNav">
          <li className="nav-item">
            <Link className="nav-link" to="/login" >Đăng nhập</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn btn-primary text-white px-3 ml-1 btn-join" to="/signup" >Đăng ký</Link>
          </li>
          </div>
        </>
      )
    }
  };

  const handleNavPosition = () => {
    if (document.documentElement.scrollTop > -100 && document.documentElement.scrollTop < 100) {
      select("#navbar-home")?.classList.add("navbar-transparent");
      selectALl(".nav-top .nav-link")?.forEach(nav => nav.classList.add("color-white"));
      select("#svgId")?.classList.add("svg-white");
    } else if (document.body.scrollTop || document.documentElement.scrollTop >= 100 && document.documentElement.scrollTop < 200) {
      select("#navbar-home")?.classList.remove("navbar-transparent");
      selectALl(".nav-top .nav-link")?.forEach(nav => nav.classList.remove("color-white"));
      select("#svgId")?.classList.remove("svg-white");
      selectALl(".navbar-home>hr").forEach(hr => hr.classList.add("d-none"));
      select(".navbar-search")?.classList.add("d-none");
      selectALl(".nav-bottom .nav-link")?.forEach(link => link.classList.add("disabled"));
      select(".nav-bottom")?.classList.add("nav-collapse");
      select(".nav-bottom")?.classList.remove("nav-show");
    } else if (document.body.scrollTop || document.documentElement.scrollTop >= 200) {
      select("#navbar-home")?.classList.remove("navbar-transparent");
      selectALl(".nav-top .nav-link")?.forEach(nav => nav.classList.remove("color-white"));
      select("#svgId")?.classList.remove("svg-white");
      selectALl(".navbar-home>hr").forEach(hr => hr.classList.remove("d-none"));
      select(".navbar-search")?.classList.remove("d-none");
      selectALl(".nav-bottom .nav-link")?.forEach(link => link.classList.remove("disabled"));
      select(".nav-bottom")?.classList.remove("nav-collapse");
      select(".nav-bottom")?.classList.add("nav-show");
    }
  }

  if (history.location.pathname == "/") {
    select("#navbar-home")?.classList.add("navbar-home", "navbar-transparent");
    selectALl(".nav-top .nav-link")?.forEach(nav => nav.classList.add("color-white"));
    select("#svgId")?.classList.add("svg-white");
    selectALl(".navbar-home>hr").forEach(hr => hr.classList.add("d-none"));
    select(".navbar-search")?.classList.add("d-none");
    selectALl(".nav-bottom .nav-link")?.forEach(link => link.classList.add("disabled"));
    select(".nav-bottom")?.classList.add("nav-collapse");
    handleNavPosition();
  }

  window.onscroll = () => {
    if (history.location.pathname == "/") {
      handleNavPosition();
    }
  }

  window.onbeforeunload = () => {
    document.documentElement.scrollTo({ top: 0 });
  };

  return (
    <div id='navbar-home'>
      <div className='container'>
        <nav className="navbar navbar-expand-lg nav-top">
          <div className='d-flex'>
            <NavLink className="navbar-brand" to="/">
                <img src={logo} alt="logo" />
                <h3 className='font-weight-bold'>DIGITAL ART</h3>
            </NavLink>
            <form className="form-inline my-2 my-lg-0 navbar-search">
              <input className="form-control mr-sm-2" style={{ minWidth: 200 }} type="search" placeholder={localStorage.getItem("job-keyword") ? JSON.parse(localStorage.getItem("job-keyword")) : "Find Services"} aria-label="Search" onChange={handleOnChange} ref={searchInput} />
              <button className="btn btn-outline-success" type='submit'>Search</button>
            </form>
          </div>
          <div className='d-flex'>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" >Trang chủ</NavLink>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/shop-art" >Cửa hàng</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart/2" >Giỏ hàng</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/be-seller" >Trở thành người bán</Link>
                </li>
              </ul>
            </div>
            <ul className="navbar-nav mr-auto">
              {handleRenderLoginSpace()}
            </ul>
          </div>
        </nav>
      </div >
      <hr />
    </div>
  )
}