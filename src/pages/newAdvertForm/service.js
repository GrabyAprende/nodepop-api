import client from "../../api/cliente";

export const getTags = () => {
  return client.get("/api/v1/adverts/tags");
};

export const createAdvert = async (adverData) => {
  const newAdvert = await client.post("/api/v1/adverts", adverData);
  return newAdvert;
};
