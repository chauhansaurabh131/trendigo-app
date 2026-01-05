// import {
//   ADD_ADDRESS_REQUEST,
//   ADD_ADDRESS_SUCCESS,
//   ADD_ADDRESS_FAILURE,
//   GET_ADDRESS_SUCCESS,
//   DELETE_ADDRESS_SUCCESS,
//   UPDATE_ADDRESS_SUCCESS,
// } from '../actions/addressActions';

// const initialState = {
//   loading: false,
//   addressList: [],
//   error: null,
// };

// export default function addressReducer(state = initialState, action) {
//   switch (action.type) {
//     // ADD REQUEST
//     case ADD_ADDRESS_REQUEST:
//       return {...state, loading: true};

//     // ADD SUCCESS
//     case ADD_ADDRESS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         addressList: [...state.addressList, action.data],
//       };

//     // ADD FAILED
//     case ADD_ADDRESS_FAILURE:
//       return {...state, loading: false, error: action.error};

//     // GET LIST SUCCESS
//     case GET_ADDRESS_SUCCESS:
//       return {
//         ...state,
//         // addressList: action.data,
//         addressList: action.data || [], // make sure backend returns array
//       };

//     // DELETE SUCCESS
//     case DELETE_ADDRESS_SUCCESS:
//       return {
//         ...state,
//         addressList: state.addressList.filter(item => item._id !== action.id),
//       };
//     case UPDATE_ADDRESS_SUCCESS:
//       return {
//         ...state,
//         addressList: state.addressList.map(item =>
//           item._id === action.data._id ? action.data : item,
//         ),
//       };

//     default:
//       return state;
//   }
// }

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
} from '../actions/addressActions';
import {LOGOUT} from '../actions/authActions';
// const initialState = {
//   loading: false,
//   list: [],
//   error: null,
// };

// export default function addressReducer(state = initialState, action) {
//   switch (action.type) {
//     case GET_ADDRESS_REQUEST:
//     case ADD_ADDRESS_REQUEST:
//     case UPDATE_ADDRESS_REQUEST:
//     case DELETE_ADDRESS_REQUEST:
//       return {...state, loading: true};

//     case GET_ADDRESS_SUCCESS:
//       return {...state, loading: false, list: action.data};

//     case ADD_ADDRESS_SUCCESS:
//     case UPDATE_ADDRESS_SUCCESS:
//     case DELETE_ADDRESS_SUCCESS:
//       return {
//         ...state,
//         list: state.list.filter(item => item.addressId !== action.addressId),
//       };

//     case GET_ADDRESS_FAILURE:
//     case ADD_ADDRESS_FAILURE:
//     case UPDATE_ADDRESS_FAILURE:
//     case DELETE_ADDRESS_FAILURE:
//       return {...state, loading: false, error: action.error};

//     default:
//       return state;
//   }
// }

const initialState = {
  loading: false,
  list: [],
  error: null,
};

export default function addressReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ADDRESS_REQUEST:
    case ADD_ADDRESS_REQUEST:
    case UPDATE_ADDRESS_REQUEST:
    case DELETE_ADDRESS_REQUEST:
      return {...state, loading: true};

    case GET_ADDRESS_SUCCESS:
      return {...state, loading: false, list: action.data};

    case ADD_ADDRESS_SUCCESS:
      return {...state, loading: false};

    case UPDATE_ADDRESS_SUCCESS:
      return {...state, loading: false};

    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.filter(item => item.addressId !== action.addressId),
      };

    case GET_ADDRESS_FAILURE:
    case ADD_ADDRESS_FAILURE:
    case UPDATE_ADDRESS_FAILURE:
    case DELETE_ADDRESS_FAILURE:
      return {...state, loading: false, error: action.error};
    case LOGOUT:
      return initialState; // 🔥 clear all address data

    default:
      return state;
  }
}
