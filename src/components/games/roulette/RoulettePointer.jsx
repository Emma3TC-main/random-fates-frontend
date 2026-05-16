function RoulettePointer() {
  return (
    <div className="absolute -top-6 z-30 flex flex-col items-center">
      {/* Glow */}
      <div className="absolute top-1 h-8 w-8 rounded-full bg-cyan-400/40 blur-xl" />

      {/* Pointer */}
      <div
        className="
          pointer-glow
          h-10
          w-10
          rotate-45
          rounded-md
          border-2
          border-white/30
          bg-gradient-to-br
          from-[#1E293B]
          to-[#0F172A]
          shadow-2xl
        "
      />

      {/* Dot */}
      <div className="mt-2 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_18px_#40CFFF]" />
    </div>
  );
}

export default RoulettePointer;
