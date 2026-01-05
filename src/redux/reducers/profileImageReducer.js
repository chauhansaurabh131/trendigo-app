// // profileImageReducer.js
// import {
//   UPLOAD_PROFILE_PIC_REQUEST,
//   UPLOAD_PROFILE_PIC_SUCCESS,
//   UPLOAD_PROFILE_PIC_FAILURE,
// } from '../actions/profileImageActions';

// const initialState = {
//   loading: false,
//   imageUrl: null,
//   error: null,
// };

// export default function profileImageReducer(state = initialState, action) {
//   switch (action.type) {
//     case UPLOAD_PROFILE_PIC_REQUEST:
//       return {...state, loading: true};

//     case UPLOAD_PROFILE_PIC_SUCCESS:
//       console.log('🎯 REDUCER HIT', action.payload);
//       return {
//         ...state,
//         loading: false,
//         imageUrl: action.payload,
//       };

//     case UPLOAD_PROFILE_PIC_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// }

import {
  UPLOAD_PROFILE_PIC_REQUEST,
  UPLOAD_PROFILE_PIC_SUCCESS,
  UPLOAD_PROFILE_PIC_FAILURE,
} from '../actions/profileImageActions';
import {LOGOUT} from '../actions/authActions';
const initialState = {
  imageUrl: null,
  loading: false,
  error: null,
};

export default function profileImageReducer(state = initialState, action) {
  // console.log('🧩 PROFILE IMAGE REDUCER HIT:', action.type);

  switch (action.type) {
    case UPLOAD_PROFILE_PIC_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPLOAD_PROFILE_PIC_SUCCESS:
      return {
        ...state,
        loading: false,
        imageUrl: action.payload,
      };

    case UPLOAD_PROFILE_PIC_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return initialState; // 🔥 THIS FIXES YOUR ISSUE
    default:
      return state;
  }
}
