export const GET_ADDRESS_REQUEST = 'GET_ADDRESS_REQUEST';
export const GET_ADDRESS_SUCCESS = 'GET_ADDRESS_SUCCESS';
export const GET_ADDRESS_FAILURE = 'GET_ADDRESS_FAILURE';

export const ADD_ADDRESS_REQUEST = 'ADD_ADDRESS_REQUEST';
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS';
export const ADD_ADDRESS_FAILURE = 'ADD_ADDRESS_FAILURE';

export const UPDATE_ADDRESS_REQUEST = 'UPDATE_ADDRESS_REQUEST';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_FAILURE = 'UPDATE_ADDRESS_FAILURE';

export const DELETE_ADDRESS_REQUEST = 'DELETE_ADDRESS_REQUEST';
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';
export const DELETE_ADDRESS_FAILURE = 'DELETE_ADDRESS_FAILURE';

// -------- GET ----------
export const getAddressRequest = userId => ({
  type: GET_ADDRESS_REQUEST,
  userId,
  // token,
});

export const addAddressRequest = payload => ({
  type: ADD_ADDRESS_REQUEST,
  payload,
  // token,
});

export const updateAddressRequest = (addressId, payload, userId) => ({
  type: UPDATE_ADDRESS_REQUEST,
  addressId,
  payload,
  // token,
  userId,
});

export const deleteAddressRequest = (addressId, userId) => ({
  type: DELETE_ADDRESS_REQUEST,
  addressId,
  // token,
  userId,
});
