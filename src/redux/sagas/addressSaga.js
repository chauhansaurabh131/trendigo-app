// import {call, put, takeLatest} from 'redux-saga/effects';
// import axios from 'axios';
// import {
//   ADD_ADDRESS_REQUEST,
//   addAddressSuccess,
//   addAddressFailure,
//   UPDATE_ADDRESS_REQUEST,
//   GET_ADDRESS_REQUEST,
//   DELETE_ADDRESS_REQUEST,
//   DELETE_ADDRESS_SUCCESS,
//   GET_ADDRESS_SUCCESS,
//   getAddressRequest,
// } from '../actions/addressActions';

// /* -------------------------------------------
//    1️⃣ ADD NEW ADDRESS (POST)
// -------------------------------------------- */
// function* addAddressWorker(action) {
//   try {
//     const {token, userId, data} = action.payload;

//     if (!token || !userId) {
//       console.log('ADD ERROR: Missing token or userId');
//       return;
//     }

//     const response = yield call(
//       axios.post,
//       'https://mntrendigo.mntech.website/api/v1/user/userAddress/',
//       data,
//       {headers: {Authorization: `Bearer ${token}`}},
//     );

//     console.log('ADD SUCCESS SAGA:', response.data);

//     yield put(addAddressSuccess(response.data.data, data));
//     yield put(getAddressRequest({token, userId}));
//   } catch (error) {
//     console.log('ADD ERROR:', error.response?.data || error.message);
//     yield put(addAddressFailure(error.response?.data || error.message));
//   }
// }

// /* -------------------------------------------
//    2️⃣ UPDATE ADDRESS (PUT)
// // -------------------------------------------- */
// function* updateAddressSaga(action) {
//   try {
//     const {token, id, data, userId} = action.payload;

//     const response = yield call(
//       axios.put,
//       `https://mntrendigo.mntech.website/api/v1/user/userAddress/${id}`,
//       data,
//       {headers: {Authorization: `Bearer ${token}`}},
//     );

//     console.log('UPDATE SUCCESS:', response.data);

//     // Refresh list
//     // yield put({type: GET_ADDRESS_REQUEST, payload: {token, userId}});
//     yield put(getAddressRequest({token, userId}));
//   } catch (e) {
//     console.log('UPDATE ERROR', e.response?.data || e.message);
//   }
// }

// // /* -------------------------------------------
// //    3️⃣ GET USER ADDRESS LIST (GET)
// // -------------------------------------------- */
// function* getAddressSaga(action) {
//   try {
//     const {token, userId} = action.payload;

//     if (!token || !userId) {
//       console.log('GET ERROR: Missing token or userId');
//       return;
//     }

//     const res = yield call(
//       axios.get,
//       `https://mntrendigo.mntech.website/api/v1/user/userAddress/get-by-user/${userId}`,
//       {headers: {Authorization: `Bearer ${token}`}},
//     );

//     console.log('GET SUCCESS:', res.data);

//     yield put({type: GET_ADDRESS_SUCCESS, data: res.data.data});
//   } catch (e) {
//     console.log('GET ERROR', e.response?.data || e.message);
//   }
// }

// // /* -------------------------------------------
// //    4️⃣ DELETE ADDRESS (DELETE)
// // -------------------------------------------- */
// function* deleteAddressSaga(action) {
//   try {
//     const {token, addressId} = action.payload;

//     if (!addressId) {
//       console.log('DELETE ERROR: Missing addressId');
//       return;
//     }

//     yield call(
//       axios.delete,
//       `https://mntrendigo.mntech.website/api/v1/user/userAddress/${addressId}`,
//       {headers: {Authorization: `Bearer ${token}`}},
//     );

//     // yield put({type: DELETE_ADDRESS_SUCCESS, id: addressId});
//     yield put({type: 'DELETE_ADDRESS_SUCCESS', id: action.addressId});
//   } catch (e) {
//     console.log('DELETE ERROR', e.response?.data || e.message);
//   }
// }

// /* -------------------------------------------
//    EXPORT ROOT SAGA
// -------------------------------------------- */
// export default function* watchAddAddress() {
//   yield takeLatest(ADD_ADDRESS_REQUEST, addAddressWorker);
//   yield takeLatest(UPDATE_ADDRESS_REQUEST, updateAddressSaga);
//   yield takeLatest(GET_ADDRESS_REQUEST, getAddressSaga);
//   yield takeLatest(DELETE_ADDRESS_REQUEST, deleteAddressSaga);
// }

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

const api = axios.create({
  baseURL: 'https://mntrendigo.mntech.website/api/v1',
});

// ---------- GET ADDRESS by user ----------
function* getAddressSaga(action) {
  const {userId, token} = action;

  console.log('📌 GET_ADDRESS_REQUEST SAGA CALLED');
  console.log('➡ UserId:', userId);
  console.log('➡ Token:', token);
  // ⛔ HARD STOP (MOST IMPORTANT)
  if (!token || !userId) {
    console.log('⛔ GET_ADDRESS stopped (no token or userId)');
    return;
  }

  try {
    const res = yield call(() =>
      api.get(`/user/userAddress/get-by-user/${userId}`, {
        headers: {Authorization: `Bearer ${token}`},
      }),
    );

    console.log('✅ GET ADDRESS API RESPONSE:', res.data);

    yield put({type: GET_ADDRESS_SUCCESS, data: res.data.data});
  } catch (err) {
    console.log('❌ GET ADDRESS ERROR:', err?.response?.data || err.message);

    yield put({
      type: GET_ADDRESS_FAILURE,
      error: err.response?.data,
    });
  }
}

// ---------- ADD ADDRESS ----------
function* addAddressSaga(action) {
  const {payload, token} = action;

  console.log('📌 ADD_ADDRESS_REQUEST SAGA CALLED');
  console.log('➡ Payload:', payload);
  console.log('➡ Token:', token);

  if (!token || !payload?.userId) {
    console.log('⛔ ADD_ADDRESS stopped');
    return;
  }
  try {
    const res = yield call(() =>
      api.post('/user/userAddress', payload, {
        headers: {Authorization: `Bearer ${token}`},
      }),
    );

    console.log('✅ ADD ADDRESS API RESPONSE:', res.data);

    yield put({type: ADD_ADDRESS_SUCCESS});
    yield put({type: GET_ADDRESS_REQUEST, userId: payload.userId, token});
  } catch (err) {
    console.log('❌ ADD ADDRESS ERROR:', err?.response?.data || err.message);

    yield put({
      type: ADD_ADDRESS_FAILURE,
      error: err.response?.data,
    });
  }
}

function* updateAddressSaga(action) {
  try {
    const {addressId, payload, token, userId} = action;
    console.log('UPDATE SAGA ACTION:', action);
    if (!token || !userId || !addressId) {
      console.log('⛔ UPDATE_ADDRESS stopped');
      return;
    }
    const response = yield call(() =>
      axios.put(
        `https://mntrendigo.mntech.website/api/v1/user/userAddress/${addressId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    console.log('UPDATE SUCCESS:', response.data);

    yield put({type: UPDATE_ADDRESS_SUCCESS, data: response.data.data});

    yield put(getAddressRequest(userId, token));
  } catch (error) {
    console.log('UPDATE ERROR:', error?.response?.data || error.message);
    yield put({type: UPDATE_ADDRESS_FAILURE, error});
  }
}

// ---------- DELETE ADDRESS ----------
function* deleteAddressSaga(action) {
  try {
    const {addressId, token, userId} = action;
    if (!token || !userId || !addressId) {
      console.log('⛔ DELETE_ADDRESS stopped');
      return;
    }

    console.log('🔥 DELETE SAGA RECEIVED:', action);
    console.log('➡ Address ID:', addressId);
    console.log('➡ Token:', token);
    console.log('➡ User ID:', userId);
    const response = yield call(() =>
      api.delete(`/user/userAddress/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );

    console.log('✅ DELETE SUCCESS:', response.data);

    // remove deleted from redux
    yield put({
      type: DELETE_ADDRESS_SUCCESS,
      addressId,
    });

    // re-fetch updated list
    yield put(getAddressRequest(userId, token));
  } catch (error) {
    console.log('❌ DELETE ERROR:', error?.response?.data || error.message);
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
