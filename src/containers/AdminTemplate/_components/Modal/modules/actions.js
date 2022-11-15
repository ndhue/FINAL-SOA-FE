import api from 'utils/apiUtils';
import * as ActionTypes from './constants';

export const actManageUsers = (info, method, id) => {
  return dispatch => {
    dispatch(actModalRequest());
    if (method == "ADD") {
      api.post("/api/auth/signup", info)
        .then(result => {
          dispatch(actModalAddSuccess());
        })
        .catch(error => {
          dispatch(actModalAddFailed(error))
        });
    } else if (method == "EDIT") {
      api.put(`/api/users/${id}`, info)
        .then(result => {
          dispatch(actModalEditSuccess());
        })
        .catch(error => {
          dispatch(actModalEditFailed(error))
        });
    }
  };
}


const actModalRequest = () => ({
  type: ActionTypes.MODAL_REQUEST
});

const actModalAddSuccess = () => ({
  type: ActionTypes.MODAL_ADD_SUCCESS,
});

const actModalAddFailed = error => ({
  type: ActionTypes.MODAL_ADD_FAILED,
  payload: error
});

const actModalEditSuccess = () => ({
  type: ActionTypes.MODAL_EDIT_SUCCESS,
});

const actModalEditFailed = error => ({
  type: ActionTypes.MODAL_EDIT_FAILED,
  payload: error
});

export const actResetModal = () => {
  return dispatch => {
    dispatch({
      type: ActionTypes.MODAL_RESET
    });
  };
};