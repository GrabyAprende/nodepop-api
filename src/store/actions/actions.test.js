//lo primero es llamar a la funcion test() o it()
//luego reciben los parametros, nombres del test o algo descriptivo del test
//la funcion describe() de jest, nos sirve para agrupar test

import { A_SET_TOKEN, setToken } from "./sessionActions";
import { addNewAdvert, A_NEW_ADVERT } from "./adsActions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import actions from "./adsActions";
import fetchMock from "fetch-mock";

describe("setToken", () => {
  test('should return an action "A_SET_TOKEN"', () => {
    const token = "1234abcd";
    const expectedAction = {
      type: A_SET_TOKEN,
      payload: token,
    };
    expect(setToken(token)).toEqual(expectedAction);
  });
});

describe("addNewAdvert", () => {
  test('should return object whit "A_NEW_ADVERT" and "payload"', () => {
    const newAdvert = "newAdvert";
    const expectedAction = {
      type: A_NEW_ADVERT,
      payload: newAdvert,
    };
    expect(addNewAdvert(newAdvert)).toEqual(expectedAction);
  });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("adsActions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates A_SET_ADVERTS when fetching adverts has been done", async () => {
    fetchMock.getOnce("/api/adverts", {
      body: { adverts: ["Advert 1", "Advert 2"] },
      headers: { "content-type": "application/json" },
    });
    const expectedActions = [
      { type: actions.A_SET_ADVERTS, payload: ["Advert 1", "Advert 2"] },
    ];
    const store = mockStore({ adverts: [] });

    return store.dispatch(actions.fetchAdverts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
