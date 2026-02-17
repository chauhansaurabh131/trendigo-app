// reviewByUserIdReducer.js

import {
  REVIEW_BY_USER_ID_REQUEST,
  REVIEW_BY_USER_ID_SUCCESS,
  REVIEW_BY_USER_ID_FAILURE,
} from '../actions/reviewByUserIdActions';

const initialState = {
  loading: false,
  reviewByUserData: null,
  error: null,
};

const reviewByUserIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEW_BY_USER_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REVIEW_BY_USER_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        reviewByUserData: action.payload,
      };

    case REVIEW_BY_USER_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reviewByUserIdReducer;
