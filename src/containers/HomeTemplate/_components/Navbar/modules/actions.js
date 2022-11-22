import * as ActionTypes from './constants';
import api from 'utils/apiUtils';

export const actFetchJobTypes = () => {
  return (dispatch) => {
    dispatch(actJobTypesRequest());
    api.get("/")
      .then(result => {
        dispatch(actJobTypesSuccess(result.data));
      })
      .catch(error => {
        dispatch(actJobTypesFailed(error));
      });
  }
}

const actJobTypesRequest = () => {
  return {
    type: ActionTypes.JOB_TYPES_REQUEST,
  }
};
const actJobTypesSuccess = data => {
  return {
    type: ActionTypes.JOB_TYPES_SUCCESS,
    payload: data
  }
};
const actJobTypesFailed = error => {
  return {
    type: ActionTypes.JOB_TYPES_FAILED,
    payload: error
  }
};