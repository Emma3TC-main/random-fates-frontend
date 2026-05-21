function GameStatusCard({ game, status, participants, winner }) {
  return (
    <div className="rounded-3xl border border-cyan-500/10 bg-slate-900 p-6 transition hover:border-cyan-400/30">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{game}</h3>

        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
          {status}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Participants</span>

          <span className="text-white">{participants}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Winner</span>

          <span className="text-cyan-400">{winner}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Verification</span>

          <span className="text-green-400">VERIFIED</span>
        </div>
      </div>
    </div>
  );
}

export default GameStatusCard;
