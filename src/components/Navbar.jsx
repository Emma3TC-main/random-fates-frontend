import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-950 text-white p-4 flex gap-4 justify-center">
      <Link to="/">Inicio</Link> |<Link to="/about">Sobre mí</Link> |
      <Link to="/contact">Contacto</Link> |<Link to="/login">Login</Link> |
      <Link to="/games">Juegos</Link> |
    </nav>
  );
}

export default Navbar;
