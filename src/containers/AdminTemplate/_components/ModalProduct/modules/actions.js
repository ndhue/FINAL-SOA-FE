import api from 'utils/apiUtils';
import * as ActionTypes from './constants';

export const actManageProducts = (info, method, id) => {
  return dispatch => {
    dispatch(actModalProductRequest());
    if (method == "ADD") {
      api.post("/products/", info)
        .then(result => {
          dispatch(actModalProductAddSuccess(result.data));
        })
        .catch(error => {
          dispatch(actModalProductAddFailed(error))
        });
    } else if (method == "EDIT") {
      api.put(`/products/${id}`, info)
        .then(result => {
          dispatch(actModalProductEditSuccess(result.data));
        })
        .catch(error => {
          dispatch(actModalProductEditFailed(error))
        });
    }
  };
}


const actModalProductRequest = () => ({
  type: ActionTypes.MODAL_PRODUCT_REQUEST
});

const actModalProductAddSuccess = () => ({
  type: ActionTypes.MODAL_PRODUCT_ADD_SUCCESS,
});

const actModalProductAddFailed = error => ({
  type: ActionTypes.MODAL_PRODUCT_ADD_FAILED,
  payload: error
});

const actModalProductEditSuccess = () => ({
  type: ActionTypes.MODAL_PRODUCT_EDIT_SUCCESS,
});

const actModalProductEditFailed = error => ({
  type: ActionTypes.MODAL_PRODUCT_EDIT_FAILED,
  payload: error
});

export const actResetModal = () => {
  return dispatch => {
    dispatch({
      type: ActionTypes.MODAL_PRODUCT_RESET
    });
  };
};