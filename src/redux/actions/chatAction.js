export const GET_CHAT_LIST_REQUEST = 'GET_CHAT_LIST_REQUEST';
export const GET_CHAT_LIST_SUCCESS = 'GET_CHAT_LIST_SUCCESS';
export const GET_CHAT_LIST_FAILURE = 'GET_CHAT_LIST_FAILURE';
export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';

export const UPLOAD_CUSTOMER_CHAT_IMAGE_REQUEST =
  'UPLOAD_CUSTOMER_CHAT_IMAGE_REQUEST';

export const UPLOAD_CUSTOMER_CHAT_IMAGE_SUCCESS =
  'UPLOAD_CUSTOMER_CHAT_IMAGE_SUCCESS';

export const UPLOAD_CUSTOMER_CHAT_IMAGE_FAILURE =
  'UPLOAD_CUSTOMER_CHAT_IMAGE_FAILURE';

export const UPLOAD_CUSTOMER_IMAGE_TO_S3_REQUEST =
  'UPLOAD_CUSTOMER_IMAGE_TO_S3_REQUEST';

export const UPLOAD_CUSTOMER_IMAGE_TO_S3_SUCCESS =
  'UPLOAD_CUSTOMER_IMAGE_TO_S3_SUCCESS';

export const UPLOAD_CUSTOMER_IMAGE_TO_S3_FAILURE =
  'UPLOAD_CUSTOMER_IMAGE_TO_S3_FAILURE';

export const getChatListRequest = () => ({
  type: GET_CHAT_LIST_REQUEST,
});

export const getChatListSuccess = data => ({
  type: GET_CHAT_LIST_SUCCESS,
  payload: data,
});

export const getChatListFailure = error => ({
  type: GET_CHAT_LIST_FAILURE,
  payload: error,
});

export const getMessagesRequest = sellerId => ({
  type: 'GET_MESSAGES_REQUEST',
  payload: sellerId,
});

export const uploadCustomerChatImageRequest = payload => ({
  type: UPLOAD_CUSTOMER_CHAT_IMAGE_REQUEST,
  payload,
});

export const uploadCustomerChatImageSuccess = payload => ({
  type: UPLOAD_CUSTOMER_CHAT_IMAGE_SUCCESS,
  payload,
});

export const uploadCustomerChatImageFailure = payload => ({
  type: UPLOAD_CUSTOMER_CHAT_IMAGE_FAILURE,
  payload,
});
export const uploadImageToS3Request = payload => ({
  type: UPLOAD_CUSTOMER_IMAGE_TO_S3_REQUEST,
  payload,
});
