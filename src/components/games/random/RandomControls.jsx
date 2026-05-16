import AnimatedButton from "../common/AnimatedButton";

function RandomControls({ animating, startSelection, duration, setDuration }) {
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
            <option value={2000}>2 segundos</option>

            <option value={3000}>3 segundos</option>

            <option value={5000}>5 segundos</option>
          </select>
        </div>

        <div className="flex items-end">
          <button className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-medium text-slate-700 transition hover:bg-slate-100">
            Importar participantes
          </button>
        </div>

        <div className="flex items-end">
          <AnimatedButton onClick={startSelection} disabled={animating}>
            {animating ? "Seleccionando..." : "Elegir ganador"}
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}

export default RandomControls;
