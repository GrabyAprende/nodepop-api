import { Route, Navigate, Routes } from "react-router-dom";
import AdvertsPage from "./pages/adverts/AdvertsPage.js";
import LoginPage from "./pages/auth/LoginPage.js";
import NewAdvertForm from "./pages/newAdvertForm/NewAdvertForm.js";
import AdvertPage from "./pages/advertPage/AdvertPage.js";
import { Header } from "./components/Header.js";
import { useSelector } from "react-redux";
import { getToken } from "./store/selectors/sessionSelectors.js";

const PrivateRoute = ({ children }) => {
  const isLogged = useSelector(getToken);
  return isLogged ? children : <Navigate to="/login" replace />;
};

function App() {
  const isLogged = useSelector(getToken);

  return (
    // <></> Esto es un fragmento, es como un div, pero no saldra en el inspector, no se renderiza
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
