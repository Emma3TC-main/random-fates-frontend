import { Link } from "react-router-dom";
import "../animations/roulette.css";

import GameLayout from "../components/games/common/GameLayout";
import GameHeader from "../components/games/common/GameHeader";
import ParticipantsSidebar from "../components/games/common/ParticipantsSidebar";
import WinnerOverlay from "../components/games/common/WinnerOverlay";
import RouletteWheel from "../components/games/roulette/RouletteWheel";
import RouletteControls from "../components/games/roulette/RouletteControls";
import RouletteStats from "../components/games/roulette/RouletteStats";

import useGameRaffle from "../hooks/useGameRaffle";
import useRoulette from "../hooks/useRoulette";
import { executionService } from "../services/executionService";
import { formatDate, labelState } from "../utils/randomFatesFormat";

export default function RouletteGame() {
  const { raffle, participants, loading, error, canExecute, refresh } =
    useGameRaffle("ROULETTE");
  const roulette = useRoulette(participants, {
    executeBackend: raffle?.id
      ? async () => {
          return executionService.execute(raffle.id);
        }
      : null,
    onExecutionComplete: async () => {
      await refresh();
    },
  });

  if (loading) return <GameLoading />;

  if (error || !raffle) {
    return (
      <GameEmpty
        title="No hay un juego activo en este momento"
        detail={error?.message}
      />
    );
  }

  return (
    <>
      <WinnerOverlay
        winner={roulette.winner}
        onClose={() => roulette.setWinner(null)}
      />
      <GameLayout>
        <GameHeader
          badge="EN VIVO"
          badgeColor="bg-yellow-100 text-yellow-700"
          title="Ruleta interactiva"
          description="Gira la ruleta de la suerte y descubre en tiempo real quién se llevará el premio."
        />
        <RaffleContextCard
          raffle={raffle}
          execution={roulette.execution}
          error={roulette.error}
        />
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-8">
            <div className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-sm">
              <RouletteWheel
                loadingAnimation={roulette.waitingForResult}
                spinning={roulette.spinning}
                participants={
                  roulette.spinning ? roulette.frozenParticipants : participants
                }
                winner={roulette.winner}
                rotation={roulette.rotation}
                duration={roulette.duration}
              />
            </div>
            {!canExecute && (
              <Warning text="El juego no cuenta con participantes o ya finalizó. Configura un nuevo evento para iniciar." />
            )}
            <RouletteControls
              spinning={roulette.spinning}
              startRoulette={roulette.startRoulette}
              duration={roulette.duration}
              setDuration={roulette.setDuration}
              disabled={!canExecute}
            />
            <RouletteStats history={roulette.history} />
          </div>
          <ParticipantsSidebar participants={participants} />
        </div>
      </GameLayout>
    </>
  );
}

function RaffleContextCard({ raffle, execution, error }) {
  return (
    <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{raffle.title}</h2>
          <p className="mt-1 text-sm text-slate-500">
            Estado: {labelState(raffle.state)} · Creado:{" "}
            {formatDate(raffle.createdAt)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/raffles?raffleId=${raffle.id}`}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Panel de control
          </Link>
          {execution?.result?.verificationHash && (
            <a
              href={`${process.env.REACT_APP_API_URL || "http://localhost:3000/v1"}/public/results/${execution.result.verificationHash}/verify`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Comprobar resultado
            </a>
          )}
        </div>
      </div>
      {execution?.result?.verificationHash && (
        <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-xs text-emerald-800">
          <strong>Código de validación:</strong>{" "}
          <span className="break-all">{execution.result.verificationHash}</span>
        </div>
      )}
      {error && <Warning text={error.message} />}
    </div>
  );
}

function GameLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <p className="rounded-2xl bg-white px-6 py-4 font-semibold text-slate-600 shadow-sm">
        Preparando la sala de juego...
      </p>
    </div>
  );
}

function GameEmpty({ title, detail }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-black text-slate-900">{title}</h1>
        <p className="mt-3 text-slate-500">
          {detail ||
            "Selecciona un juego desde la sección de Minijuegos o configura un nuevo evento para comenzar."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/games"
            className="rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-900"
          >
            Ver Minijuegos
          </Link>
          <Link
            to="/raffles"
            className="rounded-2xl border px-5 py-3 font-bold text-slate-700"
          >
            Administrar eventos
          </Link>
        </div>
      </div>
    </div>
  );
}

function Warning({ text }) {
  return (
    <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
      {text}
    </div>
  );
}
