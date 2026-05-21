import {
  LayoutDashboard,
  Users,
  Gamepad2,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../services/adminAuthService";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
      isActive ? "bg-cyan-400 text-white" : "text-slate-300 hover:bg-slate-800"
    }`;

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-cyan-500/10 bg-slate-950 p-6">
      <div className="mb-10">
        <h1 className="bg-gradient-to-r from-cyan-400 to-sky-500 bg-clip-text text-3xl font-bold text-transparent">
          RandomFates
        </h1>

        <p className="mt-2 text-sm text-slate-400">Admin Control Panel</p>
      </div>

      <nav className="flex flex-1 flex-col gap-3">
        <NavLink to="/admin/dashboard" className={navClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/games" className={navClass}>
          <Gamepad2 size={20} />
          Games
        </NavLink>

        <NavLink to="/admin/users" className={navClass}>
          <Users size={20} />
          Users
        </NavLink>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-300 transition hover:bg-red-500 hover:text-white"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
