import "../animations/slots.css";

import GameLayout from "../components/games/common/GameLayout";
import GameHeader from "../components/games/common/GameHeader";
import ParticipantsSidebar from "../components/games/common/ParticipantsSidebar";
import WinnerOverlay from "../components/games/common/WinnerOverlay";

import SlotControls from "../components/games/slots/SlotControls";
import SlotEffects from "../components/games/slots/SlotEffects";
import SlotMachine from "../components/games/slots/SlotMachine";
import SlotResult from "../components/games/slots/SlotResult";
import SlotStats from "../components/games/slots/SlotStats";

import useParticipants from "../hooks/useParticipants";
import useSlots from "../hooks/useSlots";

export default function SlotsGame() {
  const { participants, loading } = useParticipants();

  const {
    spinning,
    winner,
    history,
    duration,
    reels,
    setDuration,
    startSlots,
    setWinner,
  } = useSlots(participants);

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
          badge="GAMING"
          badgeColor="bg-purple-100 text-purple-700"
          title="Slots jackpot"
          description="Sistema de slots interactivos para sorteos gamificados con efectos visuales y jackpots dinámicos."
        />

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-8">
            <div className="relative">
              <SlotEffects spinning={spinning} />

              <SlotMachine reels={reels} spinning={spinning} />
            </div>

            <SlotControls
              spinning={spinning}
              startSlots={startSlots}
              duration={duration}
              setDuration={setDuration}
            />

            <SlotResult winner={winner} />

            <SlotStats history={history} />
          </div>

          <ParticipantsSidebar participants={participants} />
        </div>
      </GameLayout>
    </>
  );
}
