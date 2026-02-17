import {
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CATEGORY_FAILURE,
} from '../actions/productCategoryActions';

const initialState = {
  loading: false,
  products: [],
  pagination: {},
  error: null,
};

export default function productCategoryReucer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_CATEGORY_REQUEST:
      return {...state, loading: true};

    case PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        // products: action.payload?.results || [], // 🔥 important
        products: action.payload?.data?.results || [],
        pagination: {
          page: action.payload?.page,
          totalPages: action.payload?.totalPages,
          hasNextPage: action.payload?.hasNextPage,
        },
      };

    case PRODUCT_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
