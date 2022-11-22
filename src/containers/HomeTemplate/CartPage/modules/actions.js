import api from 'utils/apiUtils';
import * as ActionType from './constants';

export const actFetchCartData = () => {
  return (dispatch) => {
    dispatch(actManageCartRequest());
    api.get("/carts")
      .then(result => {
          dispatch(actManageCartSuccess(result.data));
        
      })
      .catch(error => {
        dispatch(actManageCartFailed(error));
      });
  }
}
const actManageCartRequest = () => {
  return {
    type: ActionType.CART_MANAGEMENT_REQUEST,
  }
};
const actManageCartSuccess = data => {
  return {
    type: ActionType.CART_MANAGEMENT_SUCCESS,
    payload: data
  }
};
const actManageCartFailed = error => {
  return {
    type: ActionType.CART_MANAGEMENT_FAILED,
    payload: error
  }
};

