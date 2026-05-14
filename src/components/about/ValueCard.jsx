function ValueCard({ value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100">
        <div className="h-6 w-6 rounded-full bg-[#40CFFF]" />
      </div>

      <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>

      <p className="mt-3 text-sm leading-relaxed text-slate-500">
        {value.description}
      </p>
    </div>
  );
}

export default ValueCard;
