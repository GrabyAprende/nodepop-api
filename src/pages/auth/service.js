import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../../api/cliente";
import storage from "../../utils/storage";

export const login = async (loginData) => {
  // Recogemos email, password y rememberMe del objeto loginData
  const { email, password, rememberMe } = loginData;

  return client
    .post("/api/auth/login", { email, password })
    .then(({ accessToken }) => {
      // Ponemos en auth headers el token
      setAuthorizationHeader(accessToken);
      // Ponemos en storage, con la llave auth, el token
      storage.set("auth", accessToken);

      // si remembeMe está activo
      if (rememberMe) {
        // Ponemos en storage, con la llave nodePopCredentials, el eamil y password
        storage.set("nodePopCredentials", { email, password });
      }
    })
    .catch((err) => console.error({ err }));
};

export const logout = async () => {
  // Retornamos una promesa para poder usar await
  return Promise.resolve().then(() => {
    // Borramos en auth headers el token
    removeAuthorizationHeader();
    // Borramos en storage el token de auth
    storage.remove("auth");
  });
};
