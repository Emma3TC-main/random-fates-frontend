import "animate.css";

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="animate__animated animate__fadeInUp animate__fast group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-[0_10px_40px_rgba(6,182,212,0.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_10px_50px_rgba(6,182,212,0.1)]">
      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/5 blur-3xl transition duration-500 group-hover:bg-cyan-400/10" />

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {title}
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
              {value}
            </h2>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/5 text-cyan-300 transition duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:border-cyan-400/20">
            <Icon size={24} />
          </div>
        </div>

        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-2/3 rounded-full bg-cyan-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default StatCard;