import Loading from "components/Loading";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { actResetSignUpMessenger, actSignUp } from "../../AdminTemplate/SignUpPage/modules/actions";
import './style.css';
import background1 from "./img/banner.jpg";
import background2 from "./img/content.jpg";
export default function SignUpSeller() {
  const formInput = useRef(null);

  const [info, setInfo] = useState({
    fullname: "",
    email: "",
    storename: "",
    numberbank:"",
    phone: "",
    gender: "",
    address: "",
  });

  const initialValid = {
    errors: {
      fullname: "",
      email: "",
      storename: "",
      numberbank:"",
      phone: "",
      gender: "",
      address: "",
    },
    formValid: false,
    fullnameValid: false,
    emailValid: false,
    storenameValid: false,
    numberbankValid: false,
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
      storenameValid,  
      phoneValid,
      numberbankValid,
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
          mess = "Tên bạn không hợp lệ";
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
          mess = "Email bạn không hợp lệ";
        } else {
          emailValid = true;
        }
        break;
      }
      case "storename": {
        storenameValid = mess === "" ? true : false;
        break;
      }
      case "numberbank": {
        numberbankValid = mess === "" ? true : false;
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
      fullnameValid & emailValid & storenameValid  & phoneValid & addressValid& numberbankValid;
    setValid({
      formValid,
      fullnameValid,
      emailValid,
      storenameValid,
      numberbankValid,
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
        <h1 className="w3ls">Trở thành người bán hàng</h1>
        <div className="content-w3ls">
          <div className="content-agile1" style={{ backgroundImage: `url(${background2})` }}>
            <h2 className="agileits1">Official</h2>
            
          </div>
        <div className="content-agile2">
          <form onSubmit={handleSubmit} ref={formInput}>
            <div className="w3layouts"> 
              <input type="text" id="fullname" name="fullname" placeholder="Họ và tên" title="Vui lòng nhập họ tên" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.fullname && (
              <div className="alert alert-danger mx-4">{valid.errors.fullname}</div>
              )}
            </div>
            <div className="w3layouts">	
              <input type="email" id="email" name="email" placeholder="Email" title="Vui lòng nhập email" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.email && (
                <div className="alert alert-danger mx-4">
                  {valid.errors.email}
                </div>
              )}
            </div>
            <div className="w3layouts">	
              <input type="text" id="storename" name="storename" placeholder="Tên cửa hàng" title="vui lòng nhập tên cửa hàng" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.storename && (
                <div className="alert alert-danger mx-4">
                  {valid.errors.storename}
                </div>
              )}
            </div>
            <div className="w3layouts">	
              <input type="text" id="numberbank" name="numberbank" placeholder="Tài khoản ngân hàng" title="Vui lòng nhập tài khoản ngân hàng" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.phone && (
                  <div className="alert alert-danger mx-4">
                    {valid.errors.phone}
                  </div>
              )}
            </div>
            <div className="w3layouts">	
              <input type="tel" id="phone" name="phone" placeholder="Số điện thoại" title="Vui lòng nhập số điện thoại" required 
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
                  <option>Giới tính</option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Other">Khác</option>
                </select>
            </div>
            <div className="w3layouts">	
              <input type="text" id="address" name="address"
              className="address" placeholder="Địa chỉ" title="Vui lòng nhập địa chỉ" required 
              onChange={handleOnchange}
              onBlur={handleErrors}/>
              {valid.errors.address && (
                  <div className="alert alert-danger mx-4">
                    {valid.errors.address}
                  </div>
                )}
            </div>			
            <button className="btn btn-sign-up register" type="submit" disabled={!valid.formValid}>
            Đăng kí
          </button>
          </form>
          <div>{handleLoading()}</div>
            
          </div>
        <div className="clear" />
      </div>
    </div>
    </>
  );
}