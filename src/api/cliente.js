import axios from 'axios';

//funcion de axios para crear cliente, configurando la url que se usara siempre.
const client = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});
//definimos un interceptor de respuesta, y cuando haya una respuesta que me la devuelva dentro de response.DATA
client.interceptors.response.use(response => response.data,
    error => {
        if (error.response) {
            console.log(error.response);
        
            return Promise.reject({
            message: error.response.statusText,
            ...error.response,
            ...error.response.data,
        });
        }
        // Request error
        return Promise.reject({ message: error.message });
    },
    );

export const setAuthorizationHeader = token =>
    (client.defaults.headers.common['Authorization'] = `Bearer ${token}`);

export const removeAuthorizationHeader = () => {
    delete client.defaults.headers.common['Authorization'];
};

export default client;