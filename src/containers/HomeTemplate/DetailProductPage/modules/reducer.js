import * as ActionTypes from './constants';

const initialState = {
  productData: null,
  loading: false,
  error: null,
}

const productDetailReducer = (state = initialState, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.PRODUCT_DETAIL_REQUEST: {
      state.productData = null;
      state.loading = true;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.PRODUCT_DETAIL_SUCCESS: {
      state.productData = payload;
      state.loading = false;
      state.error = null;
      return { ...state };
    }
    case ActionTypes.PRODUCT_DETAIL_FAILED: {
      state.productData = null;
      state.loading = false;
      state.error = payload.response.data.message;
      return { ...state };
    }
    default:
      return { ...state };
  }
}

export default productDetailReducer;