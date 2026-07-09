import {
  LayoutDashboard,
  Users,
  Gamepad2,
  LogOut,
  Sparkles,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import "animate.css";

import logo from "../../assets/Logo.png";

import { logoutAdmin } from "../services/adminAuthService";
import { adminPath } from "../../config/routes";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate(adminPath("/login"));
  };

  const navClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition duration-300 ${
      isActive
        ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20"
        : "text-slate-300 hover:bg-slate-900 hover:text-cyan-300"
    }`;

  return (
    <aside className="animate__animated animate__fadeInLeft animate__fast flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950/95 p-6 backdrop-blur-xl">
      {/* LOGO */}
      <div className="mb-10">
        <div className="group flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-xl transition duration-300 group-hover:bg-cyan-400/30" />

            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-cyan-400/10 bg-slate-900">
              <img
                src={logo}
                alt="RandomFates"
                className="h-11 w-11 object-contain transition duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-2xl font-bold text-transparent">
              RandomFates
            </h1>

            <div className="mt-1 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-cyan-400">
              <Sparkles size={12} className="animate-pulse" />
              ADMIN PANEL
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-1 flex-col gap-3">
        <NavLink to={adminPath("/dashboard")} className={navClass}>
          <LayoutDashboard
            size={20}
            className="transition duration-300 group-hover:scale-110"
          />
          Dashboard
        </NavLink>

        <NavLink to={adminPath("/games")} className={navClass}>
          <Gamepad2
            size={20}
            className="transition duration-300 group-hover:scale-110"
          />
          Games
        </NavLink>

        <NavLink to={adminPath("/users")} className={navClass}>
          <Users
            size={20}
            className="transition duration-300 group-hover:scale-110"
          />
          Users
        </NavLink>

        {/* FOOTER */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-2xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-red-300 transition duration-300 hover:bg-red-500 hover:text-white"
          >
            <LogOut
              size={20}
              className="transition duration-300 group-hover:-translate-x-1"
            />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
