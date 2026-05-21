import {
  Trophy,
  Users,
  Clock3,
  Sparkles,
  Activity,
  CheckCircle2,
  PlayCircle,
  ChevronRight,
} from "lucide-react";

import "animate.css";

import AdminLayout from "../layouts/AdminLayout";

const games = [
  {
    game: "Roulette #1023",
    status: "RUNNING",
    players: "248",
    winner: "Pending",
  },
  {
    game: "Slots #445",
    status: "RUNNING",
    players: "91",
    winner: "Pending",
  },
  {
    game: "Random #712",
    status: "COMPLETED",
    players: "431",
    winner: "Emma",
  },
];

function AdminGames() {
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
              GAME CONTROL
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white">
              Games Management
            </h1>

            <p className="mt-2 text-slate-400">
              Monitor all active and completed games.
            </p>
          </div>

          <div className="animate__animated animate__fadeIn animate__fast inline-flex items-center gap-2 rounded-full border border-green-500/10 bg-green-500/5 px-5 py-3 text-sm font-semibold text-green-400 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            LIVE TRACKING ENABLED
          </div>
        </div>

        {/* STATS */}
        <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatMiniCard
            icon={<Trophy size={20} />}
            title="Total Games"
            value="128"
          />

          <StatMiniCard
            icon={<PlayCircle size={20} />}
            title="Running"
            value="24"
          />

          <StatMiniCard
            icon={<Users size={20} />}
            title="Players Online"
            value="1,284"
          />

          <StatMiniCard
            icon={<Activity size={20} />}
            title="System Load"
            value="99.9%"
          />
        </div>

        {/* TABLE CARD */}
        <div className="animate__animated animate__fadeInUp animate__fast overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/60 shadow-[0_10px_40px_rgba(6,182,212,0.05)] backdrop-blur-xl transition duration-300 hover:border-cyan-400/10 hover:shadow-[0_10px_50px_rgba(6,182,212,0.08)]">
          {/* TOP BAR */}
          <div className="flex flex-col gap-4 border-b border-slate-800 px-8 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Active Sessions</h2>

              <p className="mt-1 text-sm text-slate-500">
                Current and completed raffle games
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 px-4 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-sm">
              <Clock3 size={16} />
              REAL-TIME STATUS
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-8 py-5 font-semibold">Game</th>
                  <th className="px-8 py-5 font-semibold">Status</th>
                  <th className="px-8 py-5 font-semibold">Players</th>
                  <th className="px-8 py-5 font-semibold">Winner</th>
                  <th className="px-8 py-5 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {games.map((game, index) => (
                  <tr
                    key={game.game}
                    className={`animate__animated animate__fadeInUp animate__fast border-b border-slate-800/80 transition duration-300 hover:bg-white/[0.02] ${
                      index === games.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/5 text-cyan-300 transition duration-300 hover:scale-105">
                          <Trophy size={20} />
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {game.game}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            RandomFates Session
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide backdrop-blur-sm ${
                          game.status === "RUNNING"
                            ? "border border-green-500/10 bg-green-500/5 text-green-400"
                            : "border border-cyan-500/10 bg-cyan-500/5 text-cyan-300"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            game.status === "RUNNING"
                              ? "bg-green-400 animate-pulse"
                              : "bg-cyan-300"
                          }`}
                        />

                        {game.status}
                      </span>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Users size={16} className="text-slate-500" />
                        {game.players}
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      {game.winner === "Pending" ? (
                        <span className="text-slate-500">Pending</span>
                      ) : (
                        <div className="inline-flex items-center gap-2 font-medium text-cyan-300">
                          <CheckCircle2 size={16} />
                          {game.winner}
                        </div>
                      )}
                    </td>

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
function StatMiniCard({ icon, title, value }) {
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

export default AdminGames;
