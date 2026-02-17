// reviewByUserIdAction.js

export const REVIEW_BY_USER_ID_REQUEST = 'REVIEW_BY_USER_ID_REQUEST';
export const REVIEW_BY_USER_ID_SUCCESS = 'REVIEW_BY_USER_ID_SUCCESS';
export const REVIEW_BY_USER_ID_FAILURE = 'REVIEW_BY_USER_ID_FAILURE';

export const ReviewUserIdAction = (userId, token) => {
  return {
    type: REVIEW_BY_USER_ID_REQUEST,
    payload: {userId, token},
  };
};
