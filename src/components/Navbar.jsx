import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, Shield, UserCircle, Menu, X } from "lucide-react";
import logo from "../assets/Logo.png";
import { getAuthUser, logoutUser } from "../services/authService";
import { adminPath } from "../config/routes";

function Navbar() {
  const navigate = useNavigate();
  const user = getAuthUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
      isActive
        ? "bg-white text-slate-900 shadow-sm"
        : "text-white/90 hover:bg-white/10 hover:text-white"
    }`;

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#42DEE1]/20 bg-gradient-to-r from-[#3FC5F0]/95 via-[#42DEE1]/95 to-[#3FC5F0]/95 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur">
            <img
              src={logo}
              alt="RandomFates logo"
              className="h-10 w-10 object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold tracking-tight text-white">
              RandomFates
            </h1>
            <p className="text-xs text-white/80">Sistema operativo</p>
          </div>
        </Link>

        <div className="hidden items-center gap-1.5 rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-2 py-1.5 backdrop-blur-xl lg:flex">
          <NavLink to="/" className={navClass}>
            Inicio
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={navClass}>
              Dashboard
            </NavLink>
          )}
          {user && (
            <NavLink to="/raffles" className={navClass}>
              Sorteos
            </NavLink>
          )}
          {user && (
            <NavLink to="/games" className={navClass}>
              Minijuegos
            </NavLink>
          )}
          {user && (
            <NavLink to="/account" className={navClass}>
              Cuenta
            </NavLink>
          )}
          <NavLink to="/about" className={navClass}>
            Acerca
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contacto
          </NavLink>
          {user?.role === "ADMIN" && (
            <NavLink to={adminPath("/dashboard")} className={navClass}>
              Admin
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white md:flex">
                {user.role === "ADMIN" ? (
                  <Shield size={16} />
                ) : (
                  <UserCircle size={16} />
                )}
                <span className="max-w-[180px] truncate">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <LogOut size={16} /> Salir
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20"
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                className="hidden sm:inline-flex rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Crear cuenta
              </Link>
            </>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white ml-2 rounded-2xl hover:bg-white/10"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#42DEE1]/20 bg-gradient-to-b from-[#3FC5F0]/95 to-[#42DEE1]/95 px-6 py-4 shadow-inner">
          <div className="flex flex-col gap-2">
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={navClass}>Inicio</NavLink>
            {user && <NavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={navClass}>Dashboard</NavLink>}
            {user && <NavLink to="/raffles" onClick={() => setIsMobileMenuOpen(false)} className={navClass}>Sorteos</NavLink>}
            {user && <NavLink to="/games" onClick={() => setIsMobileMenuOpen(false)} className={navClass}>Minijuegos</NavLink>}
            {user && <NavLink to="/account" onClick={() => setIsMobileMenuOpen(false)} className={navClass}>Cuenta</NavLink>}
            <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className={navClass}>Acerca</NavLink>
            <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={navClass}>Contacto</NavLink>
            {user?.role === "ADMIN" && <NavLink to={adminPath("/dashboard")} onClick={() => setIsMobileMenuOpen(false)} className={navClass}>Admin</NavLink>}
            {!user && (
              <div className="mt-2 flex flex-col gap-2 border-t border-white/20 pt-4">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/20">Ingresar</Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="rounded-2xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-800">Crear cuenta</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
