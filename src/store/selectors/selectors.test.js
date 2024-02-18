import { getIsLoading, getIsLogged, getSessionError } from "./sessionSelectors";

describe("getIsLogged", () => {
  it("should get the token", () => {
    let state = { session: { auth: false } };
    expect(getIsLogged(state)).toEqual(false);
    state = { session: { auth: true } };
    expect(getIsLogged(state)).toEqual(true);
  });
});
describe("getSessionError", () => {
  it("should get the token", () => {
    const state = { session: { error: "some error" } };
    expect(getSessionError(state)).toEqual("some error");
  });
});
describe("getIsLoading", () => {
  it("should get the token", () => {
    let state = { session: { isLoading: false } };
    expect(getIsLoading(state)).toEqual(false);
    state = { session: { isLoading: true } };
    expect(getIsLoading(state)).toEqual(true);
  });
});
