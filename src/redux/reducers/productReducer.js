import {
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
} from '../actions/productActions';

const initialState = {
  loading: false,
  products: [],
  error: null,
  page: 1,
  totalPages: 1,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return {...state, loading: true};

    // case GET_PRODUCT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     products: action.payload,
    //   };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products:
          action.payload.page === 1
            ? action.payload.products
            : [...state.products, ...action.payload.products],

        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };

    case GET_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
