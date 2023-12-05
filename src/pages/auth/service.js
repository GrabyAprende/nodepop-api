import client, { setAuthorizationHeader } from "../../api/cliente";
import storage from "../../utils/storage";

export const login = loginData => {
    const { email, password, rememberMe } = loginData;
    return client
    .post('/api/auth/login', { email, password})
    .then(({ accessToken }) => {
        setAuthorizationHeader(accessToken);
        storage.set('auth', accessToken);
        
        if (rememberMe) {
            storage.set('nodePopCredentials', { email, password });
        }
    }).catch(err => console.error({err}))
};
