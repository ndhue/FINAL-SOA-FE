import Loading from "components/Loading";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actManageUsers, actResetModal } from "./modules/actions";

export default function AdminModal(props) {
  const { method, userEdit } = props;

  const message = useSelector((state) => state.modalReducer.message);
  const loading = useSelector((state) => state.modalReducer.loading);
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    skill: [],
    certification: [],
    gender: false, //?
    type: "CLIENT",
  };

  const initialChecked = {
    WEB: false,
    DESIGN: false,
    GAMING: false,
    MOBILE: false,
    REACT: false,
    DIB: false,
    PYNOW: false,
    AWS: false,
    CCNA: false,
    IT: false,
  };

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
  };
  const [valid, setValid] = useState({ ...initialValid });
  const [state, setState] = useState({ ...initialState });
  const [checked, setChecked] = useState({ ...initialChecked });

  const handleResetForm = () => {
    dispatch(actResetModal());
    if (userEdit) {
      
      setState({
        name: userEdit.name,
        email: userEdit.email,
        phone: userEdit.phone,
        birthday: userEdit.birthday,
        skill: userEdit.skill,
        certification: userEdit.certification,
        gender: false, //?
        type: userEdit.role,
      });
      setChecked({
        WEB: userEdit.skill.includes("WEB") ? true : false,
        DESIGN: userEdit.skill.includes("DESIGN") ? true : false,
        GAMING: userEdit.skill.includes("GAMING") ? true : false,
        MOBILE: userEdit.skill.includes("MOBILE") ? true : false,
        REACT: userEdit.skill.includes("REACT") ? true : false,
        DIB: userEdit.certification.includes("DIB") ? true : false,
        PYNOW: userEdit.certification.includes("PYNOW") ? true : false,
        AWS: userEdit.certification.includes("AWS") ? true : false,
        CCNA: userEdit.certification.includes("CCNA") ? true : false,
        IT: userEdit.certification.includes("IT") ? true : false,
      });
    } else {
      setState({ ...initialState });
      setChecked({ ...initialChecked });
      setValid({...initialValid});
    }
  };

  useEffect(() => {
    handleResetForm();
  }, [userEdit]);

  const handleOnchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(actManageUsers(state, method, userEdit?._id));
  };

  const handleLoading = () => {
    if (loading) {
      return <Loading />;
    }
    return (
      message && (
        <div className="alert alert-danger mt-3 text-center">{message}</div>
      )
    );
  };

  const handleChangeSkill = (e) => {
    const skillChecked = [];
    document.querySelectorAll(".checkbox-skill").forEach((checkbox) => {
      if (checkbox.checked) {
        skillChecked.push(checkbox.value);
      }
    });
    setState({ ...state, skill: skillChecked });
    if (!e.target.checked) {
      setChecked({ ...checked, [e.target.value]: false });
    } else {
      setChecked({ ...checked, [e.target.value]: true });
    }
  };

  const handleChangeCert = (e) => {
    const certChecked = [];
    document.querySelectorAll(".checkbox-cert").forEach((checkbox) => {
      if (checkbox.checked) {
        certChecked.push(checkbox.value);
      }
    });
    setState({ ...state, certification: certChecked });
    if (!e.target.checked) {
      setChecked({ ...checked, [e.target.value]: false });
    } else {
      setChecked({ ...checked, [e.target.value]: true });
    }
  };

  window.onclick = function (e) {
    if (e.target == document.getElementById("addModal")) {
      handleResetForm();
    }
  };

  const handleErrors = (event) => {
    const { name, value } = event.target;
    let mess = value.trim() === "" ? "Please enter your " + name : "";
    let { nameValid, emailValid, passwordValid, phoneValid, birthdayValid, formValid } =
      valid;
    switch (name) {
      case "name":{
        nameValid = mess === "" ? true : false;
        let pattern = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";
        if(value && !value.match(pattern)){
          nameValid = false;
          mess = "Your name seems invalid";
        }
        else{
          nameValid = true;
        }
        break;
      }
      case "email":{
        emailValid = mess === "" ? true : false;
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value && !value.match(pattern)) {
          emailValid = false;
          mess = "Your email seems invalid";
        }else{
          emailValid = true;
        }
        break;
      }
      case "password":{
        passwordValid = mess === "" ? true : false;
        let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if (value && !value.match(pattern)) {
          passwordValid = false;
          mess = "Your password seems invalid";
        }else{
          passwordValid = true;
        }
        break;
      }
      case "phone":{
        phoneValid = mess === "" ? true : false;
        let pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (value && !value.match(pattern)) {
          phoneValid = false;
          mess = "Your phone seems invalid";
        }else{
          phoneValid = true;
        }
        break;
      }
      case "birthday":{
        birthdayValid = mess === "" ? true : false;
        let pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        if (value && value.match(pattern)) {
          birthdayValid = false;
          mess = "Your birthday seems invalid";
        }else{
          birthdayValid = true;
        }
        break;
      }
      default:
        break;
    }
    formValid = nameValid & emailValid & passwordValid & phoneValid & birthdayValid;
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
  return (
    <div className="modal fade" id="addModal" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{method} USER</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                handleResetForm();
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleOnSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Full name"
                  onChange={handleOnchange}
                  value={state.name}
                  onBlur={handleErrors}
                />
                {valid.errors.name && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.name}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleOnchange}
                  value={state.email}
                  onBlur={handleErrors}
                />
                {valid.errors.email && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.email}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  disabled={userEdit ? true : false}
                  type="password"
                  name="password"
                  autoComplete="on"
                  placeholder={userEdit ? "Password" : "New password"}
                  onChange={handleOnchange}
                  onBlur={handleErrors}
                />
                {valid.errors.password && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.password}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="tel"
                  name="phone"
                  placeholder="Mobile number"
                  onChange={handleOnchange}
                  value={state.phone}
                  onBlur={handleErrors}
                />
                {valid.errors.phone && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.phone}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Skill</label>
                <div className="d-flex justify-content-around">
                  <div>
                    <label>WEB</label>
                    <input
                      className="ml-2 checkbox-skill"
                      type="checkbox"
                      value="WEB"
                      onChange={handleChangeSkill}
                      checked={checked.WEB}
                    />
                  </div>
                  <div>
                    <label>DESIGN</label>
                    <input
                      className="ml-2 checkbox-skill"
                      type="checkbox"
                      value="DESIGN"
                      onChange={handleChangeSkill}
                      checked={checked.DESIGN}
                    />
                  </div>
                  <div>
                    <label>GAMING</label>
                    <input
                      className="ml-2 checkbox-skill"
                      type="checkbox"
                      value="GAMING"
                      onChange={handleChangeSkill}
                      checked={checked.GAMING}
                    />
                  </div>
                  <div>
                    <label>MOBILE</label>
                    <input
                      className="ml-2 checkbox-skill"
                      type="checkbox"
                      value="MOBILE"
                      onChange={handleChangeSkill}
                      checked={checked.MOBILE}
                    />
                  </div>
                  <div>
                    <label>REACT</label>
                    <input
                      className="ml-2 checkbox-skill"
                      type="checkbox"
                      value="REACT"
                      onChange={handleChangeSkill}
                      checked={checked.REACT}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Certification</label>
                <div className="d-flex justify-content-around">
                  <div>
                    <label>DIB</label>
                    <input
                      className="ml-2 checkbox-cert"
                      type="checkbox"
                      value="DIB"
                      onChange={handleChangeCert}
                      checked={checked.DIB}
                    />
                  </div>
                  <div>
                    <label>PYNOW</label>
                    <input
                      className="ml-2 checkbox-cert"
                      type="checkbox"
                      value="PYNOW"
                      onChange={handleChangeCert}
                      checked={checked.PYNOW}
                    />
                  </div>
                  <div>
                    <label>AWS</label>
                    <input
                      className="ml-2 checkbox-cert"
                      type="checkbox"
                      value="AWS"
                      onChange={handleChangeCert}
                      checked={checked.AWS}
                    />
                  </div>
                  <div>
                    <label>CCNA</label>
                    <input
                      className="ml-2 checkbox-cert"
                      type="checkbox"
                      value="CCNA"
                      onChange={handleChangeCert}
                      checked={checked.CCNA}
                    />
                  </div>
                  <div>
                    <label>IT</label>
                    <input
                      className="ml-2 checkbox-cert"
                      type="checkbox"
                      value="IT"
                      onChange={handleChangeCert}
                      checked={checked.IT}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Birthday</label>
                <input
                  className="form-control"
                  type="date"
                  name="birthday"
                  onChange={handleOnchange}
                  value={
                    state.birthday
                      ? new Date(state.birthday)
                          .toLocaleDateString("en-GB")
                          .split("/")
                          .reverse()
                          .join("-")
                      : ""
                  }
                  onBlur={handleErrors}
                />
                {valid.errors.birthday && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.birthday}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select className="custom-select" name="gender">
                  <option value="male" className="selected">
                    Male
                  </option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>User Type</label>
                <select
                  className="custom-select"
                  name="type"
                  value={state.type}
                  onChange={(e) => {
                    setState({ ...state, [e.target.name]: e.target.value });
                  }}
                >
                  <option>CLIENT</option>
                  <option>ADMIN</option>
                </select>
              </div>
              <div className="form-group text-center mt-3">
                <button className="btn btn-success px-3" type="submit" disabled={userEdit?false:!valid.formValid} >
                  {method}
                </button>
              </div>
              <div>{handleLoading()}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="custom-control custom-checkbox">
  <input type="checkbox" class="custom-control-input" id="customCheck1">
  <label class="custom-control-label" for="customCheck1">Check this custom checkbox</label>
</div> */
}
