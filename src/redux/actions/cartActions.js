export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const GET_CART_REQUEST = 'GET_CART_REQUEST';
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS';
export const GET_CART_FAILURE = 'GET_CART_FAILURE';

export const UPDATE_CART_REQUEST = 'UPDATE_CART_REQUEST';
export const UPDATE_CART_SUCCESS = 'UPDATE_CART_SUCCESS';
export const UPDATE_CART_FAILURE = 'UPDATE_CART_FAILURE';

export const REMOVE_CART_REQUEST = 'REMOVE_CART_REQUEST';
export const REMOVE_CART_SUCCESS = 'REMOVE_CART_SUCCESS';
export const REMOVE_CART_FAILURE = 'REMOVE_CART_FAILURE';

export const addToCartRequest = (payload, token) => ({
  type: ADD_TO_CART_REQUEST,
  payload,
  token,
});
export const getCartRequest = token => ({
  type: GET_CART_REQUEST,
  token,
});
export const updateCartRequest = (payload, token) => ({
  type: UPDATE_CART_REQUEST,
  payload,
  token,
});

export const removeCartRequest = (payload, token) => ({
  type: REMOVE_CART_REQUEST,
  payload,
  token,
});
