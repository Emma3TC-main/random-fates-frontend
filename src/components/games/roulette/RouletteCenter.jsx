function RouletteCenter() {
  return (
    <div
      className="
        center-pulse
        relative
        flex
        h-44
        w-44
        items-center
        justify-center
        rounded-full
        border-[10px]
        border-white/80
        bg-gradient-to-br
        from-slate-100
        to-slate-200
        shadow-[inset_0_10px_30px_rgba(255,255,255,0.8)]
      "
    >
      {/* Glow interno */}
      <div
        className="
          absolute
          h-28
          w-28
          rounded-full
          bg-[#40CFFF]
          shadow-[0_0_40px_rgba(64,207,255,0.8)]
        "
      />

      {/* Centro */}
      <div
        className="
          relative
          z-10
          h-16
          w-16
          rounded-full
          border-4
          border-white/70
          bg-white/40
          backdrop-blur-md
        "
      />
    </div>
  );
}

export default RouletteCenter;
