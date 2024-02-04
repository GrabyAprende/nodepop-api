export const A_SET_ADVERTS = "SET_ADVERTS";
export const A_REMOVE_ADVERTS = "REMOVE_ADVERTS";

export const setAdverts = (adverts) => {
  return {
    type: A_SET_ADVERTS,
    payload: adverts,
  };
};

export const removeAdverts = () => {
  return {
    type: A_REMOVE_ADVERTS,
  };
};
