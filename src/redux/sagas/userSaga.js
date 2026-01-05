import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from '../actions/userActions';

function* fetchUserSaga(action) {
  try {
    const token = action.payload;

    const response = yield call(() =>
      axios.get('https://mntrendigo.mntech.website/api/v1/user/auth/me', {
        headers: {Authorization: `Bearer ${token}`},
      }),
    );

    console.log('USER DATA........:', response.data);

    yield put({
      type: FETCH_USER_SUCCESS,
      payload: response.data.data.user, // ✔ FIXED
    });
  } catch (error) {
    yield put({
      type: FETCH_USER_FAILURE,
      payload: error.response?.data || 'Failed to fetch user',
    });
  }
}

export default function* userRootSaga() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUserSaga);
}
