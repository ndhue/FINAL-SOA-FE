import * as ActionTypes from './constants';
import api from 'utils/apiUtils';

export const actSearchJobs = (keyword) => {
  return (dispatch) => {
    dispatch(actSearchRequest());
    api.get(`/api/jobs/by-name?name=${keyword}`)
      .then(result => {
        localStorage.removeItem("job-keyword");
        dispatch(actSearchSuccess(result.data, keyword));
      })
      .catch(error => {
        localStorage.removeItem("job-keyword");
        dispatch(actSearchFailed(error, keyword));
      });
  }
}

const actSearchRequest = () => {
  return {
    type: ActionTypes.SEARCHING_REQUEST,
  }
};
const actSearchSuccess = (data, keyword) => {
  return {
    type: ActionTypes.SEARCHING_SUCCESS,
    payload: { data: data, keyword: keyword }
  }
};
const actSearchFailed = (error, keyword) => {
  return {
    type: ActionTypes.SEARCHING_FAILED,
    payload: { error: error, keyword: keyword }
  }
};