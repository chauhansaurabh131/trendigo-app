import {
  GET_CHAT_LIST_REQUEST,
  GET_CHAT_LIST_SUCCESS,
  GET_CHAT_LIST_FAILURE,
  UPLOAD_CUSTOMER_CHAT_IMAGE_FAILURE,
  UPLOAD_CUSTOMER_CHAT_IMAGE_REQUEST,
  UPLOAD_CUSTOMER_CHAT_IMAGE_SUCCESS,
  UPLOAD_CUSTOMER_IMAGE_TO_S3_FAILURE,
  UPLOAD_CUSTOMER_IMAGE_TO_S3_REQUEST,
  UPLOAD_CUSTOMER_IMAGE_TO_S3_SUCCESS,
} from '../actions/chatAction';

const initialState = {
  loading: false,
  chatList: [],
  error: null,
  messages: [],
  product: null,
  uploadImageLoading: false,
  uploadedImageData: null,
  uploadingImageError: null,

  uploadCustomerToS3Loading: false,
  uploadedCustomerS3Image: null,
  uploadedCustomerS3ImageError: null,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHAT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CHAT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        chatList: action.payload,
      };

    case GET_CHAT_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'GET_MESSAGES_SUCCESS':
      return {
        ...state,
        messages: action.payload,
        product: action.payload?.[0]?.product || null,
        loading: false,
      };
    case 'ADD_MESSAGE':
      console.log('PAYLOAD =>', action.payload);
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };

    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload,
        product: action.payload?.[0]?.product || null,
        loading: false,
      };

    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter(item => item._id !== action.payload),
      };
    // case 'APPEND_MESSAGES':
    //   return {
    //     ...state,
    //     messages: [...action.payload, ...state.messages],
    //   };

    case 'APPEND_MESSAGES':
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };

    case 'CLEAR_CHAT':
      return {
        ...state,
        conversations: [],
        messages: [],
      };
    case UPLOAD_CUSTOMER_CHAT_IMAGE_REQUEST:
      return {
        ...state,
        uploadImageLoading: true,
      };

    case UPLOAD_CUSTOMER_CHAT_IMAGE_SUCCESS:
      return {
        ...state,
        uploadImageLoading: false,
        uploadedImageData: action.payload,
      };

    case UPLOAD_CUSTOMER_CHAT_IMAGE_FAILURE:
      return {
        ...state,
        uploadImageLoading: false,
        error: action.payload,
      };

    case UPLOAD_CUSTOMER_IMAGE_TO_S3_REQUEST:
      return {
        ...state,
        uploadCustomerToS3Loading: true,
      };

    case UPLOAD_CUSTOMER_IMAGE_TO_S3_SUCCESS:
      console.log('UPLOAD_IMAGE_TO_S3_SUCCESS =>', action.payload);
      return {
        ...state,
        uploadCustomerToS3Loading: false,
        uploadedCustomerS3Image: action.payload,
      };

    case UPLOAD_CUSTOMER_IMAGE_TO_S3_FAILURE:
      return {
        ...state,
        uploadCustomerToS3Loading: false,
        uploadedCustomerS3ImageError: action.payload,
      };
    case 'CLEAR_UPLOADED_IMAGE':
      return {
        ...state,
        uploadedCustomerS3Image: null,
        uploadedImageData: null,
      };
    default:
      return state;
  }
};
