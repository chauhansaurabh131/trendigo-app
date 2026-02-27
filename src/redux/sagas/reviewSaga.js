import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ADD_REVIEW_REQUEST,
  addReviewSuccess,
  addReviewFailure,
  GET_USER_REVIEWS_REQUEST,
  getUserReviewsSuccess,
  getUserReviewsFailure,
  GET_PRESIGNED_URL_REQUEST,
} from '../actions/reviewActions';
console.log('🟣 REVIEW SAGA FILE LOADED');

const uploadImageToS3 = async (uploadUrl, file) => {
  const response = await fetch(file.uri);
  const blob = await response.blob();

  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: blob,
  });

  return uploadResponse;
};

function addReviewApi(data, token) {
  return axios.post(
    'https://mntrendigo.mntech.website/api/v1/user/review/',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
function* addReviewSaga(action) {
  try {
    console.log('🟢 ADD REVIEW SAGA CALLED');
    console.log('📦 Payload:', action.payload);

    // const token = yield select(state => state.auth.token);

    // console.log('🟢 TOKEN FROM REDUX:', token);
    const token = yield call(AsyncStorage.getItem, 'authToken');
    console.log('🟢 TOKEN FROM ASYNC STORAGE IN REVIEW SAGA:', token);
    if (!token) {
      throw new Error('Token missing');
    }

    const response = yield call(addReviewApi, action.payload, token);
    console.log('✅ API RESPONSE:', response.data);

    yield put(addReviewSuccess(response.data));
  } catch (error) {
    console.log('❌ ADD REVIEW ERROR:', error);
    console.log('❌ STATUS:', error.response?.status);
    console.log('❌ BACKEND ERROR:', error.response?.data);
    yield put(addReviewFailure(error.response?.data || error.message));
  }
}

//get reviews by user id

// function getUserReviewsApi(userId, token) {
//   return axios.get(
//     `https://mntrendigo.mntech.website/api/v1/user/review/by-user/${userId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );
// }

function getPresignedUrlApi(data, token) {
  return axios.post(
    'https://mntrendigo.mntech.website/api/v1/s3/presignedurlv2',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
function* getPresignedUrlSaga(action) {
  try {
    console.log(' GET_PRESIGNED_URL_SAGA CALLED');
    console.log('Incoming Payload:', action.payload);

    const token = yield call(AsyncStorage.getItem, 'authToken');
    console.log(' Token from AsyncStorage:', token);

    if (!token) {
      throw new Error('Token missing in presigned saga');
    }

    //  ONLY send required fields to backend
    const presignedPayload = {
      key: action.payload.key,
      contentType: action.payload.contentType,
      name: action.payload.key,
    };

    console.log('Calling Presigned URL API...');
    const response = yield call(getPresignedUrlApi, presignedPayload, token);

    console.log(' Presigned API Full Response:', response.data);
    const imageUrl = response.data.data.imageUrl;
    const uploadUrl = response?.data?.data?.url;
    const imageKey = response?.data?.data?.key;

    if (!uploadUrl || !imageKey) {
      throw new Error('Invalid presigned response');
    }

    console.log(' Uploading image to S3...');

    //  Make sure file exists
    if (!action.payload.file) {
      throw new Error('File missing in payload');
    }

    yield call(uploadImageToS3, uploadUrl, action.payload.file);

    console.log(' Image uploaded successfully');

    // Final review payload
    const reviewPayload = {
      productId: action.payload.productId,
      sellerId: action.payload.sellerId,
      title: action.payload.title,
      description: action.payload.description,
      rating: action.payload.rating,
      isAdminAprove: true,
      // image: imageKey,
      productImages: [imageUrl], //  FULL URL
    };

    console.log('Final Review Payload:', reviewPayload);

    yield put({
      type: ADD_REVIEW_REQUEST,
      payload: reviewPayload,
    });

    console.log(' addReviewRequest dispatched successfully');
  } catch (error) {
    console.log(' PRESIGNED SAGA ERROR:', error);
    console.log('ERROR RESPONSE:', error.response?.data);
  }
}
function getUserReviewsApi(productId) {
  return axios.get(
    `https://mntrendigo.mntech.website/api/v1/user/review/by-product/${productId}`,
  );
}
function* getUserReviewsSaga(action) {
  try {
    console.log(' GET USER REVIEWS SAGA CALLED');
    console.log(' ProductId:', action.payload);

    const response = yield call(getUserReviewsApi, action.payload);

    console.log('USER REVIEWS RESPONSE:', response.data);

    yield put(getUserReviewsSuccess(response.data));
  } catch (error) {
    console.log(' GET USER REVIEWS ERROR:', error.response?.data);
    yield put(
      getUserReviewsFailure(error.response?.data?.message || error.message),
    );
  }
}
export function* watchAddReview() {
  console.log(' watchAddReview running');
  yield takeLatest(ADD_REVIEW_REQUEST, addReviewSaga);
  yield takeLatest(GET_USER_REVIEWS_REQUEST, getUserReviewsSaga);
  yield takeLatest(GET_PRESIGNED_URL_REQUEST, getPresignedUrlSaga);
}
