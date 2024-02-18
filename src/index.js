import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/store";
import storage from "./utils/storage";

const accessToken = storage.get("auth");

const store = configureStore({ session: { auth: !!accessToken } });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
