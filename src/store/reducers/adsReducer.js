import { A_REMOVE_ADVERTS, A_SET_ADVERTS } from "../actions/adsActions";

const initialState = {
  adverts: [],
  tags: [],
};

function adsReducer(state = initialState, action) {
  switch (action.type) {
    case A_SET_ADVERTS:
      return { ...state, adverts: action.payload };
    case A_REMOVE_ADVERTS:
      return { ...state, adverts: [] };
    default:
      return state;
  }
}

export default adsReducer;
