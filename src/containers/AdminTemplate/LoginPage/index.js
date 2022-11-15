import Loading from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actLogin, actLoginReset } from './modules/actions';
import { Redirect } from 'react-router-dom';
import './style.css';
import arrow from './img/arrow.png';
export default function LoginPage(props) {
  const [info, setInfo] = useState({
    email: "",
    password: ""
  });

  const loading = useSelector(state => state.userLoginReducer.loading);
  const error = useSelector(state => state.userLoginReducer.error);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(actLoginReset());
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(actLogin(info, props.history));
  };

  const handleOnChange = e => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const notifications = () => {
    if (loading) {
      return <Loading />
    }
    return error && <div className='alert alert-danger mt-3'>{error}</div>
  }

  if (localStorage.getItem("UserInfo")) {
    return <Redirect to="/"></Redirect>
  }
  return (
    <div className="body-login container">
      <div className="main-container">
        {/*header*/}
        <div className="header-w3l">
          <h1>Modern Login Form</h1>
        </div>
        {/*//header*/}
        {/*main*/}
        <div className="main-content-agile">
          <div className="w3ls-pro">
            <h2>Login Now</h2>
          </div>
          <div className="sub-main-w3ls">	
            <form action="#" method="post">
              <input placeholder="Enter your E-mail" name="enter mail" type="email" required />
              <span className="icon1"><i className="fa fa-envelope" aria-hidden="true" /></span>
              <input placeholder="Enter Password" name="Password" type="password" required />
              <span className="icon2"><i className="fa fa-unlock-alt" aria-hidden="true" /></span>
              <div className="checkbox-w3">
                <span className="check-w3"><input type="checkbox" />Remember Me</span>
                <a href="#">Forgot Password?</a>
                <div className="clear" />
              </div>
              <div className="social-icons"> 
                <ul>
                  <li><a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a></li>
                  <li><a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
                  <li><a href="#"><i className="fa fa-google-plus" aria-hidden="true" /></a></li> 
                </ul>  
              </div>
              <input type="submit" defaultValue style={{ backgroundImage: `url(${arrow}) no-repeat 40% 50%` }}/>
            </form>
          </div>
        </div>
        {/*//main*/}
      </div>
    </div>
  )
}