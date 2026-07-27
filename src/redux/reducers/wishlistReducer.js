import {
  WISHLIST_REQUEST,
  WISHLIST_SUCCESS,
  WISHLIST_FAILURE,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  REMOVE_WISHLIST_REQUEST,
  REMOVE_WISHLIST_SUCCESS,
  REMOVE_WISHLIST_FAILURE,
  CLEAR_WISHLIST,
} from '../actions/wishlistActions';

const initialState = {
  loading: false,
  error: null,
  wishlistData: [],
};

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case WISHLIST_REQUEST:
      return {...state, loading: true};

    case WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_WISHLIST_REQUEST:
      return {...state, loading: true};

    case GET_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlistData: Array.isArray(action.payload)
          ? action.payload
          : Array.isArray(action.payload?.results)
          ? action.payload.results
          : [],
      };

    case REMOVE_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REMOVE_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlistData: state.wishlistData.filter(
          item => item.id !== action.payload,
        ),
      };

    case REMOVE_WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_WISHLIST:
      return {...state, wishlistData: []};

    case 'RESET_WISHLIST':
      return {
        ...state,
        wishlistData: [],
      };
    default:
      return state;
  }
}
