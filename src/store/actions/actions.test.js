//lo primero es llamar a la funcion test() o it()
//luego reciben los parametros, nombres del test o algo descriptivo del test
//la funcion describe() de jest, nos sirve para agrupar test

import { A_SET_TOKEN, setToken, loginThunk } from "./sessionActions";
import { addNewAdvert, A_NEW_ADVERT } from "./adsActions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
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

fetchMock.enableMocks();

// Resetea el mock fetch antes de cada prueba
beforeEach(() => {
  fetchMock.resetMocks();
});

it("dispatches A_LOGIN_SUCCESS when login is successful", async () => {
  // Simula una respuesta exitosa de la API
  fetchMock.mockResponseOnce(JSON.stringify({ token: "fakeToken" }));

  const expectedActions = [
    { type: "LOGIN_REQUEST" },
    { type: "LOGIN_SUCCESS", payload: "fakeToken" },
  ];

  const store = mockStore({});

  await store.dispatch(
    loginThunk({ email: "user@example.com", password: "password" })
  );

  expect(store.getActions()).toEqual(expectedActions);
});
