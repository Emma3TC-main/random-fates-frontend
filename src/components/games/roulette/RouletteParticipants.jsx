function RouletteParticipantItem({ participant }) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-100
        bg-white
        p-4
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-cyan-200
        hover:shadow-xl
      "
    >
      {/* Hover glow */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-cyan-100/0
          via-cyan-100/40
          to-cyan-100/0
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-semibold text-slate-700 transition-colors group-hover:text-slate-900">
          {participant.name}
        </span>

        <div
          className="
            h-3
            w-3
            rounded-full
            bg-[#40CFFF]
            transition-all
            duration-300
            group-hover:scale-150
            group-hover:shadow-[0_0_18px_#40CFFF]
          "
        />
      </div>
    </div>
  );
}

export default RouletteParticipantItem;
