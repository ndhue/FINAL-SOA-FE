import * as ActionTypes from './constants';
import api from 'utils/apiUtils';

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