function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-slate-900 p-6 shadow-2xl">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>

        <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-400">
          <Icon size={22} />
        </div>
      </div>

      <h2 className="text-4xl font-bold text-white">{value}</h2>
    </div>
  );
}

export default StatCard;
