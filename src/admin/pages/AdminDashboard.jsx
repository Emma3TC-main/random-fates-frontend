import { Activity, Users, Trophy, Gamepad2, Sparkles } from "lucide-react";

import "animate.css";

import AdminLayout from "../layouts/AdminLayout";

import StatCard from "../components/StatCard";
import GameStatusCard from "../components/GameStatusCard";

function AdminDashboard() {
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
              CONTROL CENTER
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Monitor system activity and games in real time.
            </p>
          </div>

          <div className="animate__animated animate__fadeIn animate__fast rounded-2xl border border-green-500/10 bg-green-500/5 px-5 py-3 text-sm font-semibold text-green-400 backdrop-blur-sm">
            LIVE SYSTEM STATUS
          </div>
        </div>

        {/* STATS */}
        <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="animate__animated animate__fadeInUp animate__fast">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-1 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_10px_40px_rgba(6,182,212,0.08)]">
              <StatCard title="Active Games" value="24" icon={Gamepad2} />
            </div>
          </div>

          <div className="animate__animated animate__fadeInUp animate__fast">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-1 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_10px_40px_rgba(6,182,212,0.08)]">
              <StatCard title="Users Online" value="1,284" icon={Users} />
            </div>
          </div>

          <div className="animate__animated animate__fadeInUp animate__fast">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-1 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_10px_40px_rgba(6,182,212,0.08)]">
              <StatCard title="Completed Raffles" value="392" icon={Trophy} />
            </div>
          </div>

          <div className="animate__animated animate__fadeInUp animate__fast">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-1 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_10px_40px_rgba(6,182,212,0.08)]">
              <StatCard title="System Status" value="99.9%" icon={Activity} />
            </div>
          </div>
        </div>

        {/* LIVE GAMES */}
        <div className="animate__animated animate__fadeInUp animate__fast">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Live Games</h2>

              <p className="mt-1 text-sm text-slate-500">
                Active raffle sessions and monitoring
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-green-500/10 bg-green-500/5 px-4 py-2 text-sm font-semibold text-green-400 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              LIVE MONITORING
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <div className="animate__animated animate__fadeInUp animate__fast">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-1 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_10px_40px_rgba(6,182,212,0.08)]">
                <GameStatusCard
                  game="Roulette #1023"
                  status="RUNNING"
                  participants="248"
                  winner="Pending"
                />
              </div>
            </div>

            <div className="animate__animated animate__fadeInUp animate__fast">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-1 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_10px_40px_rgba(6,182,212,0.08)]">
                <GameStatusCard
                  game="Slots #445"
                  status="RUNNING"
                  participants="91"
                  winner="Pending"
                />
              </div>
            </div>

            <div className="animate__animated animate__fadeInUp animate__fast">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-1 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_10px_40px_rgba(6,182,212,0.08)]">
                <GameStatusCard
                  game="Random #712"
                  status="COMPLETED"
                  participants="431"
                  winner="Emma"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
