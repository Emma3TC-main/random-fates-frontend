function SlotResult({ winner }) {
  if (!winner) return null;

  return (
    <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-6 shadow-sm">
      <p className="text-sm font-medium text-yellow-700">
        Jackpot desbloqueado
      </p>

      <h2 className="mt-3 text-4xl font-black text-slate-900">{winner.name}</h2>
    </div>
  );
}

export default SlotResult;
