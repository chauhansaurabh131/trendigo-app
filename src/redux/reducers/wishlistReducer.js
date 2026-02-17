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
  wishlistData: [], // ✅ MUST be array
};

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case WISHLIST_REQUEST:
      return {...state, loading: true};

    case WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlistData: action.payload,
      };

    case WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_WISHLIST_REQUEST:
      return {...state, loading: true};

    // case GET_WISHLIST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     loading: false,
    //     wishlistData: Array.isArray(action.payload)
    //       ? action.payload
    //       : action.payload?.data || [],
    //   };

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

    // / 🔄 API call start
    case REMOVE_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // ✅ API success → state  item remove
    case REMOVE_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlistData: state.wishlistData.filter(
          item => item.id !== action.payload, // ← wishlistId
        ),
      };

    // ❌ API fail
    case REMOVE_WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_WISHLIST: // ✅ add this
      return {...state, wishlistData: []};
    default:
      return state;
  }
}
