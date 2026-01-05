// profileImageSaga.js
import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  UPLOAD_PROFILE_PIC_REQUEST,
  uploadProfilePicSuccess,
  uploadProfilePicFailure,
} from '../actions/profileImageActions';

/* =========================
   SELECTOR
========================= */
const getToken = state => state.auth.token;

/* =========================
   API FUNCTIONS (same file)
========================= */

const getUploadUrlApi = (token, fileName, contentType) => {
  return fetch('https://mntrendigo.mntech.website/api/v1/s3/profilepic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      key: fileName,
      contentType: contentType,
      profileType: 'profileImage',
      isProfilePic: true,
    }),
  }).then(res => res.json());
};

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
    const token = yield select(getToken);

    const fileName = `profile_${Date.now()}.jpg`;

    // 1️⃣ get presigned URL
    const response = yield call(getUploadUrlApi, token, fileName, image.type);

    console.log('🟢 API RESPONSE', response);

    // 2️⃣ upload to S3 (VERY IMPORTANT FIX)
    yield call(uploadToS3Api, response.data.url, image);

    // 3️⃣ success
    yield put(
      uploadProfilePicSuccess(
        response.data.url.split('?')[0], // clean image url
      ),
    );
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
