function JourneyStep({ item }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#40CFFF] font-bold text-slate-900">
        {item.step}
      </div>

      <div>
        <h4 className="font-semibold text-slate-900">{item.title}</h4>

        <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
      </div>
    </div>
  );
}

export default JourneyStep;
