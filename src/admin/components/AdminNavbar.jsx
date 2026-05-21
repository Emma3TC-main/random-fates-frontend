import { Bell, Search, Sparkles } from "lucide-react";

import "animate.css";

import logo from "../../assets/Logo.png";

function AdminNavbar() {
  return (
    <header className="animate__animated animate__fadeInDown animate__fast flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-8 py-5 backdrop-blur-xl">
      {/* SEARCH */}
      <div className="relative w-full max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition duration-300"
          size={18}
        />

        <input
          type="text"
          placeholder="Search games, users or sessions..."
          className="w-full rounded-2xl border border-slate-800 bg-slate-900/70 py-3 pl-11 pr-4 text-sm text-white outline-none transition duration-300 placeholder:text-slate-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
        />
      </div>

      {/* RIGHT */}
      <div className="ml-6 flex items-center gap-5">
        {/* NOTIFICATION */}
        <button className="group relative rounded-2xl border border-slate-800 bg-slate-900/70 p-3 text-slate-300 transition duration-300 hover:border-cyan-400/20 hover:bg-slate-900 hover:text-cyan-300">
          <Bell
            size={20}
            className="transition duration-300 group-hover:rotate-12"
          />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
        </button>

        {/* PROFILE */}
        <div className="group flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-2 transition duration-300 hover:border-cyan-400/20 hover:bg-slate-900">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md" />

            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-cyan-400/10 bg-slate-900">
              <img
                src={logo}
                alt="RandomFates"
                className="h-8 w-8 object-contain transition duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              Administrator
              <Sparkles size={14} className="text-cyan-400 animate-pulse" />
            </p>

            <p className="text-xs text-slate-400">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
