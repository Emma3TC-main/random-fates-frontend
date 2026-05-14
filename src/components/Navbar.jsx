import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.png";
import { getAuthUser, logoutUser } from "../services/authService";

function Navbar() {
  const location = useLocation();

  // obtener usuario autenticado
  const user = getAuthUser();

  const linkClass = (path) =>
    `relative rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
      location.pathname === path
        ? "bg-white text-slate-900 shadow-lg"
        : "text-white/90 hover:bg-white/15 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#42DEE1]/20 bg-gradient-to-r from-[#3FC5F0]/95 via-[#42DEE1]/95 to-[#3FC5F0]/95 backdrop-blur-xl">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-[#EEF5B2]/20 blur-3xl" />

        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#6DECB9]/20 blur-3xl" />
      </div>

      <nav
        role="navigation"
        className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
      >
        {/* LOGO */}
        <Link to="/" className="group flex items-center gap-4 transition-all">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#EEF5B2]/30 blur-xl transition duration-300 group-hover:bg-[#EEF5B2]/40" />

            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur">
              <img
                src={logo}
                alt="RandomFates logo"
                className="h-10 w-10 object-contain"
              />
            </div>
          </div>

          <div className="hidden sm:block">
            <h1 className="text-lg font-bold tracking-tight text-white">
              RandomFates
            </h1>

            <p className="text-xs text-white/80">
              Sorteos digitales modernos
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}
        <div className="hidden items-center gap-1.5 lg:flex">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>

          <Link to="/about" className={linkClass("/about")}>
            About
          </Link>

          <Link to="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>

          <Link to="/games" className={linkClass("/games")}>
            Games
          </Link>

          <Link to="/raffles" className={linkClass("/raffles")}>
            Raffles
          </Link>

          <Link to="/contact" className={linkClass("/contact")}>
            Contact
          </Link>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden md:block text-white font-medium">
                Hola, {user.nombre}
              </span>

              <button
                onClick={() => {
                  logoutUser();
                  window.location.href = "/login";
                }}
                className="rounded-2xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white shadow-md backdrop-blur transition hover:bg-white/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-2xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white shadow-md backdrop-blur transition hover:bg-white/20"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hidden rounded-2xl bg-[#EEF5B2] px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-xl transition hover:scale-[1.02] hover:brightness-95 md:block"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;