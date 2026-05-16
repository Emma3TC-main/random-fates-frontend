function SlotMachine({ spinning }) {
  return (
    <div className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-sm">
      <div className="grid grid-cols-3 gap-5">
        {[1, 2, 3].map((slot) => (
          <div
            key={slot}
            className={`
              flex h-52 items-center justify-center rounded-3xl
              bg-slate-100 text-7xl shadow-inner transition-all
              ${spinning ? "animate-bounce" : ""}
            `}
          >
            🎰
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlotMachine;
