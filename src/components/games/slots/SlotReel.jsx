function SlotReel({ icon, spinning }) {
  return (
    <div
      className={`
        slot-glow
        flex
        h-56
        items-center
        justify-center
        rounded-[32px]
        border
        border-slate-200
        bg-gradient-to-br
        from-slate-50
        to-slate-100
        text-7xl
        shadow-inner
        transition-all
        duration-300
        ${spinning ? "scale-105 animate-pulse" : ""}
      `}
    >
      {icon}
    </div>
  );
}

export default SlotReel;
