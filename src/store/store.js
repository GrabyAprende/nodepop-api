import { legacy_createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducers";
import { withExtraArgument } from "redux-thunk";
import * as advertsService from "../pages/adverts/service";
import * as authService from "../pages/auth/service";
import * as advertService from "../pages/advertPage/service";
import * as newAdvertService from "../pages/newAdvertForm/service";

export default function configureStore(preloadedState) {
  const middlewares = [
    withExtraArgument({
      service: {
        ...advertsService,
        ...authService,
        ...advertService,
        ...newAdvertService,
      },
    }),
  ];

  const store = legacy_createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
}
