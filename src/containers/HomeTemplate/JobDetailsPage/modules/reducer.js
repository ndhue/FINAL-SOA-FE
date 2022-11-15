import * as ActionTypes from './constants';

const initialState = {
  jobData: null,
  loading: false,
  error: null,

  comments: null,
  commentLoading: false,
  commentError: null,

  newComment: null,
  newCommentLoading: false,
  newCommentError: null,

  ordered: null,
  orderLoading: false,
  orderError: null
}

const jobDetailReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.JOB_DETAIL_REQUEST: {
      state.jobData = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.JOB_DETAIL_SUCCESS: {
      state.jobData = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.JOB_DETAIL_FAILED: {
      state.jobData = null;
      state.loading = false;
      state.error = payload.response.data.message;
      return { ...state };
    }

    case ActionTypes.LIST_COMMENT_REQUEST: {
      state.comments = null;
      state.commentLoading = true;
      state.commentError = null;
      return { ...state };
    }
    case ActionTypes.LIST_COMMENT_SUCCESS: {
      state.comments = payload;
      state.commentLoading = false;
      state.commentError = null;
      return { ...state };
    }
    case ActionTypes.LIST_COMMENT_FAILED: {
      state.comments = null;
      state.commentLoading = false;
      state.commentError = payload.response.data.message;
      return { ...state };
    }

    case ActionTypes.COMMENT_REQUEST: {
      state.newComment = null;
      state.newCommentLoading = true;
      state.newCommentError = null;
      return { ...state };
    }
    case ActionTypes.COMMENT_SUCCESS: {
      state.newComment = payload;
      state.newCommentLoading = false;
      state.newCommentError = null;
      return { ...state };
    }
    case ActionTypes.COMMENT_FAILED: {
      state.newComment = null;
      state.newCommentLoading = false;
      state.newCommentError = payload.response.data.message;
      console.log(payload.response.data.message);
      return { ...state };
    }

    case ActionTypes.ORDER_JOB_REQUEST: {
      state.ordered = null;
      state.orderLoading = true;
      state.orderError = null;
      return { ...state };
    }
    case ActionTypes.ORDER_JOB_SUCCESS: {
      state.ordered = payload;
      state.orderLoading = false;
      state.orderError = null;
      return { ...state };
    }
    case ActionTypes.ORDER_JOB_FAILED: {
      state.ordered = null;
      state.orderLoading = false;
      state.orderError = payload.response.data.message;
      return { ...state };
    }

    default:
      return { ...state };
  }
}

export default jobDetailReducer;