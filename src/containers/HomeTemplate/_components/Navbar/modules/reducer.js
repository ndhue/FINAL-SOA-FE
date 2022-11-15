import * as ActionTypes from './constants';

const initialState = {
  jobTypes: null,
  loading: false,
  error: null
}

const jobTypesReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.JOB_TYPES_REQUEST: {
      state.jobTypes = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.JOB_TYPES_SUCCESS: {
      state.jobTypes = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.JOB_TYPES_FAILED: {
      state.jobTypes = null;
      state.loading = false;
      state.error = payload.response.data.message;
      return { ...state };
    }
    default:
      return { ...state };
  }
}

export default jobTypesReducer;