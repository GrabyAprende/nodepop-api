export const A_SET_ADVERTS = "SET_ADVERTS";
export const A_REMOVE_ADVERTS = "REMOVE_ADVERTS";
export const A_SET_TAGS = "SET_TAGS";
export const A_NEW_ADVERT = "NEW_ADVERT";
export const A_DELETE_ADVERT = "DELETE_ADVERT";

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

export const addNewAdvert = (newAdvert) => {
  return {
    type: A_NEW_ADVERT,
    payload: newAdvert,
  };
};

export const removeAdvert = (id) => {
  return {
    type: A_DELETE_ADVERT,
    payload: id,
  };
};

export const setTags = (tags) => {
  return {
    type: A_SET_TAGS,
    payload: tags,
  };
};
