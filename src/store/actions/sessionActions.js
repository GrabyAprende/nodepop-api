import { login } from "../../pages/auth/service";
import storage from "../../utils/storage";

export const A_LOGIN_REQUEST = "LOGIN_REQUEST";
export const A_LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const A_LOGIN_FAILURE = "LOGIN_FAILURE";
export const A_LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const A_AUTH_LOGOUT = "AUTH_LOGOUT";

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

export const authLogin = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const token = await login(credentials);
    dispatch(loginSuccess(token));

    storage.set("nodePopCredentials", credentials, token);
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const authLogout = () => ({
  type: A_AUTH_LOGOUT,
});
