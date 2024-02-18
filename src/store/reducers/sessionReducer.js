import {
  A_AUTH_LOGOUT,
  A_LOGIN_FAILURE,
  A_LOGIN_REQUEST,
} from "../actions/sessionActions";

const initialState = {
  auth: false,
  error: null,
};

export function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case A_LOGIN_REQUEST:
      return { ...state, auth: true, error: null };
    case A_LOGIN_FAILURE:
      return { ...state, auth: false, error: action.payload };
    case A_AUTH_LOGOUT:
      return { ...state, auth: false, error: null };
    default:
      return state;
  }
}

export default sessionReducer;
