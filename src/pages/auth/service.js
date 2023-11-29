import client, { setAuthorizationHeader } from "../../api/cliente";

export const login = credentials => {
    return client
    .post('/api/auth/login', credentials)
    .then(({ accessToken }) => setAuthorizationHeader(accessToken))
    
};