import Loading from "components/Loading";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { actResetSignUpMessenger, actSignUp } from "./modules/actions";
import './style.css';
import background1 from "./img/banner.jpg";
import background2 from "./img/content.jpg";
export default function SignUpPage() {
  const formInput = useRef(null);

  const [info, setInfo] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    gender: false, //?
    address: "",
  });

  const initialValid = {
    errors: {
      fullname: "",
      email: "",
      username: "",
      password: "",
      phone: "",
      gender: false, //?
      address: "",
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

  const handleOnchange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    return () => {
      dispatch(actResetSignUpMessenger());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actSignUp(info));
    formInput.current.reset();
  };

  const dispatch = useDispatch();
  const message = useSelector((state) => state.signUpReducer.message);
  const loading = useSelector((state) => state.signUpReducer.loading);

  const handleLoading = () => {
    if (loading) {
      return <Loading />;
    }
    return message && <div className="alert alert-danger mt-3">{message}</div>;
  };

  const handleErrors = (event) => {
    const { name, value } = event.target;
    let mess = value.trim() === "" ? "Please enter your " + name : "";
    let {
      fullnameValid,
      emailValid,
      usernameValid,
      passwordValid,
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
      case "password": {
        passwordValid = mess === "" ? true : false;
        let pattern = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
        if (value && !value.match(pattern)) {
          passwordValid = false;
          mess = "Your password seems invalid";
        } else {
          passwordValid = true;
        }
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
      fullnameValid & emailValid & usernameValid & passwordValid & phoneValid & addressValid;
    setValid({
      formValid,
      fullnameValid,
      emailValid,
      usernameValid,
      passwordValid,
      phoneValid,
      addressValid,
      errors: { ...valid.errors, [name]: mess },
    });
  };

  if (localStorage.getItem("UserInfo")) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <>
      <div className="body-signup" style={{ backgroundImage: `url(${background1})` }}>
        <h1 className="w3ls">Official Signup Form</h1>
        <div className="content-w3ls">
          <div className="content-agile1" style={{ backgroundImage: `url(${background2})` }}>
            <h2 className="agileits1">Official</h2>
            <p className="agileits2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        <div className="content-agile2">
          <form onSubmit={handleSubmit} ref={formInput}>
            <div className="w3layouts"> 
              <input type="text" id="fullname" name="fullname" placeholder="Full name" title="Please enter your Name" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.fullname && (
              <div className="alert alert-danger mt-2">{valid.errors.fullname}</div>
              )}
            </div>
            <div className="w3layouts">	
              <input type="email" id="email" name="email" placeholder="mail@example.com" title="Please enter a valid email" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.email && (
                <div className="alert alert-danger mt-2">
                  {valid.errors.email}
                </div>
              )}
            </div>
            <div className="w3layouts">	
              <input type="text" id="username" name="username" placeholder="username" title="Please enter a valid username" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.username && (
                <div className="alert alert-danger mt-2">
                  {valid.errors.username}
                </div>
              )}
            </div>
            <div className="agileinfo">	
              <input type="password" className="lock" name="password" placeholder="Password" id="password1" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.password && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.password}
                  </div>
                )}
            </div>	
            <div className="agileinfo">	
              <input type="password" className="lock" name="confirm-password" placeholder="Confirm Password" id="password2" required />
            </div>
            <div className="w3layouts">	
              <input type="tel" id="phone" name="phone" placeholder="0123456789" title="Please enter a valid number" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.phone && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.phone}
                  </div>
              )}
            </div>
            <div className="w3layouts">
                <select name="gender" id="gender"
                onChange={handleOnchange}
                onBlur={handleErrors}>
                  <option>Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
            </div>
            <div className="w3layouts">	
              <input type="text" id="address" name="address"
              className="address" placeholder="Address" title="Please enter a valid address" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.address && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.address}
                  </div>
                )}
            </div>			
            <button className="btn btn-sign-up register" type="submit" disabled={!valid.formValid}>
            Sign Up
          </button>
          </form>
          <div>{handleLoading()}</div>
            <div className="text-center mt-3">
              <Link className="p-3" to="/login">
                Login
              </Link>
              <Link className="p-3" to="/">
                Back to Homepage
              </Link>
            </div>
          </div>
        <div className="clear" />
      </div>
    </div>
    </>
  );
}
