function RandomAnimation({
  animating,
  currentName,
}) {
  return (
    <div className="flex h-72 items-center justify-center rounded-[36px] border border-slate-200 bg-white shadow-sm">
      <div
        className={`
          text-center
          text-6xl
          font-black
          tracking-tight
          text-slate-900
          transition-all
          duration-150
          ${animating ? "scale-110" : "scale-100"}
        `}
      >
        {currentName}
      </div>
    </div>
  );
}

export default RandomAnimation;