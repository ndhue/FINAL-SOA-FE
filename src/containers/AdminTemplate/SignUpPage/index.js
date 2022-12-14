import Loading from "components/Loading";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory} from "react-router-dom";
import { actResetSignUpMessenger, actSignUp } from "./modules/actions";
import './style.css';
import background1 from "./img/banner.jpg";
import background2 from "./img/content.jpg";
export default function SignUpPage() {
  const formInput = useRef(null);
  const history = useHistory();
  const [info, setInfo] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    gender: "",
    address: "",
  });

  const initialValid = {
    errors: {
      fullname: "",
      email: "",
      username: "",
      password: "",
      phone: "",
      gender: "",
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
    history.goBack();
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
          "^[a-zA-Z_???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????" +
          "???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????" +
          "??????????????????????????????????????????????????????????\\s]+$";
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
        <h1 className="w3ls">????ng k?? th??nh vi??n</h1>
        <div className="content-w3ls">
          <div className="content-agile1" style={{ backgroundImage: `url(${background2})` }}>
            <h2 className="agileits1">DIGITAL ART</h2>
            <p className="agileits2">Tham gia v??o th??? gi???i Digital Art r???ng l???n</p>
          </div>
        <div className="content-agile2">
          <form onSubmit={handleSubmit} ref={formInput}>
            <div className="w3layouts"> 
              <input type="text" id="fullname" name="fullname" placeholder="H??? t??n" title="Nh???p h??? t??n" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.fullname && (
              <div className="alert alert-danger mx-4">{valid.errors.fullname}</div>
              )}
            </div>
            <div className="w3layouts">	
              <input type="email" id="email" name="email" placeholder="mail@example.com" title="Nh???p email" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.email && (
                <div className="alert alert-danger mx-4">
                  {valid.errors.email}
                </div>
              )}
            </div>
            <div className="w3layouts">	
              <input type="text" id="username" name="username" placeholder="T??i kho???n" title="T??i kho???n" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.username && (
                <div className="alert alert-danger mx-4">
                  {valid.errors.username}
                </div>
              )}
            </div>
            <div className="agileinfo">	
              <input type="password" className="lock" name="password" placeholder="M???t kh???u" id="password1" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.password && (
                  <div className="alert alert-danger mx-4">
                    {valid.errors.password}
                  </div>
                )}
            </div>	
            <div className="agileinfo">	
              <input type="password" className="lock" name="password2" placeholder="X??c nh???n m???t kh???u" id="password2" required
              />
              {valid.errors.password && (
                  <div className="alert alert-danger mx-4">
                    {valid.errors.password}
                  </div>
                )}
            </div>
            <div className="w3layouts">	
              <input type="tel" id="phone" name="phone" placeholder="S??? ??i???n tho???i" title="H??y nh???p s??? ??i???n tho???i h???p l???" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.phone && (
                  <div className="alert alert-danger mx-4">
                    {valid.errors.phone}
                  </div>
              )}
            </div>
            <div className="w3layouts">
                <select name="gender" id="gender"
                onChange={handleOnchange}
                onBlur={handleErrors}>
                  <option value="Male">Nam</option>
                  <option value="Female">N???</option>
                  <option value="Other">Kh??c</option>
                </select>
            </div>
            <div className="w3layouts">	
              <input type="text" id="address" name="address"
              className="address" placeholder="?????a ch???" title="H??y nh???p ?????a ch??? h???p l???" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.address && (
                  <div className="alert alert-danger mx-4">
                    {valid.errors.address}
                  </div>
                )}
            </div>			
            <button className="btn btn-sign-up register" type="submit" disabled={!valid.formValid}>
            ????ng k??
          </button>
          </form>
          <div>{handleLoading()}</div>
            <div className="text-center">
              <a className="px-3 mb-2" href="/login">????ng nh???p</a>
              <a className="px-3 mb-2" href="/">Tr??? l???i trang ch???</a>
            </div>
          </div>
        <div className="clear" />
      </div>
    </div>
    </>
  );
}
