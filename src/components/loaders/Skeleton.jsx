function Skeleton({ className = "" }) {
  return (
    <div
      className={`
        animate-pulse
        rounded-2xl
        bg-slate-800/80
        ${className}
      `}
    />
  );
}

export default Skeleton;
