import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILURE,
  REMOVE_CART_REQUEST,
  REMOVE_CART_SUCCESS,
  REMOVE_CART_FAILURE,
} from '../actions/cartActions';

const initialState = {
  loading: false,
  cartLoading: false, // ADD/REMOVE loading
  cartData: [],
  error: null,
  cartItems: [],
  success: false,
  // loading: false,
  // cartData: null,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        cartLoading: true,
        success: false,
      };

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cartLoading: false,
        cartData: action.payload.data,
        success: true,
      };

    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        cartLoading: false,
        error: action.payload,
        success: false,
      };

    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartData: action.payload,
      };

    case GET_CART_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartData: action.payload,
      };

    case UPDATE_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case REMOVE_CART_REQUEST:
      return {
        ...state,
        cartLoading: true,
      };

    // case REMOVE_CART_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     cartData: {
    //       ...state.cartData,
    //       productDetailList: state.cartData.productDetailList.filter(
    //         item => item._id !== action.payload.itemId,
    //       ),
    //     },
    //   };
    case REMOVE_CART_SUCCESS:
      console.log('REMOVE_CART_SUCCESS action.payload:', action.payload);
      return {
        ...state,
        cartLoading: false,

        cartData: {
          ...state.cartData,
          productDetailList: state.cartData.productDetailList.filter(
            item => item._id !== action.payload.itemId,
          ),
        },
      };

    case REMOVE_CART_FAILURE:
      return {
        ...state,
        cartLoading: false,
        error: action.payload,
      };
    case 'RESET_CART':
      return {
        ...state,
        cartData: [],
        cartItems: [],
      };
    default:
      return state;
  }
}
