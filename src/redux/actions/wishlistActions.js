export const WISHLIST_REQUEST = 'WISHLIST_REQUEST';
export const WISHLIST_SUCCESS = 'WISHLIST_SUCCESS';
export const WISHLIST_FAILURE = 'WISHLIST_FAILURE';
// ACTION TYPES
export const GET_WISHLIST_REQUEST = 'GET_WISHLIST_REQUEST';
export const GET_WISHLIST_SUCCESS = 'GET_WISHLIST_SUCCESS';
export const GET_WISHLIST_FAILURE = 'GET_WISHLIST_FAILURE';
// wishlistTypes.js
export const REMOVE_WISHLIST_REQUEST = 'REMOVE_WISHLIST_REQUEST';
export const REMOVE_WISHLIST_SUCCESS = 'REMOVE_WISHLIST_SUCCESS';
export const REMOVE_WISHLIST_FAILURE = 'REMOVE_WISHLIST_FAILURE';

// Add this new action
export const CLEAR_WISHLIST = 'CLEAR_WISHLIST';

// Action creator
export const clearWishlist = () => ({
  type: CLEAR_WISHLIST,
});
export const wishlistRequest = productId => ({
  type: WISHLIST_REQUEST,
  payload: {productId},
});

export const wishlistSuccess = data => ({
  type: WISHLIST_SUCCESS,
  payload: data,
});

export const wishlistFailure = error => ({
  type: WISHLIST_FAILURE,
  payload: error,
});

// REQUEST
export const getWishlistRequest = () => ({
  type: GET_WISHLIST_REQUEST,
});

// SUCCESS
export const getWishlistSuccess = data => ({
  type: GET_WISHLIST_SUCCESS,
  payload: data,
});

// FAILURE
export const getWishlistFailure = error => ({
  type: GET_WISHLIST_FAILURE,
  payload: error,
});
// wishlistActions.js
export const removeWishlistRequest = wishlistId => ({
  type: REMOVE_WISHLIST_REQUEST,
  payload: wishlistId,
});

export const removeWishlistSuccess = wishlistId => ({
  type: REMOVE_WISHLIST_SUCCESS,
  payload: wishlistId,
});

export const removeWishlistFailure = error => ({
  type: REMOVE_WISHLIST_FAILURE,
  payload: error,
});
