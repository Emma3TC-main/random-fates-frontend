import { Bell, Search } from "lucide-react";

function AdminNavbar() {
  return (
    <header className="flex items-center justify-between border-b border-cyan-500/10 bg-slate-950 px-8 py-5">
      <div className="relative w-full max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          size={18}
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-2xl border border-slate-800 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-400"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="rounded-2xl bg-slate-900 p-3 text-slate-300 transition hover:bg-slate-800">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3 rounded-2xl bg-slate-900 px-4 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 font-bold text-white">
            A
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Administrator</p>

            <p className="text-xs text-slate-400">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
