import {
  Users,
  ShieldCheck,
  Sparkles,
  Activity,
  Crown,
  ChevronRight,
  User2,
} from "lucide-react";

import "animate.css";

import AdminLayout from "../layouts/AdminLayout";

const users = [
  {
    name: "Emma",
    role: "Admin",
    status: "Active",
    games: "182",
  },
  {
    name: "Carlos",
    role: "Moderator",
    status: "Active",
    games: "53",
  },
  {
    name: "Lucia",
    role: "User",
    status: "Idle",
    games: "11",
  },
];

function AdminUsers() {
  return (
    <AdminLayout>
      <div className="relative">
        {/* BACKGROUND GLOW */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 left-0 h-[260px] w-[260px] rounded-full bg-cyan-400/5 blur-3xl" />

          <div className="absolute right-0 top-1/3 h-[220px] w-[220px] rounded-full bg-sky-400/5 blur-3xl" />
        </div>

        {/* HEADER */}
        <div className="animate__animated animate__fadeInUp animate__fast mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-cyan-300 backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse" />
              USER CONTROL
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white">
              Users
            </h1>

            <p className="mt-2 text-slate-400">
              Manage platform users and permissions.
            </p>
          </div>

          <div className="animate__animated animate__fadeIn animate__fast inline-flex items-center gap-2 rounded-full border border-green-500/10 bg-green-500/5 px-5 py-3 text-sm font-semibold text-green-400 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            USER SYSTEM ONLINE
          </div>
        </div>

        {/* STATS */}
        <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MiniStatCard
            icon={<Users size={20} />}
            title="Total Users"
            value="1,284"
          />

          <MiniStatCard
            icon={<ShieldCheck size={20} />}
            title="Admins"
            value="12"
          />

          <MiniStatCard
            icon={<Activity size={20} />}
            title="Active Now"
            value="842"
          />

          <MiniStatCard
            icon={<Crown size={20} />}
            title="Premium"
            value="203"
          />
        </div>

        {/* USERS TABLE */}
        <div className="animate__animated animate__fadeInUp animate__fast overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/60 shadow-[0_10px_40px_rgba(6,182,212,0.05)] backdrop-blur-xl transition duration-300 hover:border-cyan-400/10 hover:shadow-[0_10px_50px_rgba(6,182,212,0.08)]">
          {/* TOP BAR */}
          <div className="flex flex-col gap-4 border-b border-slate-800 px-8 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">User Directory</h2>

              <p className="mt-1 text-sm text-slate-500">
                Platform accounts and activity overview
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 px-4 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-sm">
              <Activity size={16} />
              LIVE USER STATUS
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-8 py-5 font-semibold">User</th>
                  <th className="px-8 py-5 font-semibold">Role</th>
                  <th className="px-8 py-5 font-semibold">Status</th>
                  <th className="px-8 py-5 font-semibold">Games</th>
                  <th className="px-8 py-5 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.name}
                    className={`animate__animated animate__fadeInUp animate__fast border-b border-slate-800/80 transition duration-300 hover:bg-white/[0.02] ${
                      index === users.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    {/* USER */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/5 text-cyan-300 transition duration-300 hover:scale-105 hover:rotate-3">
                          <User2 size={20} />
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {user.name}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            RandomFates Member
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* ROLE */}
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide backdrop-blur-sm ${
                          user.role === "Admin"
                            ? "border border-cyan-500/10 bg-cyan-500/5 text-cyan-300"
                            : user.role === "Moderator"
                              ? "border border-violet-500/10 bg-violet-500/5 text-violet-300"
                              : "border border-slate-700 bg-slate-800/80 text-slate-300"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide backdrop-blur-sm ${
                          user.status === "Active"
                            ? "border border-green-500/10 bg-green-500/5 text-green-400"
                            : "border border-yellow-500/10 bg-yellow-500/5 text-yellow-300"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            user.status === "Active"
                              ? "bg-green-400 animate-pulse"
                              : "bg-yellow-300"
                          }`}
                        />

                        {user.status}
                      </span>
                    </td>

                    {/* GAMES */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Users size={16} className="text-slate-500" />
                        {user.games}
                      </div>
                    </td>

                    {/* ACTION */}
                    <td className="px-8 py-6">
                      <button className="group inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-slate-800 hover:text-cyan-300">
                        Details
                        <ChevronRight
                          size={16}
                          className="transition duration-300 group-hover:translate-x-1"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* MINI STATS */
function MiniStatCard({ icon, title, value }) {
  return (
    <div className="animate__animated animate__fadeInUp animate__fast rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_10px_40px_rgba(6,182,212,0.08)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold text-white">{value}</h3>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/5 text-cyan-300 transition duration-300 hover:scale-105 hover:rotate-3">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
