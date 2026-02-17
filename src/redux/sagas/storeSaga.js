import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_STORE_REQUEST,
  GET_STORE_SUCCESS,
  GET_STORE_FAILURE,
} from '../actions/storeActions';
function* getStoreSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `https://mntrendigo.mntech.website/api/v1/user/store/by-storeId/${action.payload}`,
    );

    console.log('STORE FULL RESPONSE ', response);
    console.log(' STORE RESPONSE DATA ', response.data);

    yield put({
      type: GET_STORE_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    console.log('STORE API ERROR ', error);
    yield put({
      type: GET_STORE_FAILURE,
      payload: error.message,
    });
  }
}
export function* watchStoreSaga() {
  yield takeLatest(GET_STORE_REQUEST, getStoreSaga);
}
