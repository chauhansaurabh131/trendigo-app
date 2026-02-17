import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_PRODUCT_REQUEST,
  getProductSuccess,
  getProductFailure,
} from '../actions/productActions';

// /* API */
// const getProductApi = () => {
//   return axios.get('https://mntrendigo.mntech.website/api/v1/user/product/', {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };

// /* SAGA */
// function* getProductSaga() {
//   try {
//     const response = yield call(getProductApi);
//     console.log('PRODUCT RESPONSE ===>', response.data);

//     yield put(getProductSuccess(response.data.data));
//   } catch (error) {
//     console.log('PRODUCT ERROR ===>', error);
//     yield put(getProductFailure(error.message));
//   }
// }
const API_BASE = 'https://mntrendigo.mntech.website/api/v1/user';

const getProductApi = () =>
  axios.get(`${API_BASE}/product/listProductByReview`);

function* getProductSaga() {
  try {
    const response = yield call(getProductApi);
    console.log('PRODUCT RESPONSE ===>', response.data);

    // yield put(getProductSuccess(response.data.data));
    yield put(getProductSuccess(response.data.results));
  } catch (error) {
    console.log('PRODUCT ERROR ===>', error.response?.data || error.message);
    yield put(getProductFailure(error.message));
  }
}

export default function* productSaga() {
  console.log(' productSaga WATCHING...');
  yield takeLatest(GET_PRODUCT_REQUEST, getProductSaga);
}
