import {
  ShieldCheck,
  Users,
  Trophy,
  Activity,
} from "lucide-react";

import "animate.css";

function GameStatusCard({
  game,
  status,
  participants,
  winner,
}) {
  const isRunning = status === "RUNNING";

  return (
    <div className="animate__animated animate__fadeInUp animate__fast group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_10px_40px_rgba(6,182,212,0.08)]">
      {/* Glow */}
      <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-cyan-400/5 blur-3xl transition duration-500 group-hover:bg-cyan-400/10" />

      <div className="relative z-10">
        {/* HEADER */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white">
              {game}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              RandomFates Session
            </p>
          </div>

          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide backdrop-blur-sm ${
              isRunning
                ? "border border-green-500/10 bg-green-500/5 text-green-400"
                : "border border-cyan-500/10 bg-cyan-500/5 text-cyan-300"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isRunning
                  ? "bg-green-400 animate-pulse"
                  : "bg-cyan-300"
              }`}
            />

            {status}
          </span>
        </div>

        {/* STATS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3 transition duration-300 hover:border-cyan-400/10">
            <div className="flex items-center gap-2 text-slate-400">
              <Users size={16} />
              Participants
            </div>

            <span className="font-semibold text-white">
              {participants}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3 transition duration-300 hover:border-cyan-400/10">
            <div className="flex items-center gap-2 text-slate-400">
              <Trophy size={16} />
              Winner
            </div>

            <span className="font-semibold text-cyan-300">
              {winner}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3 transition duration-300 hover:border-green-400/10">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck size={16} />
              Verification
            </div>

            <div className="inline-flex items-center gap-2 font-semibold text-green-400">
              <Activity size={14} className="animate-pulse" />
              VERIFIED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameStatusCard;