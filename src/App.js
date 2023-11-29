import { useState } from "react";
import AdvertsPage from "./pages/adverts/AdvertsPage.js";
import LoginPage from "./pages/auth/LoginPage.js";
import client from "./api/cliente.js";

function App() {
  const [isLogged, setIsLogged] = useState(false);

const handleLogin = () => setIsLogged(true);

  return <div className="App">{isLogged ? <AdvertsPage  /> : <LoginPage  />}</div>;
}
export default App;
