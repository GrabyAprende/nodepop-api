export const A_SET_TOKEN = "SET_TOKEN";
export const A_REMOVE_TOKEN = "REMOVE_TOKEN";

export const setToken = (token) => {
  return {
    type: A_SET_TOKEN,
    payload: token,
  };
};

export const removeToken = () => {
  return {
    type: A_REMOVE_TOKEN,
  };
};
