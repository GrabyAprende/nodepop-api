import { useLogin } from "../../hooks/useLogin";
import storage from "../../utils/storage";

export const A_SET_TOKEN = "SET_TOKEN";
export const A_REMOVE_TOKEN = "REMOVE_TOKEN";
export const A_LOGIN_REQUEST = "LOGIN_REQUEST";
export const A_LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const A_LOGIN_FAILURE = "LOGIN_FAILURE";

export const setToken = (token) => {
  return {
    type: A_SET_TOKEN,
    payload: token,
  };
};

export const removeToken = () => {
  return {
    type: A_REMOVE_TOKEN,
  };
};

export const loginRequest = () => ({
  type: A_LOGIN_REQUEST,
});

export const loginSuccess = (token) => ({
  type: A_LOGIN_SUCCESS,
  payload: token,
});

export const loginFailure = (error) => ({
  type: A_LOGIN_FAILURE,
  payload: error,
});

export const loginThunk = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const token = await useLogin(credentials);
    dispatch(loginSuccess(token));

    storage.set("nodePopCredentials", credentials, token);
  } catch (error) {
    dispatch(loginFailure(error));
  }
};
