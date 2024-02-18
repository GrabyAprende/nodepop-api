import {
  A_AUTH_LOGOUT,
  A_LOGIN_FAILURE,
  A_LOGIN_REQUEST,
  A_LOGIN_SUCCESS,
} from "../types";

const initialState = {
  auth: false,
  error: null,
  isLoading: false,
};

export function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case A_LOGIN_REQUEST:
      return { ...state, isLoading: true };
    case A_LOGIN_SUCCESS:
      return { ...state, auth: true, isLoading: false, error: null };
    case A_LOGIN_FAILURE:
      return { ...state, auth: false, isLoading: false, error: action.payload };
    case A_AUTH_LOGOUT:
      return { ...state, auth: false, isLoading: false, error: null };
    default:
      return state;
  }
}

export default sessionReducer;
