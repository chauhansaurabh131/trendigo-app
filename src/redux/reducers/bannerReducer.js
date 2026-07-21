import {
  FETCH_BANNER_REQUEST,
  FETCH_BANNER_SUCCESS,
  FETCH_BANNER_FAILURE,
} from '../actions/bannerActions';

const initialState = {
  loading: false,
  banners: [],
  error: null,
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        banners: action.payload.data,
      };

    case FETCH_BANNER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default bannerReducer;
