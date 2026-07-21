import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from '../actions/userActions';
import api from '../../api/apiClient';
function* fetchUserSaga(action) {
  try {
    console.log('FETCH USER SAGA STARTED');

    const response = yield call(() => api.get('/user/auth/me'));

    console.log(' API CALLED SUCCESSFULLY');

    console.log(' FULL RESPONSE:', response);

    console.log(' RESPONSE.DATA:', response.data);

    console.log(' USER DATA:', response.data?.data?.user);

    console.log('USER DATA........:', response.data);

    yield put({
      type: FETCH_USER_SUCCESS,
      payload: response.data.data.user,
    });

    console.log(' USER STORED IN REDUX');
  } catch (error) {
    console.log(' FETCH USER ERROR:', error);

    console.log(' ERROR RESPONSE:', error?.response);

    console.log(' ERROR DATA:', error?.response?.data);

    yield put({
      type: FETCH_USER_FAILURE,
      payload: error.response?.data || 'Failed to fetch user',
    });
  }
}

export default function* userRootSaga() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUserSaga);
}
