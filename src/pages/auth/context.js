import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { logout } from "./service";

const AuthContext = createContext(false);
const AuthContextHandlers = createContext(undefined);

export const useIsLogged = () => {
  const isLogged = useContext(AuthContext);
  return isLogged;
};

export const useAuthHandlers = () => {
  const authHandlers = useContext(AuthContextHandlers);
  return authHandlers;
};

export const AuthContextProvider = ({ initiallyLogged, children }) => {
  const [isLogged, setIsLogged] = useState(initiallyLogged);
  const navigate = useNavigate();

  const authHandlers = useMemo(
    () => ({
      onLogin: () => setIsLogged(true),
      onLogout: async () => {
        await logout();
        setIsLogged(false);
        navigate("/login");
      },
    }),
    [navigate]
  );

  return (
    <AuthContextHandlers.Provider value={authHandlers}>
      <AuthContext.Provider value={isLogged}>{children}</AuthContext.Provider>
    </AuthContextHandlers.Provider>
  );
};
