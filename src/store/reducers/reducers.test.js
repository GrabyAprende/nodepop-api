import sessionReducer from "../reducers/sessionReducer";

const initialSessionState = {
  auth: false,
  error: null,
  isLoading: false,
};

describe("sessionReducer", () => {
  test('should manage "LOGIN_REQUEST" action', () => {
    const action = { type: "LOGIN_REQUEST" };
    const prevState = initialSessionState;
    const expectedState = { auth: false, error: null, isLoading: true };
    expect(sessionReducer(prevState, action)).toEqual(expectedState);
  });
  test('should manage "LOGIN_FAILURE" action', () => {
    const action = { type: "LOGIN_FAILURE", payload: "some error" };
    const prevState = initialSessionState;
    const expectedState = {
      auth: false,
      error: "some error",
      isLoading: false,
    };
    expect(sessionReducer(prevState, action)).toEqual(expectedState);
  });
  test('should manage "LOGIN_SUCCESS" action', () => {
    const action = { type: "LOGIN_SUCCESS" };
    const prevState = initialSessionState;
    const expectedState = { auth: true, error: null, isLoading: false };
    expect(sessionReducer(prevState, action)).toEqual(expectedState);
  });
  test('should manage "LOGIN_LOGOUT" action', () => {
    const action = { type: "LOGIN_LOGOUT" };
    const prevState = initialSessionState;
    const expectedState = { auth: false, error: null, isLoading: false };
    expect(sessionReducer(prevState, action)).toEqual(expectedState);
  });
});
