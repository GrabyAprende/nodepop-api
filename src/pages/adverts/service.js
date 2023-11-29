//creamos un método para obtener los ultimos anuncios por este cliente
import client from "../../api/cliente";

const advertURL = '/api/v1/adverts'

//otro método para que me devuelva la promesa
export const getLatestAdverts = async ( ) => {
    const tupi = await client.post("/api/auth/login", {
        "email": "victor@tupi.com",
        "password": "12345678"
    })

    console.log({ tupi })

    await client.get("/api/auth/me")

    return client.get(advertURL);
};

//luego hacer la llamada desde mi componente(fichero)