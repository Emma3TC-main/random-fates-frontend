import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";

function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-4 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === path
      ? "bg-[#3FC5F0]/100 text-white]"
      : "text-white hover:text-white hover:bg-[#3FC5F0]/100"
    }`;

  return (
    <nav className="sticky text-white top-0 z-50 border-b border-[#42DEE1]/30 bg-[#3FC5F0]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <Link to="/" className="flex items-center gap-3" >
          <img
            src={logo}
            alt="RandomFates logo"
            className="h-20 w-20 object-contain"
          />
          <span className="text-lg font-bold text-white">
            RandomFates
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/about" className={linkClass("/about")}>About</Link>
          <Link to="/projects" className={linkClass("/projects")}>Projects</Link>
          <Link to="/contact" className={linkClass("/contact")}>Contact</Link>
          <Link to="/login" className={linkClass("/login")}>Login</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
