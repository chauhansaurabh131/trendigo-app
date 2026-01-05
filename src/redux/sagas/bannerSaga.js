// bannerSaga.js
import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
// import {FETCH_BANNER_REQUEST} from '../actions/bannerTypes';
import {fetchBannerSuccess, fetchBannerFailure} from '../actions/bannerActions';
import {FETCH_BANNER_REQUEST} from '../actions/bannerActions'; // or bannerTypes.js

const getBannersApi = () => {
  return axios.get('https://mntrendigo.mntech.website/api/v1/user/banner/');
};

function* fetchBannerSaga() {
  try {
    const response = yield call(getBannersApi);
    console.log('response...................', response);
    yield put(fetchBannerSuccess(response.data));
    // console.log(response, 'response.......');
  } catch (error) {
    yield put(fetchBannerFailure(error?.response?.data || error.message));
  }
}

export function* bannerSaga() {
  console.log('BANNER SAGA WATCHER RUNNING');
  yield takeLatest(FETCH_BANNER_REQUEST, fetchBannerSaga);
}
