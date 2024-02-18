import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

export function Header() {
  const logout = useLogout();

  return (
    // container-fluid en PicoCSS es para que el contenedor ocupe todo el espacio horizontal
    <nav className="container-fluid">
      {/* La primera lista, en PicoCSS sera para los items de la izquierda */}
      <ul>
        <li>
          <Link href="/" className="contrast" onClick="event.preventDefault()">
            <strong>NodePop React</strong>
          </Link>
        </li>
      </ul>

      {/* La segunda lista, en PicoCSS sera para los items de la derecha */}
      <ul>
        <li>
          <NavLink to="/adverts/new">Nuevo anuncio</NavLink>
        </li>
        <li>
          <NavLink to="/adverts/">Lista de anuncios</NavLink>
        </li>
        <li>
          <NavLink onClick={logout}>Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
}
