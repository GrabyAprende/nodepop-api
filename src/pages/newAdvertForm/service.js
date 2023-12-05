import client from "../../api/cliente";

export const getTags = () => {
    return client.get('/api/v1/adverts/tags')
}

export const createAdvert = async (adverData) => {
    await client.post('/api/v1/adverts', adverData);
    // const tupi = await client.get('/api/v1/adverts')
    // console.log({ tupi })

}