// export const ADD_ADDRESS_REQUEST = 'ADD_ADDRESS_REQUEST';
// export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS';
// export const ADD_ADDRESS_FAILURE = 'ADD_ADDRESS_FAILURE';

// export const UPDATE_ADDRESS_REQUEST = 'UPDATE_ADDRESS_REQUEST';
// export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';

// export const GET_ADDRESS_REQUEST = 'GET_ADDRESS_REQUEST';
// export const GET_ADDRESS_SUCCESS = 'GET_ADDRESS_SUCCESS';

// export const DELETE_ADDRESS_REQUEST = 'DELETE_ADDRESS_REQUEST';
// export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';
// //Add
// export const addAddressRequest = payload => ({
//   type: ADD_ADDRESS_REQUEST,
//   payload,
// });

// export const addAddressSuccess = data => ({
//   type: ADD_ADDRESS_SUCCESS,
//   data,
// });

// export const addAddressFailure = error => ({
//   type: ADD_ADDRESS_FAILURE,
//   error,
// });

// // UPDATE
// export const updateAddressRequest = payload => ({
//   type: UPDATE_ADDRESS_REQUEST,
//   payload,
// });

// export const getAddressRequest = ({token, userId}) => ({
//   type: GET_ADDRESS_REQUEST,
//   payload: {token, userId},
// });

// // DELETE
// export const deleteAddressRequest = payload => ({
//   type: DELETE_ADDRESS_REQUEST,
//   payload, // {token, id}
// });

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
export const getAddressRequest = (userId, token) => ({
  type: GET_ADDRESS_REQUEST,
  userId,
  token,
});

export const addAddressRequest = (payload, token) => ({
  type: ADD_ADDRESS_REQUEST,
  payload,
  token,
});

export const updateAddressRequest = (addressId, payload, token, userId) => ({
  type: UPDATE_ADDRESS_REQUEST,
  addressId,
  payload,
  token,
  userId,
});

export const deleteAddressRequest = (addressId, token, userId) => ({
  type: DELETE_ADDRESS_REQUEST,
  addressId,
  token,
  userId,
});
