import { useDispatch } from "react-redux";
import { removeAuthorizationHeader } from "../api/cliente";
import { authLogout } from "../store/actions/sessionActions";
import { useNavigate } from "react-router";
import storage from "../utils/storage";

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    // Retornamos una promesa para poder usar await
    return Promise.resolve().then(() => {
      // Borramos en auth headers el token
      removeAuthorizationHeader();
      // Borramos en storage el token de auth
      dispatch(authLogout());
      storage.remove("auth");
      navigate("/login");
    });
  };

  return logout;
}
