import storage from "../../utils/storage";

const initialState = {
  token: storage.get("auth") || null,
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "REMOVE_TOKEN":
      return { ...state, token: null };
    default:
      return state;
  }
}

export default sessionReducer;
