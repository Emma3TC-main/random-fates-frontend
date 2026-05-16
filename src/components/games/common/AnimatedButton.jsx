function AnimatedButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        bg-[#40CFFF]
        px-6
        py-4
        font-semibold
        text-slate-900
        shadow-lg
        transition-all
        duration-300
        hover:scale-[1.03]
        hover:shadow-cyan-300/40
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      <span className="relative z-10">{children}</span>

      <div
        className="
          absolute inset-0
          translate-y-full
          bg-white/20
          transition-transform
          duration-300
          group-hover:translate-y-0
        "
      />
    </button>
  );
}

export default AnimatedButton;
