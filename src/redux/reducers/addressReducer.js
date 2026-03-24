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

const initialState = {
  loading: false,
  list: [],
  error: null,
};

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
//       return {...state, loading: false};

//     case UPDATE_ADDRESS_SUCCESS:
//       return {...state, loading: false};

//     case DELETE_ADDRESS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         list: state.list.filter(item => item.addressId !== action.addressId),
//       };

//     case GET_ADDRESS_FAILURE:
//     case ADD_ADDRESS_FAILURE:
//     case UPDATE_ADDRESS_FAILURE:
//     case DELETE_ADDRESS_FAILURE:
//       return {...state, loading: false, error: action.error};
//     case LOGOUT:
//       return initialState; // 🔥 clear all address data

//     default:
//       return state;
//   }
// }

//new code after change

export default function addressReducer(state = initialState, action) {
  switch (action.type) {
    // ✅ REQUEST → clear error
    case GET_ADDRESS_REQUEST:
    case ADD_ADDRESS_REQUEST:
    case UPDATE_ADDRESS_REQUEST:
    case DELETE_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // ✅ FIX
      };

    // ✅ GET SUCCESS
    case GET_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.data,
        error: null, // ✅ FIX
      };

    // ✅ ADD SUCCESS
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null, // ✅ FIX
        list: [...state.list, action.data], // ✅ ADD NEW ADDRESS
      };

    // ✅ UPDATE SUCCESS
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null, // ✅ FIX
      };

    // ✅ DELETE SUCCESS
    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null, // ✅ FIX
        list: state.list.filter(item => item.id !== action.addressId), // ⚠️ FIX id
      };

    // ❌ FAILURE
    case GET_ADDRESS_FAILURE:
    case ADD_ADDRESS_FAILURE:
    case UPDATE_ADDRESS_FAILURE:
    case DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
}
