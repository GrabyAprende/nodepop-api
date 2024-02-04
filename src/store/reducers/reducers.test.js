import { sessionReducer } from "./sessionReducer";

describe("sessionReducer", () => {
  test("should handle SET_TOKEN", () => {
    expect(
      sessionReducer(
        {},
        {
          type: "SET_TOKEN",
          payload: "123abc",
        }
      )
    ).toEqual({ token: "123abc" });
  });
});
