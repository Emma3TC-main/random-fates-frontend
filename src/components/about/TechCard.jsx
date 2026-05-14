function TechCard({ tech }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-[#40CFFF]" />

        <span className="font-semibold text-slate-800">{tech.name}</span>
      </div>
    </div>
  );
}

export default TechCard;
