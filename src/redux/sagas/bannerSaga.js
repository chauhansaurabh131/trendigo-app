// bannerSaga.js
import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
// import {FETCH_BANNER_REQUEST} from '../actions/bannerTypes';
import {fetchBannerSuccess, fetchBannerFailure} from '../actions/bannerActions';
import {FETCH_BANNER_REQUEST} from '../actions/bannerActions'; // or bannerTypes.js
import api from '../../api/apiClient';
// const getBannersApi = () => {
//   return axios.get('https://mntrendigo.mntech.website/api/v1/user/banner/');
// };

const getBannersApi = () => {
  return api.get('/user/banner/'); // ✅ baseURL already set
};

function* fetchBannerSaga() {
  try {
    console.log(' FETCH BANNER SAGA START');
    const response = yield call(getBannersApi);
    console.log(' FETCH BANNER SAGA RAW RESPONSE', response);
    console.log(' FETCH BANNER SAGA RESPONSE', response.data);
    yield put(fetchBannerSuccess(response.data));
  } catch (error) {
    console.log(
      ' FETCH BANNER SAGA ERROR',
      error?.response?.data || error.message,
    );
    yield put(fetchBannerFailure(error?.response?.data || error.message));
  }
}

export function* bannerSaga() {
  console.log('BANNER SAGA WATCHER RUNNING');
  yield takeLatest(FETCH_BANNER_REQUEST, fetchBannerSaga);
}
