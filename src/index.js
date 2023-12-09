import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/cliente";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./pages/auth/context";

const accessToken = storage.get("auth");

if (!!accessToken) {
  setAuthorizationHeader(accessToken);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider initiallyLogged={!!accessToken}>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
