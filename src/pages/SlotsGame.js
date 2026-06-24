import { Link } from "react-router-dom";
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

import useGameRaffle from "../hooks/useGameRaffle";
import useSlots from "../hooks/useSlots";
import { executionService } from "../services/executionService";
import { labelState } from "../utils/randomFatesFormat";

export default function SlotsGame() {
  const { raffle, participants, loading, error, canExecute, refresh } = useGameRaffle("SLOT");
  const slots = useSlots(participants, {
    executeBackend: raffle?.id
      ? async () => {
          const data = await executionService.execute(raffle.id);
          await refresh();
          return data;
        }
      : null,
  });

  if (loading) return <GameLoading />;
  if (error || !raffle) return <GameEmpty title="No hay sorteo activo para slots" detail={error?.message} />;

  return (
    <>
      <WinnerOverlay winner={slots.winner} onClose={() => slots.setWinner(null)} />
      <GameLayout>
        <GameHeader badge="SISTEMA ACTIVO" badgeColor="bg-purple-100 text-purple-700" title="Slots jackpot" description="El slot muestra el efecto visual y el resultado registrado." />
        <Context raffle={raffle} execution={slots.execution} error={slots.error} />
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-8">
            <div className="relative">
              <SlotEffects spinning={slots.spinning} />
              <SlotMachine reels={slots.reels} spinning={slots.spinning} />
            </div>
            {!canExecute && <Warning text="Este sorteo no está listo para ejecución." />}
            <SlotControls spinning={slots.spinning} startSlots={slots.startSlots} duration={slots.duration} setDuration={slots.setDuration} disabled={!canExecute} />
            <SlotResult winner={slots.winner} />
            <SlotStats history={slots.history} />
          </div>
          <ParticipantsSidebar participants={participants} />
        </div>
      </GameLayout>
    </>
  );
}

function Context({ raffle, execution, error }) {
  return <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><h2 className="text-xl font-bold text-slate-900">{raffle.title}</h2><p className="mt-1 text-sm text-slate-500">Estado: {labelState(raffle.state)}</p></div><Link to={`/raffles?raffleId=${raffle.id}`} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Gestionar</Link></div>{execution?.result?.verificationHash && <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-xs text-emerald-800"><strong>verificationHash:</strong> <span className="break-all">{execution.result.verificationHash}</span></div>}{error && <Warning text={error.message} />}</div>;
}

function GameLoading() { return <div className="flex min-h-screen items-center justify-center bg-slate-50"><p className="rounded-2xl bg-white px-6 py-4 font-semibold text-slate-600 shadow-sm">Cargando sorteo y participantes...</p></div>; }
function GameEmpty({ title, detail }) { return <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><div className="max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm"><h1 className="text-2xl font-black text-slate-900">{title}</h1><p className="mt-3 text-slate-500">{detail || "Crea un sorteo demo jugable desde Minijuegos o publícalo desde Sorteos."}</p><div className="mt-6 flex justify-center gap-3"><Link to="/games" className="rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-900">Ir a Minijuegos</Link><Link to="/raffles" className="rounded-2xl border px-5 py-3 font-bold text-slate-700">Gestionar sorteos</Link></div></div></div>; }
function Warning({ text }) { return <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">{text}</div>; }
