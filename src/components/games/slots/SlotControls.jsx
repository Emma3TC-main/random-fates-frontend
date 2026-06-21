import AnimatedButton from "../common/AnimatedButton";

function SlotControls({ spinning, startSlots, duration, setDuration, disabled = false }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Duración
          </label>

          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none"
          >
            <option value={3000}>3 segundos</option>

            <option value={4000}>4 segundos</option>

            <option value={6000}>6 segundos</option>
          </select>
        </div>

        <div className="flex items-end">
          <button className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-medium text-slate-700 transition hover:bg-slate-100">
            Importar participantes
          </button>
        </div>

        <div className="flex items-end">
          <AnimatedButton onClick={startSlots} disabled={spinning || disabled}>
            {spinning ? "Girando slots..." : disabled ? "Sorteo no disponible" : "Iniciar slots"}
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}

export default SlotControls;
