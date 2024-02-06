// LoginPage.test.js
import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import LoginPage from "../LoginPage";

const mockStore = configureStore([]);
const store = mockStore({});

describe("LoginPage", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <LoginPage />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
