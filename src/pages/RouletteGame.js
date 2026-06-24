import "../animations/roulette.css";

import GameLayout from "../components/games/common/GameLayout";
import GameHeader from "../components/games/common/GameHeader";
import ParticipantsSidebar from "../components/games/common/ParticipantsSidebar";
import WinnerOverlay from "../components/games/common/WinnerOverlay";

import RouletteWheel from "../components/games/roulette/RouletteWheel";
import RouletteControls from "../components/games/roulette/RouletteControls";
import RouletteStats from "../components/games/roulette/RouletteStats";

import useParticipants from "../hooks/useParticipants";
import useRoulette from "../hooks/useRoulette";

export default function RouletteGame() {
  const { participants, loading } = useParticipants();

  const {
    spinning,
    winner,
    history,
    duration,
    setDuration,
    startRoulette,
    setWinner,
    rotation,
    frozenParticipants,
  } = useRoulette(participants);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Cargando participantes...</p>
      </div>
    );
  }

  return (
    <>
      <WinnerOverlay winner={winner} onClose={() => setWinner(null)} />

      <GameLayout>
        <GameHeader
          badge="POPULAR"
          badgeColor="bg-yellow-100 text-yellow-700"
          title="Ruleta interactiva"
          description="Realiza sorteos visuales dinámicos ideales para transmisiones en vivo y eventos interactivos."
        />

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          {/* LEFT */}
          <div className="space-y-8">
            <div className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-sm">
              <RouletteWheel
                  spinning={spinning}
                  participants={spinning ? frozenParticipants : participants}
                  winner={winner}
                  rotation={rotation}
                  duration={duration}
                />
            </div>

            <RouletteControls
              spinning={spinning}
              startRoulette={startRoulette}
              duration={duration}
              setDuration={setDuration}
            />

            <RouletteStats history={history} />
          </div>

          {/* RIGHT */}
          <ParticipantsSidebar participants={participants} />
        </div>
      </GameLayout>
    </>
  );
}
