import { useState } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import AdvertsPage from "./pages/adverts/AdvertsPage.js";
import LoginPage from "./pages/auth/LoginPage.js";
import NewAdvertForm from "./pages/newAdvertForm/NewAdvertForm.js";

const PrivateRoute = ({ children, isAuthenticated }) => (
  isAuthenticated 
    ? children 
    : <Navigate to="/login" replace />
);

function App({initiallyLogged}) {
  const [isLogged, setIsLogged] = useState(initiallyLogged);

  const handleLogin = () => setIsLogged(true);

  return (
      <Routes>
        <Route 
          path="/" 
          element={
            <Navigate to="/adverts" replace />
          } 
        />
        <Route 
          path="/login" 
          element={
            isLogged 
              ? <Navigate to="/adverts" replace /> 
              : <LoginPage onLogin={handleLogin} />} 
          />
        <Route 
          path="/adverts"
          element={
            <PrivateRoute isAuthenticated={isLogged}>
              <AdvertsPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/adverts/new"
          element={
            <PrivateRoute isAuthenticated={isLogged}>
              <NewAdvertForm />
            </PrivateRoute>
          } 
        />
      </Routes>
    )
};
export default App;
