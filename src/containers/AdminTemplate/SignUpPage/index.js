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
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    skill: [],
    certification: [],
    gender: false, //?
    type: "CLIENT",
  });

  const initialValid = {
    errors: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      skill: [],
      certification: [],
    },
    formValid: false,
    nameValid: false,
    emailValid: false,
    passwordValid: false,
    phoneValid: false,
    birthdayValid: false,
    skillValid: false,
    certificationValid: false,
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
      nameValid,
      emailValid,
      passwordValid,
      phoneValid,
      birthdayValid,
      formValid,
    } = valid;
    switch (name) {
      case "name": {
        nameValid = mess === "" ? true : false;
        let pattern =
          "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
          "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
          "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";
        if (value && !value.match(pattern)) {
          nameValid = false;
          mess = "Your name seems invalid";
        } else {
          nameValid = true;
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
      case "password": {
        passwordValid = mess === "" ? true : false;
        let pattern =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
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
      case "birthday": {
        birthdayValid = mess === "" ? true : false;
        let pattern =
          /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        if (value && value.match(pattern)) {
          birthdayValid = false;
          mess = "Your birthday seems invalid";
        } else {
          birthdayValid = true;
        }
        break;
      }
      default:
        break;
    }
    formValid =
      nameValid & emailValid & passwordValid & phoneValid & birthdayValid;
    setValid({
      formValid,
      nameValid,
      emailValid,
      passwordValid,
      phoneValid,
      birthdayValid,
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
          <form action="#" method="post">
            <div className="w3layouts"> 
              <input type="text" id="fullname" name="fullname" placeholder="Full name" title="Please enter your Name" required />
            </div>
            <div className="w3layouts">	
              <input type="email" id="email" name="email" placeholder="mail@example.com" title="Please enter a valid email" required />
            </div>
            <div className="w3layouts">	
              <input type="text" id="username" name="useremail" placeholder="username" title="Please enter a valid username" required />
            </div>
            <div className="agileinfo">	
              <input type="password" className="lock" name="password" placeholder="Password" id="password1" required />
            </div>	
            <div className="agileinfo">	
              <input type="password" className="lock" name="confirm-password" placeholder="Confirm Password" id="password2" required />
            </div>
            <div className="w3layouts">	
              <input type="tel" id="phone" name="phone" placeholder="0123456789" title="Please enter a valid number" required />
            </div>
            <div className="w3layouts row mx-5">
              <div className="col-6">
                <select name="role" id="role">
                  <option>Role</option>
                  <option value="customer">Customer</option>
                  <option value="artist">Artist</option>
                </select>
              </div>
              <div className="col-6">
                <select name="gender" id="gender">
                  <option>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="w3layouts">	
              <input type="text" id="address" name="address" placeholder="Address" title="Please enter a valid address" required />
            </div>			
            <input type="submit" className="register" defaultValue="Register" />
          </form>
          <p className="wthree w3l">Fast Signup With Your Favourite Social Profile</p>
          <ul className="social-agileinfo wthree2">
            <li><a href="#"><i className="fa fa-facebook" /></a></li>
            <li><a href="#"><i className="fa fa-youtube" /></a></li>
            <li><a href="#"><i className="fa fa-twitter" /></a></li>
            <li><a href="#"><i className="fa fa-google-plus" /></a></li>
          </ul>
        </div>
        <div className="clear" />
      </div>
    </div>
    </>
  );
}
