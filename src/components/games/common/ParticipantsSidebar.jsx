import RouletteParticipantItem from "../roulette/RouletteParticipants";

function ParticipantsSidebar({ participants }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Participantes</h2>

        <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700">
          {participants.length}
        </span>
      </div>

      <div className="mt-6 max-h-[550px] space-y-3 overflow-y-auto pr-2">
        {participants.map((participant) => (
          <RouletteParticipantItem
            key={participant.id}
            participant={participant}
          />
        ))}
      </div>
    </div>
  );
}

export default ParticipantsSidebar;
