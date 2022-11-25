import Loading from "components/Loading";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actManageProducts, actResetModal } from "./modules/actions";

export default function AdminModalProduct(props) {
  const { method, productEdit} = props;
  const message = useSelector((state) => state.modalReducer.message);
  const loading = useSelector((state) => state.modalReducer.loading);
  const dispatch = useDispatch();
  
  const fileInput = useRef(null);

  const initialState = {
    product_name: "",
    description: "",
    price: "",
    product_image: "",
  };
  const initialValid = {
    errors: {
      product_name: "",
      description: "",
      price: "",
      product_image: "",
    },
    formValid: false,
    nameValid: false,
    descValid: false,
    priceValid: false,
    productImageValid: false,
  };

  
  const [valid, setValid] = useState({ ...initialValid });
  const [state, setState] = useState({ ...initialState });

  const handleResetForm = () => {
    dispatch(actResetModal());
    if (productEdit) {
      
      setState({
        product_name: productEdit.product_name,
        description: productEdit.description,
        price: productEdit.price,
        product_image: productEdit.product_image,
      });
    } else {
      setState({ ...initialState });
      setValid({...initialValid});
    }
  };

  useEffect(() => {
    handleResetForm();
  }, [productEdit]);

  const handleOnchange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const refresh = () => {
    window.location.reload();
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(actManageProducts(state, method, productEdit?.product_id));
    console.log(state);
    refresh();
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

  window.onclick = function (e) {
    if (e.target == document.getElementById("addModal")) {
      handleResetForm();
    }
  };

  const handleErrors = (event) => {
    // const { name, value } = event.target;
    // let mess = value.trim() === "" ? "Please enter your " + name : "";
    // let {
    //   fullnameValid,
    //   emailValid,
    //   usernameValid,
    //   passwordValid,
    //   phoneValid,
    //   addressValid,
    //   formValid,
    // } = valid;
    // switch (name) {
    //   case "fullname": {
    //     fullnameValid = mess === "" ? true : false;
    //     let pattern =
    //       "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
    //       "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
    //       "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";
    //     if (value && !value.match(pattern)) {
    //       fullnameValid = false;
    //       mess = "Your name seems invalid";
    //     } else {
    //       fullnameValid = true;
    //     }
    //     break;
    //   }
    //   case "email": {
    //     emailValid = mess === "" ? true : false;
    //     let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     if (value && !value.match(pattern)) {
    //       emailValid = false;
    //       mess = "Your email seems invalid";
    //     } else {
    //       emailValid = true;
    //     }
    //     break;
    //   }
    //   case "username": {
    //     usernameValid = mess === "" ? true : false;
    //     break;
    //   }
    //   case "password": {
    //     passwordValid = mess === "" ? true : false;
    //     let pattern = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    //     if (value && !value.match(pattern)) {
    //       passwordValid = false;
    //       mess = "Your password seems invalid";
    //     } else {
    //       passwordValid = true;
    //     }
    //     break;
    //   }
    //   case "phone": {
    //     phoneValid = mess === "" ? true : false;
    //     let pattern =
    //       /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    //     if (value && !value.match(pattern)) {
    //       phoneValid = false;
    //       mess = "Your phone seems invalid";
    //     } else {
    //       phoneValid = true;
    //     }
    //     break;
    //   }
    //   case "address": {
    //     addressValid = mess === "" ? true : false;
    //     break;
    //   }
    //   default:
    //     break;
      
    // }
    // formValid =
    //   fullnameValid & emailValid & usernameValid & passwordValid & phoneValid & addressValid;
    // setValid({
    //   formValid,
    //   fullnameValid,
    //   emailValid,
    //   usernameValid,
    //   passwordValid,
    //   phoneValid,
    //   addressValid,
    //   errors: { ...valid.errors, [name]: mess },
    // });
  };
  return (
    <div className="modal fade" id="addModal" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{method} PRODUCT</h5>
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
                  name="product_name"
                  placeholder="Tên sản phẩm"
                  onChange={handleOnchange}
                  value={state.product_name}
                  onBlur={handleErrors}
                />
                {valid.errors.product_name && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.product_name}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="product_name"
                  placeholder="Name"
                  onChange={handleOnchange}
                  value={state.product_name}
                  onBlur={handleErrors}
                />
                {valid.errors.product_name && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.product_name}
                  </div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  placeholder="Mô tả"
                  onChange={handleOnchange}
                  value={state.description}
                  onBlur={handleErrors}
                />
                {valid.errors.description && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.description}
                  </div>
                )}
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  placeholder="Giá"
                  onChange={handleOnchange}
                  value={state.price}
                  onBlur={handleErrors}
                />
                {valid.errors.price && (
                  <div className="alert alert-danger mt-2">
                    {valid.errors.price}
                  </div>
                )}
              </div>
              <div className="form-group">
              <input
                type="file"
                name="product_image"
                ref={fileInput}
                onChange={e => setState({ ...state, [e.target.name]: fileInput.current.files[0] })}/>
              </div>
              {/* <div className="form-group">
                <img alt="not fount" width={"100px"} height={'100%'} object-fit={'contain'} src={`http://localhost:9090/file/`+`${fileInput}`} />
              </div> */}
              <div className="form-group text-center mt-3">
                <button className="btn btn-success px-3" type="submit" >
                  {/* disabled={productEdit?false:!valid.formValid} */}
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
