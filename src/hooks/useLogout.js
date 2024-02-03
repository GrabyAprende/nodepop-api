import { useDispatch } from "react-redux";
import { removeAuthorizationHeader } from "../api/cliente";
import { removeToken } from "../store/actions/sessionActions";
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
      dispatch(removeToken());
      storage.remove("auth");
      navigate("/login");
    });
  };

  return logout;
}
