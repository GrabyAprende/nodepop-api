import { useDispatch } from "react-redux";
import client, { setAuthorizationHeader } from "../api/cliente";
import storage from "../utils/storage";

export function useLogin() {
  const dispatch = useDispatch();

  const login = async (loginData) => {
    // Recogemos email, password y rememberMe del objeto loginData
    const { email, password, rememberMe } = loginData;

    return client
      .post("/auth/login", { email, password })
      .then(({ accessToken }) => {
        // Ponemos en auth headers el token
        setAuthorizationHeader(accessToken);
        // Ponemos en storage, con la llave auth, el token
        storage.set("auth", accessToken);

        // si remembeMe está activo
        if (rememberMe) {
          // Ponemos en storage, con la llave nodePopCredentials, el eamil y password
          storage.set("nodePopCredentials", { email });
        }

        return accessToken;
      })
      .catch((err) => console.error({ err }));
  };

  return login;
}
