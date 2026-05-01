import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/apiClient'; // ✅ use api
import {
  UPDATE_USER_REQUEST,
  updateUserSuccess,
  updateUserFailure,
} from '../actions/updateUserActions';
import {fetchUserRequest} from '../actions/userActions';

const API_BASE = 'https://mntrendigo.mntech.website/api/v1/user/auth';

function* updateUserSaga(action) {
  try {
    console.log('updateUserSaga called');
    console.log('Payload:', action.payload);

    // const token = yield call(AsyncStorage.getItem, 'authToken');
    // console.log(' Token:', token);

    // if (!token) {
    //   yield put(updateUserFailure('User token missing'));
    //   return;
    // }

    // const response = yield call(
    //   axios.put,
    //   `${API_BASE}/update-user`,
    //   action.payload, // ✅ ONLY payload
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   },
    // );

    // ✅ direct api call (no token needed)
    const response = yield call(() =>
      api.put('/user/auth/update-user', action.payload),
    );

    console.log(' API RESPONSE:', response.data);
    console.log(' Updated User Data:', response.data?.data);
    // ⚠️ adjust according to backend response
    yield put(updateUserSuccess(response.data));

    // yield put(fetchUserRequest(token));
    yield put(fetchUserRequest());
  } catch (error) {
    console.log(' Saga Error:', error.response?.data || error.message);
    yield put(
      updateUserFailure(error.response?.data?.message || error.message),
    );
  }
}

export default function* updateUserRootSaga() {
  yield takeLatest(UPDATE_USER_REQUEST, updateUserSaga);
}
