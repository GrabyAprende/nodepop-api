import client from "../../api/cliente";

export function getAdvert(id) {
    return client.get(`/api/v1/adverts/${id}`);
}

export function deleteAdvert(id) {
    return client.delete(`/api/v1/adverts/${id}`);
}
