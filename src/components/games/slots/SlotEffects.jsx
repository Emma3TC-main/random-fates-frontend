function SlotEffects({ spinning }) {
  if (!spinning) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[36px]">
      <div className="absolute left-0 top-0 h-full w-1/3 animate-pulse bg-yellow-300/10" />

      <div className="absolute left-1/3 top-0 h-full w-1/3 animate-pulse bg-cyan-300/10 delay-150" />

      <div className="absolute right-0 top-0 h-full w-1/3 animate-pulse bg-pink-300/10 delay-300" />
    </div>
  );
}

export default SlotEffects;
