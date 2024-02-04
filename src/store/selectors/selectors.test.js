import { getToken } from "./sessionSelectors";

describe("getToken", () => {
  it("should get the token", () => {
    const state = { session: { token: "1234abcd" } };
    expect(getToken(state)).toEqual("1234abcd");
  });
});
