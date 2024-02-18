import client from "../../api/cliente";

export function getAdvert(id) {
  return client.get(`/v1/adverts/${id}`);
}

export function deleteAdvert(id) {
  return client.delete(`/v1/adverts/${id}`);
}
