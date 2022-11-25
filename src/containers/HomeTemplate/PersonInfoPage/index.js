import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actFetchUsersDataByID, actEditUsersDataByID } from './modules/actions';
import './style.css';
export default function PersonInfoPage(props) {

  const dispatch = useDispatch();
  const userId = props.match.params.id;
  const data = useSelector(state => state.usersInfoManagementReducer.data);

  const [userInfo, setUserInfo] = useState('');
  const [method, setMethod] = useState("");
  useEffect(() => {
    dispatch(actFetchUsersDataByID(userId));
  }, []);
  useEffect(() => {
    setUserInfo(data);
  }, [data]);

  const initialState = {
    fullname: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    gender: "",
    address: "",
    role: "",
  };

  const initialValid = {
    errors: {
      fullname: "",
      email: "",
      username: "",
      password: "",
      phone: "",
      gender: "",
      address: "",
      role: "",
    },
    formValid: false,
    fullnameValid: false,
    emailValid: false,
    usernameValid: false,
    passwordValid: false,
    phoneValid: false,
    address: false,
  };
  const [valid, setValid] = useState({ ...initialValid });
  const [state, setState] = useState({ ...initialState });

  const handleResetForm = () => {
    if (userInfo) {
      
      setState({
        fullname: userInfo.fullname,
        email: userInfo.email,
        username: userInfo.username,
        phone: userInfo.phone,
        gender: userInfo.gender,
        address: userInfo.address,
        role: userInfo.role,
      });
    } else {
      setState({ ...initialState });
      setValid({...initialValid});
    }
  };

  useEffect(() => {
    handleResetForm();
  }, [userInfo]);

  const handleOnchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(actEditUsersDataByID(state, method, userId));
    refresh();
  };

  const handleErrors = (event) => {
    const { name, value } = event.target;
    let mess = value.trim() === "" ? "Please enter your " + name : "";
    let {
      fullnameValid,
      emailValid,
      usernameValid,
      phoneValid,
      addressValid,
      formValid,
    } = valid;
    switch (name) {
      case "fullname": {
        fullnameValid = mess === "" ? true : false;
        let pattern =
          "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";
        if (value && !value.match(pattern)) {
          fullnameValid = false;
          mess = "Your name seems invalid";
        } else {
          fullnameValid = true;
        }
        break;
      }
      case "email": {
        emailValid = mess === "" ? true : false;
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value && !value.match(pattern)) {
          emailValid = false;
          mess = "Your email seems invalid";
        } else {
          emailValid = true;
        }
        break;
      }
      case "username": {
        usernameValid = mess === "" ? true : false;
        break;
      }
      case "phone": {
        phoneValid = mess === "" ? true : false;
        let pattern =
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (value && !value.match(pattern)) {
          phoneValid = false;
          mess = "Your phone seems invalid";
        } else {
          phoneValid = true;
        }
        break;
      }
      case "address": {
        addressValid = mess === "" ? true : false;
        break;
      }
      default:
        break;
    }
    formValid =
      fullnameValid & emailValid & usernameValid & phoneValid & addressValid;
    setValid({
      formValid,
      fullnameValid,
      emailValid,
      usernameValid,
      phoneValid,
      addressValid,
      errors: { ...valid.errors, [name]: mess },
    });
  };

  const refresh = () => {
    window.location.reload();
  }
  if(userInfo){
  return (
    <div>
      <div className='user-profile'>
        <div className="main-content">
          {/* Top navbar */}
          <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
            <div className="container-fluid">
              {/* Brand */}
              <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="" target="_blank">User profile</a>
              {/* User */}
              <ul className="navbar-nav align-items-center d-none d-md-flex">
                <li className="nav-item dropdown">
                  <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div className="media align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img alt="Image placeholder" src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg" />
                      </span>
                      <div className="media-body ml-2 d-none d-lg-block">
                        <span className="mb-0 text-sm  font-weight-bold">Jessica Jones</span>
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                    <div className=" dropdown-header noti-title">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </div>
                    <a href="../examples/profile.html" className="dropdown-item">
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </a>
                    <a href="../examples/profile.html" className="dropdown-item">
                      <i className="ni ni-settings-gear-65" />
                      <span>Settings</span>
                    </a>
                    <a href="../examples/profile.html" className="dropdown-item">
                      <i className="ni ni-calendar-grid-58" />
                      <span>Activity</span>
                    </a>
                    <a href="../examples/profile.html" className="dropdown-item">
                      <i className="ni ni-support-16" />
                      <span>Support</span>
                    </a>
                    <div className="dropdown-divider" />
                    <a href="#!" className="dropdown-item">
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          {/* Header */}
          <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{minHeight: 600, backgroundImage: 'url(https://raw.githubusercontent.com/creativetimofficial/argon-dashboard/gh-pages/assets-old/img/theme/profile-cover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
            {/* Mask */}
            <span className="mask bg-gradient-default opacity-8" />
            {/* Header container */}
            <div className="container-fluid d-flex align-items-center">
              <div className="row">
                <div className="col-lg-7 col-md-10">
                  <h1 className="display-2 text-white">Hello Jesse</h1>
                  <p className="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
                  <button className="btn btn-info" onClick={() => {
                      setMethod("EDIT");}}>Edit profile</button>
                </div>
              </div>
            </div>
          </div>
          {/* Page content */}
          <div className="container-fluid mt--7">
            <div className="row">
              <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                <div className="card card-profile shadow">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 order-lg-2">
                      <div className="card-profile-image">
                        <a href="#">
                          <img src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg" className="rounded-circle" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    <div className="d-flex justify-content-between">
                      <a href="#" className="btn btn-sm btn-info mr-4">Connect</a>
                      <a href="#" className="btn btn-sm btn-default float-right">Message</a>
                    </div>
                  </div>
                  <div className="card-body pt-0 pt-md-4">
                    <div className="row">
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                          <div>
                            <span className="heading">22</span>
                            <span className="description">Friends</span>
                          </div>
                          <div>
                            <span className="heading">10</span>
                            <span className="description">Photos</span>
                          </div>
                          <div>
                            <span className="heading">89</span>
                            <span className="description">Comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3>{state.fullname}</h3>
                      <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" />{state.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8 order-xl-1">
                <div className="card bg-secondary shadow">
                  <div className="card-header bg-white border-0">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h3 className="mb-0">My account</h3>
                      </div>
                      <div className="col-4 text-right">
                        <a href="#!" className="btn btn-sm btn-primary">Settings</a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleOnSubmit}>
                      <h6 className="heading-small text-muted mb-4">User information</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-username">Username</label>
                              <input type="text" id="input-username" className="form-control form-control-alternative" placeholder="Username" name="username"
                              value={state.username ?? ''} disabled={method==='EDIT'?false:true}
                              onChange={handleOnchange}
                              onBlur={handleErrors}/>
                            </div>
                            {valid.errors.username && (
                              <div className="alert alert-danger mt-2">
                              {valid.errors.username}
                              </div>
                            )}
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="form-control-label" htmlFor="input-email">Email address</label>
                              <input type="email" id="input-email" className="form-control form-control-alternative" name="email" value={state.email ?? ''} disabled={method==='EDIT'?false:true}
                              onChange={handleOnchange}
                              onBlur={handleErrors}/>
                            </div>
                            {valid.errors.email && (
                              <div className="alert alert-danger mt-2">
                              {valid.errors.email}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-first-name">Full name</label>
                              <input type="text" id="input-first-name" className="form-control form-control-alternative" placeholder="First name" name="fullname" value={state.fullname ?? ''} disabled={method==='EDIT'?false:true}
                              onChange={handleOnchange}
                              onBlur={handleErrors}/>
                            </div>
                            {valid.errors.fullname && (
                              <div className="alert alert-danger mt-2">
                              {valid.errors.fullname}
                              </div>
                            )}
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-last-name">Role</label>
                              <input type="text" id="input-last-name" className="form-control form-control-alternative" placeholder="Last name" name="role" value={state.role ?? ''} disabled/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                      {/* Address */}
                      <h6 className="heading-small text-muted mb-4">Contact information</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-address">Address</label>
                              <input id="input-address" className="form-control form-control-alternative" placeholder="Home Address" defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" type="text" value={state.address ?? ''} disabled={method==='EDIT'?false:true}
                              onChange={handleOnchange}
                              onBlur={handleErrors}/>
                            </div>
                            {valid.errors.address && (
                              <div className="alert alert-danger mt-2">
                              {valid.errors.address}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="row">
                        <div className="col-md-12">
                            <div className="form-group focused">
                              <label className="form-control-label" htmlFor="input-address">Phone</label>
                              <input id="input-address" className="form-control form-control-alternative" placeholder="Home Address" defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" type="text" value={state.phone ?? ''} disabled={method==='EDIT'?false:true}
                              onChange={handleOnchange}
                              onBlur={handleErrors}/>
                            </div>
                            {valid.errors.phone && (
                              <div className="alert alert-danger mt-2">
                              {valid.errors.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                      {/* Description */}
                      <h6 className="heading-small text-muted mb-4">Order History</h6>
                      <div className="pl-lg-4">
                        <div className="form-group focused">
                          <label>About Me</label>
                          <textarea rows={4} className="form-control form-control-alternative" placeholder="A few words about you ..." defaultValue={"A beautiful Dashboard for Bootstrap 4. It is Free and Open Source."} />
                        </div>
                      </div>
                      
                      <div className="container">
                        <button className='btn btn-success' disabled={method==='EDIT'?false:true}>Lưu</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
  return (
    <></>
  )
}
