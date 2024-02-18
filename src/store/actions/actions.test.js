import {
  authLogin,
  loginFailure,
  loginRequest,
  loginSuccess,
} from "./sessionActions";

describe("authLogin", () => {
  const credentials = "credentials";
  const action = authLogin(credentials);
  const dispatch = jest.fn();
  const service = { login: {} };

  describe("when login api resolves", () => {
    test("should follow the login flow", async () => {
      service.login = jest.fn().mockResolvedValue();
      await action(dispatch, undefined, { service });
      expect(dispatch).toHaveBeenNthCalledWith(1, loginRequest());
      expect(service.login).toHaveBeenCalledWith(credentials);
      expect(dispatch).toHaveBeenNthCalledWith(2, loginSuccess());
    });
  });

  describe("when login api rejects", () => {
    const error = new Error("ooops");
    test("should follow the error flow", async () => {
      service.login = jest.fn().mockRejectedValue(error);

      const promise = action(dispatch, undefined, { service });
      await expect(promise).rejects.toThrow(error);
      expect(dispatch).toHaveBeenNthCalledWith(1, loginRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, loginFailure(error));
    });
  });
});
