import { combineReducers } from "redux";
import sessionReducer from "./sessionReducer";
import adsReducer from "./adsReducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  adverts: adsReducer,
});

export default rootReducer;
