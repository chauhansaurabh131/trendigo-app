export const ADD_REVIEW_REQUEST = 'ADD_REVIEW_REQUEST';
export const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS';
export const ADD_REVIEW_FAILURE = 'ADD_REVIEW_FAILURE';

export const GET_USER_REVIEWS_REQUEST = 'GET_USER_REVIEWS_REQUEST';
export const GET_USER_REVIEWS_SUCCESS = 'GET_USER_REVIEWS_SUCCESS';
export const GET_USER_REVIEWS_FAILURE = 'GET_USER_REVIEWS_FAILURE';
export const GET_PRESIGNED_URL_REQUEST = 'GET_PRESIGNED_URL_REQUEST';
export const GET_PRESIGNED_URL_SUCCESS = 'GET_PRESIGNED_URL_SUCCESS';
export const GET_PRESIGNED_URL_FAILURE = 'GET_PRESIGNED_URL_FAILURE';

export const addReviewRequest = reviewData => ({
  type: ADD_REVIEW_REQUEST,
  payload: reviewData,
});

export const addReviewSuccess = data => ({
  type: ADD_REVIEW_SUCCESS,
  payload: data,
});

export const addReviewFailure = error => ({
  type: ADD_REVIEW_FAILURE,
  payload: error,
});

// action creators
// export const getUserReviewsRequest = userId => ({
//   type: GET_USER_REVIEWS_REQUEST,
//   payload: userId,
// });
export const getUserReviewsRequest = productId => ({
  type: GET_USER_REVIEWS_REQUEST,
  payload: productId,
});
export const getUserReviewsSuccess = data => ({
  type: GET_USER_REVIEWS_SUCCESS,
  payload: data,
});

export const getUserReviewsFailure = error => ({
  type: GET_USER_REVIEWS_FAILURE,
  payload: error,
});
export const getPresignedUrlRequest = data => ({
  type: GET_PRESIGNED_URL_REQUEST,
  payload: data,
});
