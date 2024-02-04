import {
  A_DELETE_ADVERT,
  A_NEW_ADVERT,
  A_REMOVE_ADVERTS,
  A_SET_ADVERTS,
  A_SET_TAGS,
} from "../actions/adsActions";

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
    case A_NEW_ADVERT:
      return { ...state, adverts: [...state.adverts, action.payload] };
    case A_DELETE_ADVERT:
      return {
        ...state,
        adverts: state.adverts.filter((ad) => ad.id !== action.payload),
      };
    case A_SET_TAGS:
      return { ...state, tags: action.payload };
    default:
      return state;
  }
}

export default adsReducer;
