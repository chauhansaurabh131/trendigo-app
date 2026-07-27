import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
  UPLOAD_PROFILE_PIC_REQUEST,
  uploadProfilePicSuccess,
  uploadProfilePicFailure,
} from '../actions/profileImageActions';
import api from '../../api/apiClient';

const getUploadUrlApi = (fileName, contentType) => {
  return api.post('/s3/profilepic', {
    key: fileName,
    contentType: contentType,
    profileType: 'profileImage',
    isProfilePic: true,
  });
};
// };

//  S3 upload (PUT)
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
    console.log('UPLOAD IMAGE SAGA STARTED', action.payload);

    const image = action.payload;
    // const token = yield select(getToken);

    const fileName = `profile_${Date.now()}.jpg`;

    const response = yield call(getUploadUrlApi, fileName, image.type);

    console.log(' UPLOAD IMAGE PRESIGNED URL RESPONSE', response.data);

    const uploadUrl = response.data?.data?.url;

    console.log(' UPLOAD URL', uploadUrl);
    console.log(' API RESPONSE', response);

    yield call(uploadToS3Api, uploadUrl, image);

    //  Send clean URL to redux
    const cleanUrl = uploadUrl.split('?')[0];
    yield put(uploadProfilePicSuccess(cleanUrl));
  } catch (error) {
    console.log('UPLOAD IMAGE SAGA ERROR', error);
    yield put(uploadProfilePicFailure(error.message));
  }
}

export function* profileImageWatcher() {
  yield takeLatest(UPLOAD_PROFILE_PIC_REQUEST, uploadProfilePicSaga);
}
