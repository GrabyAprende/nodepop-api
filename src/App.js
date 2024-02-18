import { Route, Navigate, Routes } from "react-router-dom";
import AdvertsPage from "./pages/adverts/AdvertsPage.js";
import LoginPage from "./pages/auth/LoginPage.js";
import NewAdvertForm from "./pages/newAdvertForm/NewAdvertForm.js";
import AdvertPage from "./pages/advertPage/AdvertPage.js";
import { Header } from "./components/Header.js";
import { useDispatch, useSelector } from "react-redux";
import { getIsLogged } from "./store/selectors/sessionSelectors.js";
import { setAuthorizationHeader } from "./api/cliente.js";
import { useEffect } from "react";
import { getTags } from "./pages/newAdvertForm/service.js";
import { setAdverts, setTags } from "./store/actions/adsActions.js";
import { getLatestAdverts } from "./pages/adverts/service.js";
import storage from "./utils/storage.js";

const PrivateRoute = ({ children }) => {
  const isLogged = useSelector(getIsLogged);
  return isLogged ? children : <Navigate to="/login" replace />;
};

function App() {
  const dispatch = useDispatch();

  const token = storage.get("auth");
  if (token) {
    setAuthorizationHeader(token);
  }

  useEffect(() => {
    getLatestAdverts()
      .then((adverts) => dispatch(setAdverts(adverts)))
      .catch((err) => console.error(err));

    getTags()
      .then((tags) => dispatch(setTags(tags)))
      .catch((err) => console.error(err));
  }, []);

  const isLogged = !!token;

  return (
    <>
      {isLogged && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/adverts" replace />} />
        <Route
          path="/login"
          element={
            isLogged ? <Navigate to="/adverts" replace /> : <LoginPage />
          }
        />
        <Route
          path="/adverts"
          element={
            <PrivateRoute>
              <AdvertsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/adverts/new"
          element={
            <PrivateRoute>
              <NewAdvertForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/adverts/:id"
          element={
            <PrivateRoute>
              <AdvertPage />
            </PrivateRoute>
          }
        />
        <Route path="/404" element={<div>404 | Not found</div>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </>
  );
}
export default App;
