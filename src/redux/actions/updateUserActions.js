// redux/actions/userActions.js

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const RESET_UPDATE_USER = 'RESET_UPDATE_USER';

export const resetUpdateUser = () => ({
  type: RESET_UPDATE_USER,
});

export const updateUserRequest = payload => ({
  type: UPDATE_USER_REQUEST,
  payload,
});

export const updateUserSuccess = data => ({
  type: UPDATE_USER_SUCCESS,
  payload: data,
});

export const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});
