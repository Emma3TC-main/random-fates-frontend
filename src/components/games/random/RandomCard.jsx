function RandomCard({ animating, currentName }) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-slate-200
        bg-white
        p-12
        shadow-xl
        transition-all
        duration-500
        ${animating ? "scale-[1.02] shadow-cyan-300/40 roulette-glow" : ""}
      `}
    >
      {/* Glow */}
      <div
        className={`
          absolute inset-0 opacity-0 transition-opacity duration-500
          ${animating ? "opacity-100" : ""}
        `}
      >
        <div className="absolute inset-0 bg-cyan-200/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
          Participante seleccionado
        </p>

        <h2
          className={`
            mt-8
            break-words
            text-6xl
            font-black
            tracking-tight
            text-slate-900
            transition-all
            duration-150
            ${animating ? "animate-pulse blur-[0.5px]" : ""}
          `}
        >
          {currentName}
        </h2>

        <div className="mt-10 flex items-center justify-center gap-2">
          <span
            className={`
              h-3 w-3 rounded-full bg-cyan-400
              ${animating ? "animate-bounce" : ""}
            `}
          />

          <span className="text-sm font-medium text-slate-500">
            {animating ? "Seleccionando ganador..." : "Esperando inicio"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RandomCard;
