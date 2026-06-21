function RandomResult({ winner }) {
  if (!winner) return null;

  return (
    <div className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
      <p className="text-sm font-medium text-green-700">Ganador seleccionado</p>

      <h2 className="mt-3 text-4xl font-black text-slate-900">{winner.name}</h2>
    </div>
  );
}

export default RandomResult;
