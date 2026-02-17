import {
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  GET_USER_REVIEWS_REQUEST,
  GET_USER_REVIEWS_SUCCESS,
  GET_USER_REVIEWS_FAILURE,
} from '../actions/reviewActions';

const initialState = {
  reviewsList: [], // ✅ MUST
  loading: false,
  success: false,
  data: null,
  error: null,
  userReviews: [],
  // loading: false,
  // error: null,
};

export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case ADD_REVIEW_SUCCESS:
      console.log('✅ ADD_REVIEW_SUCCESS reducer hit');
      console.log('👉 Payload:', action.payload);
      return {
        ...state,
        loading: false,
        success: true,
        // data: action.payload,
        reviewsList: [...state.reviewsList, action.payload.data],
      };

    case ADD_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_USER_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_USER_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        userReviews: action.payload.data || action.payload,
      };

    case GET_USER_REVIEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
