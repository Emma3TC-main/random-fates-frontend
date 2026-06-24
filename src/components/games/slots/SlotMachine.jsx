function SlotMachine({ reels = ["🎰", "🎰", "🎰"], spinning }) {
  return (
    <div className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-sm">
      <div className="grid grid-cols-3 gap-5">
        {reels.map((icon, index) => (
          <div key={`${icon}-${index}`} className={`flex h-52 items-center justify-center rounded-3xl bg-slate-100 text-7xl shadow-inner transition-all ${spinning ? "animate-bounce" : ""}`}>
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlotMachine;
