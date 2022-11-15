import * as ActionTypes from './constants';
import api from 'utils/apiUtils';

const actFetchJobDetail = id => {
  return dispatch => {
    dispatch(actJobDetailRequest());
    dispatch(actListCommentRequest());
    api.get(`/api/jobs/${id}`)
      .then(result => {
        dispatch(actJobDetailSuccess(result.data));
      })
      .catch(error => {
        dispatch(actJobDetailFailed(error));
      });
    api.get(`/api/comments/by-job/${id}`)
      .then(result => {
        dispatch(actListCommentSuccess(result.data));
      })
      .catch(error => {
        dispatch(actListCommentFailed(error));
      });
  }
}

const actJobDetailRequest = () => {
  return {
    type: ActionTypes.JOB_DETAIL_REQUEST,
  }
};
const actJobDetailSuccess = data => {
  return {
    type: ActionTypes.JOB_DETAIL_SUCCESS,
    payload: data
  }
};
const actJobDetailFailed = error => {
  return {
    type: ActionTypes.JOB_DETAIL_FAILED,
    payload: error
  }
};

const actListCommentRequest = () => {
  return {
    type: ActionTypes.LIST_COMMENT_REQUEST,
  }
}
const actListCommentSuccess = data => {
  return {
    type: ActionTypes.LIST_COMMENT_SUCCESS,
    payload: data
  }
}
const actListCommentFailed = error => {
  return {
    type: ActionTypes.LIST_COMMENT_FAILED,
    payload: error
  }
}

const actDispatchComment = data => {
  return dispatch => {
    dispatch(actCommentRequest());
    api.post("/api/comments", data)
      .then(result => {
        dispatch(actCommentSuccess(result.data));
      })
      .catch(error => {
        dispatch(actCommentFailed(error));
      })
  }
}

const actCommentRequest = () => {
  return {
    type: ActionTypes.COMMENT_REQUEST,
  }
}
const actCommentSuccess = data => {
  return {
    type: ActionTypes.COMMENT_SUCCESS,
    payload: data
  }
}
const actCommentFailed = error => {
  return {
    type: ActionTypes.COMMENT_FAILED,
    payload: error
  }
}

const actOrderJob = jobId => {
  return dispatch => {
    dispatch(actOrderRequest());
    api.patch(`/api/jobs/booking/${jobId}`)
      .then(result => {
        dispatch(actOrderSuccess(result.data));
      })
      .catch(error => {
        dispatch(actOrderFailed(error));
      })
  }
}

const actOrderRequest = () => {
  return {
    type: ActionTypes.ORDER_JOB_REQUEST,
  }
}
const actOrderSuccess = data => {
  return {
    type: ActionTypes.ORDER_JOB_SUCCESS,
    payload: data
  }
}
const actOrderFailed = error => {
  return {
    type: ActionTypes.ORDER_JOB_FAILED,
    payload: error
  }
}

export { actFetchJobDetail, actDispatchComment, actOrderJob };