// profileImageSaga.js
import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  UPLOAD_PROFILE_PIC_REQUEST,
  uploadProfilePicSuccess,
  uploadProfilePicFailure,
} from '../actions/profileImageActions';
import api from '../../api/apiClient';
/* =========================
   SELECTOR
========================= */
// const getToken = state => state.auth.token;

/* =========================
   API FUNCTIONS (same file)
========================= */

// const getUploadUrlApi = (token, fileName, contentType) => {
// return fetch('https://mntrendigo.mntech.website/api/v1/s3/profilepic', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify({
//     key: fileName,
//     contentType: contentType,
//     profileType: 'profileImage',
//     isProfilePic: true,
//   }),
// }).then(res => res.json());

const getUploadUrlApi = (fileName, contentType) => {
  return api.post('/s3/profilepic', {
    key: fileName,
    contentType: contentType,
    profileType: 'profileImage',
    isProfilePic: true,
  });
};
// };

// 2️⃣ S3 upload (PUT)
const uploadToS3Api = (uploadUrl, image) => {
  return fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': image.type,
    },
    body: {
      uri: image.uri,
      type: image.type,
      name: image.fileName || 'profile.jpg',
    },
  });
};

function* uploadProfilePicSaga(action) {
  try {
    console.log('🟢 SAGA STARTED', action.payload);

    const image = action.payload;
    // const token = yield select(getToken);

    const fileName = `profile_${Date.now()}.jpg`;

    // 1️⃣ get presigned URL
    // const response = yield call(getUploadUrlApi, token, fileName, image.type);
    const response = yield call(getUploadUrlApi, fileName, image.type);
    console.log(' PRESIGNED URL RESPONSE', response.data);

    const uploadUrl = response.data?.data?.url; // ✅ correct
    console.log(' UPLOAD URL', uploadUrl);
    console.log(' API RESPONSE', response);

    // 2️⃣ upload to S3 (VERY IMPORTANT FIX)
    // yield call(uploadToS3Api, response.data.url, image);
    yield call(uploadToS3Api, uploadUrl, image);

    // 3️⃣ Send clean URL to redux
    const cleanUrl = uploadUrl.split('?')[0];
    yield put(uploadProfilePicSuccess(cleanUrl)); // ✅ correct
    // 3️⃣ success
    // yield put(
    //   uploadProfilePicSuccess(
    //     response.data.url.split('?')[0], // clean image url
    //   ),
    // );
  } catch (error) {
    console.log('🔴 SAGA ERROR', error);
    yield put(uploadProfilePicFailure(error.message));
  }
}

/* =========================
   WATCHER
========================= */

export function* profileImageWatcher() {
  yield takeLatest(UPLOAD_PROFILE_PIC_REQUEST, uploadProfilePicSaga);
}
