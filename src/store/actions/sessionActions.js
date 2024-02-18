import {
  A_AUTH_LOGOUT,
  A_LOGIN_FAILURE,
  A_LOGIN_REQUEST,
  A_LOGIN_SUCCESS,
} from "../types";

export const loginRequest = () => ({
  type: A_LOGIN_REQUEST,
});

export const loginSuccess = () => ({
  type: A_LOGIN_SUCCESS,
});

export const loginFailure = (error) => ({
  type: A_LOGIN_FAILURE,
  payload: error,
});

export const authLogin =
  (credentials) =>
  async (dispatch, _getState, { service }) => {
    dispatch(loginRequest());
    try {
      await service.login(credentials);
      dispatch(loginSuccess());
    } catch (error) {
      dispatch(loginFailure(error));
      throw error;
    }
  };

export const authLogout = () => ({
  type: A_AUTH_LOGOUT,
});
