import AnimatedButton from "../common/AnimatedButton";

function RouletteControls({ spinning, startRoulette, duration, setDuration }) {
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
            className="
              w-full
              rounded-2xl
              border
             border-slate-200
             bg-slate-50
              px-4
              py-4
              font-medium
             text-slate-700
              outline-none
              transition-all
              duration-300
             hover:border-cyan-300
             focus:border-cyan-400
             focus:bg-white
              focus:shadow-[0_0_0_4px_rgba(64,207,255,0.15)]
            "
          >
            <option value={3000}>3 segundos</option>

            <option value={5000}>5 segundos</option>

            <option value={8000}>8 segundos</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            className="
    w-full
    rounded-2xl
    border
    border-slate-200
    bg-slate-50
    px-5
    py-4
    font-semibold
    text-slate-700
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-cyan-200
    hover:bg-cyan-50
    hover:shadow-md
  "
          >
            Importar participantes
          </button>
        </div>

        <div className="flex items-end">
          <AnimatedButton onClick={startRoulette} disabled={spinning}>
            {spinning ? "Girando..." : "Iniciar sorteo"}
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}

export default RouletteControls;
