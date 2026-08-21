import {
  GET_CUSTOMER_REVIEWS_FAILURE,
  GET_CUSTOMER_REVIEWS_REQUEST,
  GET_CUSTOMER_REVIEWS_SUCCESS,
} from '../actions/sellerReviewAction';

const initialState = {
  userLoading: false,
  success: false,
  data: null,
  userError: null,
  userReviews: [],
  // loading: false,
  // error: null,
};

export default function sellerReviewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMER_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_CUSTOMER_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        userReviews: action.payload.data?.reviews || [],
      };
    case GET_CUSTOMER_REVIEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
