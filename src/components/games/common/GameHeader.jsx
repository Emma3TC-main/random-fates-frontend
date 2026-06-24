function GameHeader({ badge, badgeColor, title, description }) {
  return (
    <div className="mb-10">
      <span
        className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeColor}`}
      >
        {badge}
      </span>

      <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default GameHeader;
