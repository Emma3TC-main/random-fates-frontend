import "../animations/random.css";

import GameLayout from "../components/games/common/GameLayout";
import GameHeader from "../components/games/common/GameHeader";
import ParticipantsSidebar from "../components/games/common/ParticipantsSidebar";
import WinnerOverlay from "../components/games/common/WinnerOverlay";

import RandomAnimation from "../components/games/random/RandomAnimation";
import RandomControls from "../components/games/random/RandomControls";
import RandomResult from "../components/games/random/RandomResult";
import RandomStats from "../components/games/random/RandomStats";

import useParticipants from "../hooks/useParticipants";
import useRandomSelection from "../hooks/useRandomSelection";

export default function RandomSelectionGame() {
  const { participants, loading } = useParticipants();

  const {
    animating,
    currentName,
    winner,
    history,
    duration,
    setDuration,
    startSelection,
    setWinner,
  } = useRandomSelection(participants);

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
          badge="RÁPIDO"
          badgeColor="bg-blue-100 text-blue-700"
          title="Selección aleatoria"
          description="Selecciona ganadores de manera rápida y dinámica para eventos masivos y sorteos instantáneos."
        />

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-8">
            <RandomAnimation animating={animating} currentName={currentName} />

            <RandomControls
              animating={animating}
              startSelection={startSelection}
              duration={duration}
              setDuration={setDuration}
            />

            <RandomResult winner={winner} />

            <RandomStats history={history} />
          </div>

          <ParticipantsSidebar participants={participants} />
        </div>
      </GameLayout>
    </>
  );
}
