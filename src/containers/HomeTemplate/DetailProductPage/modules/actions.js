import * as ActionTypes from './constants';
import api from 'utils/apiUtils';
import { Redirect } from 'react-router-dom';

const actFetchProductDetail = id => {
  return dispatch => {
    dispatch(actProductDetailRequest());
    api.get(`/products/${id}`)
      .then(result => {
        dispatch(actProductDetailSuccess(result.data));
      })
      .catch(error => {
        dispatch(actProductDetailFailed(error));
      });
  }
}

const actProductDetailRequest = () => {
  return {
    type: ActionTypes.PRODUCT_DETAIL_REQUEST,
  }
};
const actProductDetailSuccess = data => {
  return {
    type: ActionTypes.PRODUCT_DETAIL_SUCCESS,
    payload: data
  }
};
const actProductDetailFailed = error => {
  return {
    type: ActionTypes.PRODUCT_DETAIL_FAILED,
    payload: error
  }
};

export { actFetchProductDetail };

export const actAddProductToCart = (product_id, user_id) =>{
  return (dispatch) => {
    dispatch(actAddToCartRequest());  
      api.post("/carts/addproduct", {product_id, user_id})
        .then(result => {
          dispatch(actAddToCartSuccess(result.data));
        })
        .catch(error => {
          dispatch(actAddToCartFailed(error));
          alert('Sản phẩm đã tồn tại');
          window.location.reload();
        });
    }
}
const actAddToCartRequest = () => {
  return {
    type: ActionTypes.CART_MANAGEMENT_REQUEST,
  }
};
const actAddToCartSuccess = data => {
  return {
    type: ActionTypes.CART_MANAGEMENT_SUCCESS,
    payload: data
  }
};
const actAddToCartFailed = error => {
  return {
    type: ActionTypes.CART_MANAGEMENT_FAILED,
    payload: error
  }
};