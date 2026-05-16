function RandomStats({ history }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Historial</h2>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
          {history.length}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {history.length === 0 && (
          <p className="text-slate-500">Aún no hay selecciones realizadas.</p>
        )}

        {history.map((winner, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
          >
            <span className="font-medium text-slate-800">{winner.name}</span>

            <span className="text-sm text-slate-400">Ganador</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RandomStats;
