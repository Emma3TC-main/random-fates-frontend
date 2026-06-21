function RouletteStats({ history }) {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900">Historial</h2>

        <span
          className="
            rounded-full
            bg-cyan-100
            px-4
            py-1.5
            text-sm
            font-bold
            text-cyan-700
          "
        >
          {history.length}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {history.length === 0 && (
          <div className="rounded-2xl bg-slate-50 p-5 text-center">
            <p className="text-slate-500">Aún no hay sorteos realizados.</p>
          </div>
        )}

        {history.map((winner, index) => (
          <div
            key={index}
            className="
              group
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-slate-100
              bg-slate-50
              p-4
              transition-all
              duration-300
              hover:border-cyan-200
              hover:bg-cyan-50
              hover:shadow-md
            "
          >
            <div>
              <p className="font-bold text-slate-800">{winner.name}</p>

              <p className="text-xs text-slate-400">Ganador seleccionado</p>
            </div>

            <div
              className="
                h-3
                w-3
                rounded-full
                bg-cyan-400
                shadow-[0_0_14px_#40CFFF]
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RouletteStats;
