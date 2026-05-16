import RouletteCenter from "./RouletteCenter";
import RoulettePointer from "./RoulettePointer";

function RouletteWheel({
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
        {/* Rotating layer */}
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
                style={{
                  transform: `
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
      </div>
    </div>
  );
}

export default RouletteWheel;
