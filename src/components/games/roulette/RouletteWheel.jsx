import RouletteCenter from "./RouletteCenter";
import RoulettePointer from "./RoulettePointer";

function RouletteWheel({
  loadingAnimation,
  spinning,
  participants = [],
  winner,
  rotation,
  duration,
}) {
  const segmentAngle =
    participants.length === 0 ? 0 : 360 / participants.length;

  return (
    <div className="relative flex justify-center py-10">
      <RoulettePointer />

      {/* Background glow */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-cyan-300/20 blur-3xl" />

      {/* Floating layer */}
      <div
        className={`
          ${!spinning ? "roulette-float" : ""}
          relative
        `}
      >
        {/* Rotating layer or skeleton */}
        {loadingAnimation ? (
          <div className="relative flex h-[520px] w-[520px] items-center justify-center rounded-full bg-slate-900/5 shadow-[0_35px_100px_rgba(56,189,248,0.08)]">
            <div className="absolute inset-0 rounded-full border-[12px] border-cyan-200/20 bg-cyan-200/5 blur-sm" />
            <div className="relative h-[460px] w-[460px] rounded-full border border-cyan-200/25 bg-slate-900/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-[420px] w-[420px] rounded-full border border-cyan-100/20 bg-cyan-300/7 shadow-[0_0_80px_rgba(56,189,248,0.12)] animate-pulse" />
              <div className="absolute h-[420px] w-[420px] rounded-full border-t-[2px] border-cyan-300/50 border-r-transparent border-b-transparent border-l-transparent animate-spin duration-[4000ms]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-24 w-24 rounded-full border border-cyan-100/25 bg-cyan-100/10 shadow-lg shadow-cyan-400/10" />
            </div>
          </div>
        ) : (
          <div
            className="
              relative
              flex
              h-[460px]
              w-[460px]
              items-center
              justify-center
              rounded-full
              transition-transform
              ease-[cubic-bezier(0.17,0.67,0.2,1)]
            "
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: `${duration}ms`,
            }}
          >
            {/* Glow layer */}
            <div
              className="
                roulette-glow
                absolute
                inset-0
                rounded-full
                border-[16px]
                border-white/80
                bg-gradient-to-br
                from-cyan-400
                via-sky-400
                to-blue-600
                shadow-[0_25px_80px_rgba(14,165,233,0.35)]
              "
            />

            {/* Participants */}
            {participants.map((participant, index) => {
              const angle = index * segmentAngle;

              return (
                <div
                  key={participant.id}
                  className="absolute left-1/2 top-1/2"
                  // Str: actulizado para corregir la posición del texto y asegurar que se detenga exactamente en el segmento del ganador, sin importar la rotación actual.
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      rotate(${angle}deg)
                      translateY(-165px)
                      rotate(-${angle}deg)
                    `,
                  }}
                >
                  <div
                    className={`
                      flex
                      min-w-[90px]
                      max-w-[110px]
                      items-center
                      justify-center
                      rounded-xl
                      border
                      px-3
                      py-2
                      text-center
                      text-xs
                      font-bold
                      shadow-lg
                      backdrop-blur-md
                      transition-all
                      duration-300
                      ${
                        winner?.id === participant.id
                          ? "scale-125 border-yellow-300 bg-yellow-300 text-slate-900 shadow-yellow-300/60"
                          : "border-white/30 bg-white/20 text-white"
                      }
                    `}
                  >
                    <span className="truncate">{participant.name}</span>
                  </div>
                </div>
              );
            })}

            {/* Rings */}
            <div className="absolute h-[360px] w-[360px] rounded-full border border-white/20" />

            <div className="absolute h-[300px] w-[300px] rounded-full border border-white/10" />

            <RouletteCenter />
          </div>
        )}
      </div>
    </div>
  );
}

export default RouletteWheel;
