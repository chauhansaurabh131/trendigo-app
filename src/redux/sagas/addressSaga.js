import {call, getContext, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAILURE,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAILURE,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  getAddressRequest,
} from '../actions/addressActions';
import api from '../../api/apiClient';

// ---------- GET ADDRESS by user ----------
function* getAddressSaga(action) {
  const {userId} = action;

  console.log(' GET_ADDRESS_REQUEST SAGA CALLED');
  console.log('➡ UserId:', userId);

  if (!userId) {
    console.log(' GET_ADDRESS stopped (no token or userId)');
    return;
  }

  try {
    const res = yield call(() =>
      api.get(`/user/userAddress/get-by-user/${userId}`),
    );

    console.log('GET ADDRESS API RESPONSE:', res.data);

    yield put({type: GET_ADDRESS_SUCCESS, data: res.data.data});
  } catch (err) {
    console.log(' GET ADDRESS ERROR:', err?.response?.data || err.message);

    yield put({
      type: GET_ADDRESS_FAILURE,
      error: err.response?.data,
    });
  }
}

// ---------- ADD ADDRESS ----------
function* addAddressSaga(action) {
  const {payload} = action;

  console.log('ADD_ADDRESS_REQUEST SAGA CALLED');
  console.log('➡ Payload:', payload);
  // console.log('➡ Token:', token);

  if (!payload?.userId) {
    console.log(' ADD_ADDRESS stopped');
    return;
  }
  try {
    const res = yield call(() => api.post('/user/userAddress', payload));

    console.log('ADD ADDRESS API RESPONSE:', res.data);

    yield put({type: ADD_ADDRESS_SUCCESS});
    yield put({type: GET_ADDRESS_REQUEST, userId: payload.userId});
  } catch (err) {
    console.log('ADD ADDRESS ERROR:', err?.response?.data || err.message);

    yield put({
      type: ADD_ADDRESS_FAILURE,
      error: err.response?.data,
    });
  }
}

function* updateAddressSaga(action) {
  try {
    const {addressId, payload, userId} = action;
    console.log('UPDATE SAGA ACTION:', action);
    if (!userId || !addressId) {
      console.log(' UPDATE_ADDRESS stopped');
      return;
    }
    const response = yield call(() =>
      api.put(`/user/userAddress/${addressId}`, payload),
    );

    console.log('UPDATE SUCCESS:', response.data);

    yield put({type: UPDATE_ADDRESS_SUCCESS, data: response.data.data});

    yield put(getAddressRequest(userId));
  } catch (error) {
    console.log('UPDATE ERROR:', error?.response?.data || error.message);

    yield put({type: UPDATE_ADDRESS_FAILURE, error});
  }
}

// ---------- DELETE ADDRESS ----------
function* deleteAddressSaga(action) {
  try {
    const {addressId, userId} = action;
    if (!userId || !addressId) {
      console.log(' DELETE_ADDRESS stopped');
      return;
    }

    console.log(' DELETE SAGA RECEIVED:', action);
    console.log('➡ Address ID:', addressId);
    // console.log('➡ Token:', token);
    console.log('➡ User ID:', userId);
    const response = yield call(() =>
      api.delete(`/user/userAddress/${addressId}`),
    );

    console.log(' DELETE SUCCESS:', response.data);

    // remove deleted from redux
    yield put({
      type: DELETE_ADDRESS_SUCCESS,
      addressId,
    });

    // re-fetch updated list
    yield put(getAddressRequest(userId));
  } catch (error) {
    console.log('DELETE ERROR:', error?.response?.data || error.message);
    yield put({
      type: DELETE_ADDRESS_FAILURE,
      error: error?.response?.data,
    });
  }
}

export default function* addressSaga() {
  yield takeLatest(GET_ADDRESS_REQUEST, getAddressSaga);
  yield takeLatest(ADD_ADDRESS_REQUEST, addAddressSaga);
  yield takeLatest(UPDATE_ADDRESS_REQUEST, updateAddressSaga);
  yield takeLatest(DELETE_ADDRESS_REQUEST, deleteAddressSaga);
}
